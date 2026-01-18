package com.CodeLab.RCE_System;

import com.CodeLab.RCE_System.request_dto.ContestStartDTO;
import com.CodeLab.RCE_System.service.MailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

//@SpringBootTest
public class MailServiceTest {
    @Autowired
    MailService mailService;

//    @Test
    public void sendOTPMail(){
        String to = "ansarisaad777666@gmail.com";
        String otp = "123456";

        mailService.sendOTPMail(to,otp);
        System.out.println("Mail Sent Successfully");
    }

//    @Test
    public void sendContestReminderMail(){
        String[] to = {"ansarisaad777666@gmail.com","ansarisaad7777666@gmail.com"};
        ContestStartDTO dto = new ContestStartDTO("Test Mail Contest", "11 December 2025", "12 December 2025", "60 Minutes");

        mailService.sendContestStartReminderMail(to,dto);
        System.out.println("Mail Sent Successfully");
    }
}
