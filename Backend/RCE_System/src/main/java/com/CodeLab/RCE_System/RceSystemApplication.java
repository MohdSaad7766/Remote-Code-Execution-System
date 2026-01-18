package com.CodeLab.RCE_System;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableRabbit
@EnableAsync
@EnableScheduling
@EnableTransactionManagement
@SpringBootApplication
public class RceSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(RceSystemApplication.class, args);
		System.out.println("SpringBoot Application Started");
	}

}
