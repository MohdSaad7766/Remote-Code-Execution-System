package com.CodeLab.RCE_System.configuration;

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

    @Value("${rabbitmq.result.queue}")
    private String resultQueue;

    @Value("${rabbitmq.result.exchange}")
    private String resultExchange;

    @Value("${rabbitmq.result.routing}")
    private String resultRouting;

    // Queue + Binding for consuming commands
    @Bean
    public Queue commandQueue() {
        return new Queue(commandQueue);
    }

    @Bean
    public Binding commandBinding() {
        return BindingBuilder.bind(commandQueue())
                .to(new TopicExchange(commandExchange))
                .with(commandRouting);
    }

    // Queue + Binding for consuming results
    @Bean
    public Queue resultQueue() {
        return new Queue(resultQueue);
    }

    @Bean
    public Binding resultBinding() {
        return BindingBuilder.bind(resultQueue())
                .to(new TopicExchange(resultExchange))
                .with(resultRouting);
    }
}

