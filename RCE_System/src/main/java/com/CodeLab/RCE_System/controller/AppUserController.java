package com.CodeLab.RCE_System.controller;

import com.CodeLab.RCE_System.entity.AppUser;
import com.CodeLab.RCE_System.enums.Language;
import com.CodeLab.RCE_System.request_dto.ChangePasswordRequestDTO;
import com.CodeLab.RCE_System.request_dto.UserProfileRequestDTO;
import com.CodeLab.RCE_System.request_dto.UserProfileUpdateRequestDTO;
import com.CodeLab.RCE_System.response_dto.GeneralMessageResponseDTO;
import com.CodeLab.RCE_System.response_dto.UserProfileResponseDTO;
import com.CodeLab.RCE_System.security.JwtService;
import com.CodeLab.RCE_System.service.AppUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/app-user")
@CrossOrigin
public class AppUserController {

    private final JwtService jwtService;
    private final AppUserService appUserService;

    @Autowired
    public AppUserController(JwtService jwtService, AppUserService appUserService){
        this.jwtService = jwtService;
        this.appUserService = appUserService;
    }

    @PostMapping("/user/add-profile")
    public ResponseEntity<GeneralMessageResponseDTO> addUserProfile(@RequestBody UserProfileRequestDTO dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // This will be the email from UserDetails

        appUserService.addUserProfile(email, dto);

        GeneralMessageResponseDTO responseDTO = new GeneralMessageResponseDTO();
        responseDTO.setMessage("User Profile Added Successfully.");
        responseDTO.setSuccess(true);

        return ResponseEntity.ok(responseDTO);
    }

    @PatchMapping("/user/update-language")
    public ResponseEntity<GeneralMessageResponseDTO> updatePreferredLanguage(@RequestParam Language language){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();
        System.out.println("Email: "+email);
        appUserService.updateUserPreferredLanguage(email, language);

        GeneralMessageResponseDTO responseDTO = new GeneralMessageResponseDTO();
        responseDTO.setMessage("Preferred Language Updated Successfully.");
        responseDTO.setSuccess(true);

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/user/profile")
    public ResponseEntity<UserProfileResponseDTO> getProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        UserProfileResponseDTO profile = appUserService.getUserProfile(email);

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/user/profile-update")
    public ResponseEntity<GeneralMessageResponseDTO> updateProfile(@RequestBody UserProfileUpdateRequestDTO requestDTO){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        appUserService.updateUserProfile(email, requestDTO);

        GeneralMessageResponseDTO responseDTO = new GeneralMessageResponseDTO();
        responseDTO.setSuccess(true);
        responseDTO.setMessage("User Profile Updated Successfully");

        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/change-password")
    public void changePassword(@RequestBody @Valid ChangePasswordRequestDTO dto, @RequestHeader(name = "authorization") String authorization){

    }
}
