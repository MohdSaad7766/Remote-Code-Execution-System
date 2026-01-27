package com.CodeLab.RCE_System.rabbitMQ;

import com.CodeLab.RCE_System.entity.ContestProblemSubmission;
import com.CodeLab.RCE_System.enums.ExecutionType;
import com.CodeLab.RCE_System.service.ContestSubmissionService;
import com.CodeLab.RCE_System.service.SubmissionService;
import common.CodeExecutionRequestDTO;
import common.CodeExecutionResponseDTO;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RabbitListener(queues = "${rabbitmq.result.queue}")
public class RabbitMQConsumerService {

    private final SubmissionService submissionService;
    private final ContestSubmissionService contestSubmissionService;

    RabbitMQConsumerService(SubmissionService submissionService,
                            ContestSubmissionService contestSubmissionService){
        this.submissionService = submissionService;
        this.contestSubmissionService = contestSubmissionService;
    }
    // Optional: consume simple string messages
    @RabbitHandler
    public void consumeMessage(String message){
        System.out.println("Received String Message: " + message);
    }

    // Consume result objects (e.g., ResultDTO)
    @RabbitHandler
    public void consumeCodeExecutionResult(CodeExecutionResponseDTO result){
        System.out.println("Code Execution Result Received: " + result);

        if(result.getExecutionType() == ExecutionType.NORMAL_SUBMIT)
            submissionService.updateSubmission(result);
        else if(result.getExecutionType() == ExecutionType.CONTEST_SUBMIT)
            contestSubmissionService.updateSubmission(result);


    }
}
