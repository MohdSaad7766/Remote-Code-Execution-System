package com.CodeLab.RCE_System.rabbitMQ;

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

    RabbitMQConsumerService(SubmissionService submissionService){
        this.submissionService = submissionService;
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

        submissionService.updateSubmission(result);
    }
}
