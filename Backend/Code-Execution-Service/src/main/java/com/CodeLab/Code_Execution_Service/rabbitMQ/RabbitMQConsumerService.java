package com.CodeLab.Code_Execution_Service.rabbitMQ;

import com.CodeLab.Code_Execution_Service.service.CodeExecutionService;
import common.CodeExecutionRequestDTO;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RabbitListener(queues = "${rabbitmq.command.queue}")
public class RabbitMQConsumerService {

    private final CodeExecutionService codeExecutionService;

    public RabbitMQConsumerService(CodeExecutionService codeExecutionService){
        this.codeExecutionService = codeExecutionService;
    }

    // Consume simple string messages (optional)
    @RabbitHandler
    public void consumeMessage(String message){
        System.out.println("Received Message: " + message);
    }

    // Consume CodeExecutionRequestDTO objects
    @RabbitHandler
    public void consumeMessage(CodeExecutionRequestDTO codeDto){
        System.out.println("Code Received: " + codeDto);
        codeExecutionService.executeCode(codeDto);
    }
}

