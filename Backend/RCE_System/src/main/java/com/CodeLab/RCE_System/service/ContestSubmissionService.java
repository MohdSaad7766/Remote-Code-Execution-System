package com.CodeLab.RCE_System.service;

import com.CodeLab.RCE_System.entity.ContestProblemSubmission;
import com.CodeLab.RCE_System.entity.Submission;
import com.CodeLab.RCE_System.repository.ContestProblemSubmissionRepository;
import common.CodeExecutionResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContestSubmissionService {

    private final ContestProblemSubmissionRepository submissionRepository;

    @Autowired
    public ContestSubmissionService(ContestProblemSubmissionRepository submissionRepository){
        this.submissionRepository = submissionRepository;
    }

    public ContestProblemSubmission addSubmission(ContestProblemSubmission submission){
        return submissionRepository.save(submission);
    }

    public void updateSubmission(CodeExecutionResponseDTO result){
        ContestProblemSubmission submission = submissionRepository.findById(result.getSubmissionId()).orElse(null);

        if(submission == null){
            System.out.println("Submission is Null, FROM ContestSubmissionService.updateSubmission()");
            return;
        }

        submission.setTotalPassedTestcases(result.getTotalPassedTestcases());
        submission.setStatus(result.getStatus());
        submission.setError(result.getError());
        submission.setTotalPassedTestcases(result.getTotalPassedTestcases());
        Double percentage =  ((submission.getTotalPassedTestcases() / (double)submission.getTotalTestcases()) * 100);
        submission.setPercentage(percentage);

        submissionRepository.save(submission);

    }

}
