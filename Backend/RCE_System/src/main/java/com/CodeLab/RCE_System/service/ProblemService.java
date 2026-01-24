package com.CodeLab.RCE_System.service;

import com.CodeLab.RCE_System.entity.*;
import com.CodeLab.RCE_System.enums.Difficulty;
import com.CodeLab.RCE_System.enums.SubmissionStatus;
import com.CodeLab.RCE_System.enums.UserProblemStatus;
import com.CodeLab.RCE_System.repository.CompanyRepository;
import com.CodeLab.RCE_System.repository.ProblemRepository;
import com.CodeLab.RCE_System.repository.SubmissionRepository;
import com.CodeLab.RCE_System.repository.TopicRepository;
import com.CodeLab.RCE_System.request_dto.ProblemRequestDTO;
import com.CodeLab.RCE_System.response_dto.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class ProblemService {

    private final TopicRepository topicRepository;
    private final CompanyRepository companyRepository;
    private final ProblemRepository problemRepository;
    private final TestcaseFileService testcaseFileService;
    private final int PAGE_SIZE = 10;
    private final SubmissionRepository submissionRepository;


    @Autowired
    public ProblemService(TopicRepository topicRepository, CompanyRepository companyRepository, ProblemRepository problemRepository, TestcaseFileService testcaseFileService,
                          SubmissionRepository submissionRepository){
        this.companyRepository = companyRepository;
        this.problemRepository = problemRepository;
        this.topicRepository = topicRepository;
        this.testcaseFileService = testcaseFileService;
        this.submissionRepository = submissionRepository;
    }

    public List<TopicResponseDTO> getAllTopics(){
        Sort sort = Sort.by("topicName").ascending();
        return topicRepository.findAllTopics(sort);
    }

    public List<CompanyResponseDTO> getAllCompanies(){
        Sort sort = Sort.by("companyName").ascending();
        return companyRepository.findAllCompanies(sort);
    }

    @Transactional
    public Problem addProblem(ProblemRequestDTO dto, boolean visibility){
//        System.out.println(dto.getTestcaseList());
        Problem problem = Problem.fromDTO(dto);
        problem.setVisibility(visibility);


        Set<Topic> topics = topicRepository.findAllTopicsIn(dto.getTopicList());
        problem.setTopicList(topics);

        Set<Company> companies = companyRepository.findAllCompaniesIn(dto.getCompanyList());
        problem.setCompanyList(companies);

        return  problemRepository.save(problem);
    }

    @Transactional(readOnly = true)
    public PaginatedResponse<ProblemListResponseDTO> getAllProblemsForGuestOrAdmin(
            int pageNo,
            String title,
            Difficulty difficulty,
            Set<UUID> topicIds,
            Set<UUID> companyIds
    ) {
        return fetchProblems(null, pageNo, title, difficulty, topicIds, companyIds);
    }

    public ProblemResponseDTO getProblemById(UUID problemId, User user){
        Problem problem = getAProblemById(problemId);
        ProblemResponseDTO response = Problem.toDTO(problem);
        response.setTestCasesList(testcaseFileService.getTestcase(problem));

        if(user != null){
            UserProblemStatus status = submissionRepository.getProblemStatus(problemId, user.getId());
            response.setStatus(status);
        }
        return response;
    }

    @Transactional(readOnly = true)
    public PaginatedResponse<ProblemListResponseDTO> getAllProblemsForUser(
            int pageNo,
            User user,
            String title,
            Difficulty difficulty,
            Set<UUID> topicIds,
            Set<UUID> companyIds,
            UserProblemStatus status
    ) {
        return fetchProblems(user, pageNo, title, difficulty, topicIds, companyIds);
    }

    private PaginatedResponse<ProblemListResponseDTO> fetchProblems(
            User user,
            int pageNo,
            String title,
            Difficulty difficulty,
            Set<UUID> topicIds,
            Set<UUID> companyIds
    ) {

        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE, Sort.by("createdAt").ascending());

        // Fetch filtered problem IDs
        Page<UUID> problemIdsPage = problemRepository.findProblemIdsWithFilters(
                title, difficulty, topicIds, companyIds, pageable
        );

        if (problemIdsPage.isEmpty()) {
            return new PaginatedResponse<>(new ArrayList<>(), pageNo, 0, 0);
        }

        Set<UUID> problemIds = new HashSet<>(problemIdsPage.getContent());

        // Fetch flat rows
        List<ProblemFlatRowDTO> flatRows = problemRepository.findAllProblems(problemIds);

        // Fetch user problem statuses if user exists
        Map<UUID, UserProblemStatus> statusMap = new HashMap<>();
        if (user != null) {
            List<UserProblemStatusDTO> statusList =
                    submissionRepository.findStatus(user.getId(), problemIds);
            for (UserProblemStatusDTO dto : statusList) {
                statusMap.put(dto.getId(), dto.getStatus());
            }
        }

        // Aggregate ProblemListResponseDTO
        Map<UUID, ProblemListResponseDTO> map = new LinkedHashMap<>();
        for (ProblemFlatRowDTO row : flatRows) {
            UUID problemId = row.getId();
            ProblemListResponseDTO dto = map.computeIfAbsent(problemId, id -> {
                ProblemListResponseDTO d = new ProblemListResponseDTO();
                d.setProblemId(id);
                d.setTitle(row.getTitle());
                d.setDifficulty(row.getDifficulty());
                d.setTopics(new HashSet<>());
                d.setCompanies(new HashSet<>());
                d.setProblemStatus(user != null ?
                        statusMap.getOrDefault(id, UserProblemStatus.UNATTEMPTED) : null);
                return d;
            });

            if (row.getTopicName() != null) dto.getTopics().add(row.getTopicName());
            if (row.getCompanyName() != null) dto.getCompanies().add(row.getCompanyName());
        }

        //Preserve pagination order
        List<ProblemListResponseDTO> orderedResult = new ArrayList<>();
        for (UUID id : problemIdsPage.getContent()) {
            if (map.containsKey(id)) orderedResult.add(map.get(id));
        }

        return new PaginatedResponse<>(
                orderedResult,
                pageNo,
                problemIdsPage.getTotalPages(),
                problemIdsPage.getTotalElements()
        );
    }

    public Problem getAProblemById(UUID problemId){
        Problem problem = problemRepository.findById(problemId).orElse(null);
        if(problem == null){
            throw new RuntimeException("Problem Not Found.");
        }
        return problem;
    }



    public Set<Problem> getProblemsForContest(Set<UUID> oldProblemIds, List<ProblemRequestDTO> dtos){
        Set<Problem> problemList = new HashSet<>();

        for(ProblemRequestDTO dto : dtos){
            Problem problem = addProblem(dto, false);
            try {
                testcaseFileService.addTestcases(problem, dto.getTestcaseList());
            }
            catch (IOException e){
                System.out.println(e.getMessage());
            }

            problemList.add(problem);
        }

        for(UUID problemId : oldProblemIds){
            Problem problem = getAProblemById(problemId);
            problemList.add(problem);
        }
        return problemList;
    }

    public List<Testcase> getTestcasesByProblemId(UUID problemId, boolean visibility){
        return problemRepository.findAllTestcasesByProblemId(problemId, visibility);
    }

    public ProblemCountResponseDTO getProblemSolvedCtn(User user){
        long problemCtn = problemRepository.count();
        long problemSolvedCtn = user == null ? 0L: submissionRepository.countProblemsByStatus(user, SubmissionStatus.ACCEPTED);

        ProblemCountResponseDTO dto = new ProblemCountResponseDTO(problemSolvedCtn, problemCtn);
        return dto;
    }
}
