package com.CodeLab.Code_Execution_Service.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConsumerConfig {

    @Value("${rabbitmq.command.queue}")
    private String commandQueue;

    @Value("${rabbitmq.command.exchange}")
    private String commandExchange;

    @Value("${rabbitmq.command.routing}")
    private String commandRouting;

    // Queue for consuming tasks
    @Bean
    public Queue commandQueue() {
        return new Queue(commandQueue);
    }

    // Binding command queue to command exchange
    @Bean
    public Binding commandBinding() {
        return BindingBuilder.bind(commandQueue())
                .to(new TopicExchange(commandExchange))
                .with(commandRouting);
    }
}

