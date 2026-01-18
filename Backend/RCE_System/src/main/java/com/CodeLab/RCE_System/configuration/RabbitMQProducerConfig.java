package com.CodeLab.RCE_System.configuration;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQProducerConfig {

    @Value("${rabbitmq.command.exchange}")
    private String commandExchange;

    @Value("${rabbitmq.result.exchange}")
    private String resultExchange;

    @Bean
    public TopicExchange commandExchange() {
        return new TopicExchange(commandExchange);
    }

    @Bean
    public TopicExchange resultExchange() {
        return new TopicExchange(resultExchange);
    }

    @Bean
    public MessageConverter messageConverter() {
        return new JacksonJsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory,
                                         MessageConverter messageConverter) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter);
        return template;
    }
}
