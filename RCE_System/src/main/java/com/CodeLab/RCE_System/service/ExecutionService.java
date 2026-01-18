package com.CodeLab.RCE_System.service;

import com.CodeLab.RCE_System.entity.Problem;
import com.CodeLab.RCE_System.entity.Submission;
import com.CodeLab.RCE_System.entity.Testcase;
import com.CodeLab.RCE_System.entity.User;
import com.CodeLab.RCE_System.enums.ExecutionType;
import com.CodeLab.RCE_System.enums.SubmissionStatus;
import com.CodeLab.RCE_System.rabbitMQ.RabbitMQProducerService;
import com.CodeLab.RCE_System.request_dto.CodeRequestDTO;
import com.CodeLab.RCE_System.request_dto.SubmitCodeRequestDTO;
import com.CodeLab.RCE_System.response_dto.SubmissionIdResponseDTO;
import common.CodeExecutionRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ExecutionService {

    private final ProblemService problemService;
    private final TestcaseFileService testcaseFileService;
    private final RabbitMQProducerService rabbitMQProducerService;
    private final SubmissionService submissionService;

    @Autowired
    public ExecutionService(ProblemService problemService,
                            TestcaseFileService testcaseFileService,
                            RabbitMQProducerService rabbitMQProducerService,
                            SubmissionService submissionService){

        this.problemService = problemService;
        this.testcaseFileService = testcaseFileService;
        this.rabbitMQProducerService = rabbitMQProducerService;
        this.submissionService = submissionService;
    }


    public void runCode(CodeRequestDTO codeRequestDTO, UUID userId){
        List<Testcase> testcases = problemService.getTestcasesByProblemId(codeRequestDTO.getProblemId(), true);
        List<StringBuilder> list = testcaseFileService.getTestcase(codeRequestDTO.getProblemId(), testcases);
        String input = list.get(0).toString();
        String expectedOutput = list.get(1).toString();

        CodeExecutionRequestDTO executionRequestDTO = new CodeExecutionRequestDTO();
        executionRequestDTO.setLanguage(codeRequestDTO.getLanguage());
        executionRequestDTO.setMainCode(codeRequestDTO.getMainCode());
        executionRequestDTO.setUserCode(codeRequestDTO.getUserCode());
        executionRequestDTO.setExecutionType(codeRequestDTO.getExecutionType());
        executionRequestDTO.setUserId(userId);
        executionRequestDTO.setTotalTestcases(testcases.size());
        executionRequestDTO.setInput(input);
        executionRequestDTO.setExpectedOutput(expectedOutput);


        System.out.println(executionRequestDTO);

        rabbitMQProducerService.executeCode(executionRequestDTO);
    }

    @Transactional
    public SubmissionIdResponseDTO submitCode(SubmitCodeRequestDTO dto, User user){
        List<Testcase> testcases = problemService.getTestcasesByProblemId(dto.getProblemId(), true);
        List<StringBuilder> list = testcaseFileService.getTestcase(dto.getProblemId(), testcases);
        String input = list.get(0).toString();
        String expectedOutput = list.get(1).toString();

        CodeExecutionRequestDTO executionRequestDTO = new CodeExecutionRequestDTO();
        executionRequestDTO.setLanguage(dto.getLanguage());
        executionRequestDTO.setMainCode(dto.getMainCode());
        executionRequestDTO.setUserCode(dto.getUserCode());
        executionRequestDTO.setExecutionType(ExecutionType.NORMAL_SUBMIT);
        executionRequestDTO.setUserId(user.getId());
        executionRequestDTO.setTotalTestcases(testcases.size());
        executionRequestDTO.setInput(input);
        executionRequestDTO.setExpectedOutput(expectedOutput);


        System.out.println(executionRequestDTO);

        Problem problem = problemService.getAProblemById(dto.getProblemId());

        Submission submission = new Submission();
        submission.setCode(dto.getUserCode());
        submission.setLanguage(dto.getLanguage());
        submission.setTotalTestcases(testcases.size());
        submission.setSubmittedAt(LocalDateTime.now());
        submission.setStatus(SubmissionStatus.PENDING);
        submission.setUser(user);
        submission.setProblem(problem);

        submission = submissionService.addSubmission(submission);

        executionRequestDTO.setSubmissionId(submission.getId());
        executionRequestDTO.setProblemId(problem.getId());
        rabbitMQProducerService.executeCode(executionRequestDTO);
        return new SubmissionIdResponseDTO(submission.getId());

    }
}
