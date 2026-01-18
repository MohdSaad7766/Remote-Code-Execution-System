package com.CodeLab.Code_Execution_Service.rabbitMQ;

import com.CodeLab.Code_Execution_Service.DTO.CodeExecutionResult;
import common.CodeExecutionResponseDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQProducerService {

    @Value("${rabbitmq.result.exchange}")
    private String exchangeName;

    @Value("${rabbitmq.result.routing}")
    private String routingKey;

    private final RabbitTemplate rabbitTemplate;

    public RabbitMQProducerService(RabbitTemplate rabbitTemplate){
        this.rabbitTemplate = rabbitTemplate;
    }

    // Sends execution result back to Service A
    public void sendExecutionResult(CodeExecutionResponseDTO result){
        System.out.println("Sending result: " + result);
        rabbitTemplate.convertAndSend(exchangeName, routingKey, result);
    }
}
