package com.CodeLab.RCE_System.service;

import com.CodeLab.RCE_System.entity.*;
import com.CodeLab.RCE_System.enums.ExecutionType;
import com.CodeLab.RCE_System.enums.SubmissionStatus;
import com.CodeLab.RCE_System.exception.ContestException;
import com.CodeLab.RCE_System.rabbitMQ.RabbitMQProducerService;
import com.CodeLab.RCE_System.request_dto.CodeRequestDTO;
import com.CodeLab.RCE_System.request_dto.SubmitCodeRequestDTO;
import com.CodeLab.RCE_System.response_dto.SubmissionIdResponseDTO;
import common.CodeExecutionRequestDTO;
import common.RunCodeRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ExecutionService {

    private final ProblemService problemService;
    private final TestcaseFileService testcaseFileService;
    private final RabbitMQProducerService rabbitMQProducerService;
    private final SubmissionService submissionService;
    private final ContestSubmissionService contestSubmissionService;
    private final ContestService contestService;
    private final RestTemplate restTemplate;


    @Autowired
    public ExecutionService(ProblemService problemService,
                            TestcaseFileService testcaseFileService,
                            RabbitMQProducerService rabbitMQProducerService,
                            SubmissionService submissionService,
                            ContestSubmissionService contestSubmissionService,
                            ContestService contestService,
                            RestTemplate restTemplate){

        this.problemService = problemService;
        this.testcaseFileService = testcaseFileService;
        this.rabbitMQProducerService = rabbitMQProducerService;
        this.submissionService = submissionService;
        this.contestSubmissionService = contestSubmissionService;
        this.contestService = contestService;
        this.restTemplate = restTemplate;
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

        executionRequestDTO.setExecutionType(dto.getExecutionType());
        executionRequestDTO.setUserId(user.getId());
        executionRequestDTO.setTotalTestcases(testcases.size());
        executionRequestDTO.setInput(input);
        executionRequestDTO.setExpectedOutput(expectedOutput);


        System.out.println(executionRequestDTO);

        Problem problem = problemService.getAProblemById(dto.getProblemId());

        if(dto.getExecutionType() == ExecutionType.NORMAL_SUBMIT){
            Submission submission = new Submission();
            submission.setCode(dto.getUserCode());
            submission.setLanguage(dto.getLanguage());
            submission.setTotalTestcases(testcases.size());
            submission.setStatus(SubmissionStatus.PENDING);
            submission.setUser(user);
            submission.setProblem(problem);

            submission = submissionService.addSubmission(submission);
            executionRequestDTO.setSubmissionId(submission.getId());
            executionRequestDTO.setProblemId(problem.getId());
            rabbitMQProducerService.executeCode(executionRequestDTO);
            return new SubmissionIdResponseDTO(submission.getId(), dto.getExecutionType());
        }
        else if(dto.getExecutionType() == ExecutionType.CONTEST_SUBMIT){
            Contest contest = contestService.getContestById(dto.getContestId());

            if(contest.getStartTime().isAfter(LocalDateTime.now())){
                throw new ContestException("Contest has not been started yet, so you can't submit");
            }
            if(contest.getEndTime().isBefore(LocalDateTime.now())){
                throw new ContestException("Contest has been ended, so you can't submit");

            }

            ContestProblemSubmission submission = new ContestProblemSubmission();
            submission.setCode(dto.getUserCode());
            submission.setLanguage(dto.getLanguage());
            submission.setTotalTestcases(testcases.size());
            submission.setStatus(SubmissionStatus.PENDING);
            submission.setUser(user);
            submission.setProblem(problem);
            submission.setContest(contest);

            submission = contestSubmissionService.addSubmission(submission);
            executionRequestDTO.setSubmissionId(submission.getSubmissionId());
            executionRequestDTO.setProblemId(problem.getId());
            rabbitMQProducerService.executeCode(executionRequestDTO);
            return new SubmissionIdResponseDTO(submission.getSubmissionId(), dto.getExecutionType());


        }
        return null;
    }

    public String runCode(RunCodeRequestDTO requestBody){
        String url = "http://localhost:8091/execute-code/run";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<RunCodeRequestDTO> httpEntity = new HttpEntity<>(requestBody,headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class);

        return response.getBody();
    }
}
