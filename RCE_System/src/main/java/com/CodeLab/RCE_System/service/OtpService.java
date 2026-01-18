package com.CodeLab.RCE_System.service;

import com.CodeLab.RCE_System.entity.AppUser;
import com.CodeLab.RCE_System.entity.Otp;
import com.CodeLab.RCE_System.exception.EmailNotFoundException;
import com.CodeLab.RCE_System.exception.InvalidOtpException;
import com.CodeLab.RCE_System.repository.AppUserRepository;
import com.CodeLab.RCE_System.repository.OtpRepository;
import com.CodeLab.RCE_System.request_dto.OtpVerificationRequestDTO;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@Transactional
public class OtpService {
    private final MailService mailService;
    private final OtpRepository otpRepository;
    private final PasswordEncoder passwordEncoder;
    private final AppUserRepository appUserRepository;

    public OtpService(MailService mailService, OtpRepository otpRepository, PasswordEncoder passwordEncoder, AppUserRepository appUserRepository){
        this.mailService = mailService;
        this.otpRepository = otpRepository;
        this.passwordEncoder = passwordEncoder;
        this.appUserRepository = appUserRepository;
    }

    public void generateOtpForAppUserRegistration(AppUser appUser){

        if (appUser.isEmailVerified()) {
            throw new InvalidOtpException("Email already verified. OTP cannot be resent.");
        }

        blockIfOtpStillValid(appUser.getId());

        otpRepository.deleteByAppUserId(appUser.getId());

        String otpString = getOtp();

        Otp otp = new Otp();
        otp.setOtpString(passwordEncoder.encode(otpString));
        otp.setAppUserId(appUser.getId());
        otp.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpRepository.save(otp);
        mailService.sendOTPMail(appUser.getEmail(), otpString);
    }


    private void blockIfOtpStillValid(UUID appUserId) {
        Otp existingOtp = otpRepository.findByAppUserId(appUserId).orElse(null);

        if (existingOtp != null) {
            long secondsLeft = ChronoUnit.SECONDS.between(
                    LocalDateTime.now(),
                    existingOtp.getExpiryTime()
            );

            if (secondsLeft > 0) {
                throw new InvalidOtpException(
                        "OTP already sent. Please wait " + secondsLeft + " seconds before requesting again."
                );
            }
        }
    }

    public void verifyOtpForEmailVerification(OtpVerificationRequestDTO dto){

        AppUser appUser = appUserRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new EmailNotFoundException("User with provided email not found."));

        if(appUser.isEmailVerified()){
            throw new InvalidOtpException("User email has verified already.");
        }

        Otp otp = otpRepository.findByAppUserId(appUser.getId())
                .orElseThrow(() -> new InvalidOtpException("No OTP found. Please request a new one."));

        if(LocalDateTime.now().isAfter(otp.getExpiryTime())){
            throw new InvalidOtpException("OTP has expired. Please request a new one");
        }

        if(!passwordEncoder.matches(dto.getOtpString(), otp.getOtpString())){
            throw new InvalidOtpException("Invalid OTP. Please try again");
        }

        appUser.setEmailVerified(true); // automatically persisted due to @Transactional

        otpRepository.deleteByAppUserId(appUser.getId());
    }



    @Scheduled(cron = "0 0 0 * * *")
    public void removeExpiredOtp(){
        LocalDateTime now = LocalDateTime.now();
        otpRepository.deleteByExpiryTimeBefore(now);
    }

    private String getOtp(){
        SecureRandom random = new SecureRandom();
        return String.valueOf(random.nextInt(900000) + 100000);
    }

}
