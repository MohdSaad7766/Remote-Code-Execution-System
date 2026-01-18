package com.CodeLab.RCE_System.service;

import com.CodeLab.RCE_System.entity.Submission;
import com.CodeLab.RCE_System.entity.User;
import com.CodeLab.RCE_System.exception.SubmissionNotFoundException;
import com.CodeLab.RCE_System.repository.SubmissionRepository;
import com.CodeLab.RCE_System.response_dto.SubmissionResponseDTO;
import common.CodeExecutionResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SubmissionService {
    private final SubmissionRepository submissionRepo;

    @Autowired
    public SubmissionService(SubmissionRepository submissionRepo){
        this.submissionRepo = submissionRepo;
    }

    public Submission addSubmission(Submission submission){
        return submissionRepo.save(submission);
    }

    public List<SubmissionResponseDTO> getAllSubmissionsByProblemIdAndUserId(UUID problemId, User user){

        return submissionRepo.getAllSubmissionsByProblemIdAndUserId(problemId,user.getId());
    }

    public void updateSubmission(CodeExecutionResponseDTO result){
        Submission submission = submissionRepo.findById(result.getSubmissionId()).orElse(null);

        if(submission == null)
            return;

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
