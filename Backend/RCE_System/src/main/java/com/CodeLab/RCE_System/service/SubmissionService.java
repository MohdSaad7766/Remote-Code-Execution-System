package com.CodeLab.RCE_System.service;

import com.CodeLab.RCE_System.entity.Submission;
import com.CodeLab.RCE_System.entity.User;
import com.CodeLab.RCE_System.exception.SubmissionNotFoundException;
import com.CodeLab.RCE_System.repository.SubmissionRepository;
import com.CodeLab.RCE_System.response_dto.PaginatedResponse;
import com.CodeLab.RCE_System.response_dto.SubmissionResponseDTO;
import common.CodeExecutionResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SubmissionService {
    private final SubmissionRepository submissionRepo;
    private final int PAGE_SIZE = 10;

    @Autowired
    public SubmissionService(SubmissionRepository submissionRepo){
        this.submissionRepo = submissionRepo;
    }

    public Submission addSubmission(Submission submission){
        return submissionRepo.save(submission);
    }

    public PaginatedResponse<SubmissionResponseDTO> getAllSubmissionsByProblemIdAndUserId(int pageNo,UUID problemId, User user){
        Sort sort = Sort.by("submittedAt").descending();
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE , sort);
        Page<SubmissionResponseDTO> page = submissionRepo.getAllSubmissionsByProblemIdAndUserId(problemId,user.getId(), pageable);


        return new PaginatedResponse<>(
                page.getContent(),
                pageNo,
                page.getTotalPages(),
                page.getTotalElements()
        );
    }

    public void updateSubmission(CodeExecutionResponseDTO result){
        Submission submission = submissionRepo.findById(result.getSubmissionId()).orElse(null);

        if(submission == null){
            System.out.println("Submission is Null, FROM SubmissionService.updateSubmission()");
            return;
        }

        submission.setTotalPassedTestcases(result.getTotalPassedTestcases());
        submission.setStatus(result.getStatus());
        submission.setError(result.getError());

        submission.setLastInput(result.getLastInput());
        submission.setLastOutput(result.getLastOutput());
        submission.setLastExpectedOutput(result.getLastExpectedOutput());

        submission.setTimeComplexity(result.getTimeComplexity());
        submission.setSpaceComplexity(result.getSpaceComplexity());

        submissionRepo.save(submission);
    }

    public SubmissionResponseDTO getSubmissionById(UUID id){
        Submission submission = submissionRepo.findById(id).orElse(null);

        if(submission == null){
            throw new SubmissionNotFoundException("Submission with id-"+id+" not found.");
        }

        return submission.toDTO();
    }
}
