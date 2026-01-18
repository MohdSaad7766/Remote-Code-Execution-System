package com.CodeLab.RCE_System.service;

import com.CodeLab.RCE_System.entity.Contest;
import com.CodeLab.RCE_System.entity.Problem;
import com.CodeLab.RCE_System.entity.User;
import com.CodeLab.RCE_System.exception.ContestNotFoundException;
import com.CodeLab.RCE_System.repository.ContestRepository;
import com.CodeLab.RCE_System.request_dto.ContestRequestDTO;
import com.CodeLab.RCE_System.response_dto.LiveContestResponseDTO;
import com.CodeLab.RCE_System.response_dto.PaginatedResponse;
import com.CodeLab.RCE_System.response_dto.PastAndUpcomingContestResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service

public class ContestService {
    private final ContestRepository contestRepository;
    private final ProblemService problemService;
    private final int pageSize = 10;

    ContestService(ContestRepository contestRepository, ProblemService problemService){
        this.contestRepository = contestRepository;
        this.problemService = problemService;
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
        contest.getUserList().add(user);

        contestRepository.save(contest);
    }
}
