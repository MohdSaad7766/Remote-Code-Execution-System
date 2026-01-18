package com.CodeLab.RCE_System.rabbitMQ;

import common.CodeExecutionRequestDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class RabbitMQProducerService {

    @Value("${rabbitmq.command.exchange}")
    private String exchangeName;

    @Value("${rabbitmq.command.routing}")
    private String routingKey;

    private final RabbitTemplate rabbitTemplate;

    public RabbitMQProducerService(RabbitTemplate rabbitTemplate){
        this.rabbitTemplate = rabbitTemplate;
    }

    // Send simple string message
    public void sendMessage(String message){
        System.out.println("Message Sent: " + message);
        rabbitTemplate.convertAndSend(exchangeName, routingKey, message);
    }

    // Send task object (code execution request)
    public void executeCode(CodeExecutionRequestDTO codeDto){
        System.out.println("Code Sent: " + codeDto);
        rabbitTemplate.convertAndSend(exchangeName, routingKey, codeDto);
    }
}

