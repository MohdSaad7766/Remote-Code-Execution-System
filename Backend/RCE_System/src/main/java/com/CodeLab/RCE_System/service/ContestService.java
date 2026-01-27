package com.CodeLab.RCE_System.service;

import com.CodeLab.RCE_System.entity.*;
import com.CodeLab.RCE_System.enums.SubmissionStatus;
import com.CodeLab.RCE_System.enums.UserProblemStatus;
import com.CodeLab.RCE_System.exception.ContestNotFoundException;
import com.CodeLab.RCE_System.exception.ContestException;
import com.CodeLab.RCE_System.repository.ContestProblemSubmissionRepository;
import com.CodeLab.RCE_System.repository.ContestRepository;
import com.CodeLab.RCE_System.repository.ContestSubmissionRepository;
import com.CodeLab.RCE_System.request_dto.ContestRequestDTO;
import com.CodeLab.RCE_System.response_dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service

public class ContestService {
    private final ContestRepository contestRepository;
    private final ContestSubmissionRepository contestSubmissionRepository;
    private final ContestProblemSubmissionRepository contestProblemSubmissionRepository;
    private final ProblemService problemService;
    private final int pageSize = 10;


    ContestService(ContestRepository contestRepository, ProblemService problemService, ContestSubmissionRepository contestSubmissionRepository, ContestProblemSubmissionRepository contestProblemSubmissionRepository){
        this.contestRepository = contestRepository;
        this.problemService = problemService;
        this.contestSubmissionRepository = contestSubmissionRepository;
        this.contestProblemSubmissionRepository = contestProblemSubmissionRepository;
    }

    @Transactional
    public Contest addContest(ContestRequestDTO dto){
        Contest contest = Contest.fromDTO(dto);
        Set<Problem> problemList = problemService.getProblemsForContest(dto.getOldProblemIds(), dto.getNewProblems());
        contest.setProblemList(problemList);

        return contestRepository.save(contest);
    }

    @Transactional(readOnly = true)
    public PaginatedResponse<PastAndUpcomingContestResponseDTO> getPastContests(int pageNumber, User user){
        Sort sort = Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<PastAndUpcomingContestResponseDTO> pageResponse = contestRepository.getAllPastContests(pageable, user);

        List<PastAndUpcomingContestResponseDTO> list = pageResponse.getContent();

        return new PaginatedResponse<>(list , pageNumber, pageResponse.getTotalPages(), pageResponse.getTotalElements());
    }

    @Transactional(readOnly = true)
    public PaginatedResponse<PastAndUpcomingContestResponseDTO> getUpcomingContests(int pageNumber, User user){
        Sort sort = Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<PastAndUpcomingContestResponseDTO> pageResponse = contestRepository.getAllUpcomingContests(pageable, user);
        List<PastAndUpcomingContestResponseDTO> list = pageResponse.getContent();


        return new PaginatedResponse<>(list , pageNumber, pageResponse.getTotalPages(), pageResponse.getTotalElements());
    }

    @Transactional(readOnly = true)
    public PaginatedResponse<LiveContestResponseDTO> getLiveContests(int pageNumber, User user){
        Sort sort = Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<LiveContestResponseDTO> pageResponse = contestRepository.getAllLiveContests(pageable,user);
        List<LiveContestResponseDTO> list  = pageResponse.getContent();

        return new PaginatedResponse<>(list, pageNumber, pageResponse.getTotalPages(), pageResponse.getTotalElements());
    }

    @Transactional
    public void registerUserForContest(UUID contestId, User user)  {
        Contest contest = contestRepository.findById(contestId).orElseThrow(()->
                new ContestNotFoundException("Contest with id-"+contestId+" not found."));

        if(contest.getStartTime().isAfter(LocalDateTime.now())){
            if(contest.getUserList().contains(user)){
                throw new ContestException("User has been already registered for the contest.");
            }
            else{
                contest.getUserList().add(user);
                contestRepository.save(contest);
            }
        }
        else if(contest.getEndTime().isBefore(LocalDateTime.now())){
            throw new ContestException("User can not register for the contest, because it has been ended.");
        }
        else{
            throw new ContestException("User can not register for the contest no longer, because has been started");
        }
    }

    @Transactional
    public void startContest(UUID contestId, User user){
       Contest contest = contestRepository.findById(contestId).orElseThrow(()->
               new ContestNotFoundException("Contest with id-"+contestId+" not found."));

       if(!contest.getUserList().contains(user)){
           throw new ContestException("User Not Registered For the Contest.");
       }

       if(contest.getStartTime().isAfter(LocalDateTime.now())){
           throw new ContestException("Contest Not Started yet.");
       }

       if(contest.getEndTime().isBefore(LocalDateTime.now())){
           throw new ContestException("Contest Ended.");
       }

       ContestSubmission contestSubmission;

       if(contestSubmissionRepository.existsByUserAndContest(user,contest)){
           contestSubmission = contestSubmissionRepository.findByUserAndContest(user,contest);
           if(contestSubmission.getUserSubmittedAt() != null){
               throw new ContestException("You have already submitted the contest");
           }
//          wrong total time taken
           long timeRemaining = LocalDateTime.now().getSecond() - contestSubmission.getUserStartedAt().getSecond();
           contestSubmission.setTotalTimeTaken(contest.getDuration()-timeRemaining);
           contestSubmission.setPercentage(0.0);
       }
       else{
           contestSubmission = new ContestSubmission();
           contestSubmission.setContest(contest);
           contestSubmission.setUser(user);
           contestSubmission.setUserStartedAt(LocalDateTime.now());
           contestSubmission.setTotalTimeTaken(0L);
           contestSubmission.setPercentage(0.0);
       }

        contest.getContestSubmissionList().add(contestSubmission);

        contestRepository.save(contest);
    }

    public List<ProblemResponseDTO> getProblemByContestId(UUID contestId, User user){
        Contest contest = contestRepository.findById(contestId).orElseThrow(()->
                new ContestNotFoundException("Contest with id-"+contestId+" not found."));

        if(contest.getStartTime().isAfter(LocalDateTime.now())){
            throw new ContestException("Contest Not Started yet.");
        }

        if(!contest.getUserList().contains(user)){
            throw new ContestException("User Not Registered For the Contest.");
        }

        Set<Problem> problemList = contest.getProblemList();

        List<ProblemResponseDTO> list = new ArrayList<>();

        for(Problem problem : problemList){
            ProblemResponseDTO dto = Problem.toDTO(problem);
            dto.setTopicList(null);
            dto.setCompanyList(null);
            dto.setSolution(null);

            SubmissionStatus status =
                    contestProblemSubmissionRepository
                            .findStatus(user, contest, problem)
                            .orElse(null);

            if(status == null){
                dto.setStatus(UserProblemStatus.UNATTEMPTED);
            }
            else if(status == SubmissionStatus.ACCEPTED){
                dto.setStatus(UserProblemStatus.SOLVED);
            }
            else{
                dto.setStatus(UserProblemStatus.ATTEMPTED);
            }

            list.add(dto);
        }
        return list;
    }
}
