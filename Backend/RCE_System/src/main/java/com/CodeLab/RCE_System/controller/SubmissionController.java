package com.CodeLab.RCE_System.controller;

import com.CodeLab.RCE_System.entity.User;
import com.CodeLab.RCE_System.request_dto.SubmitCodeRequestDTO;
import com.CodeLab.RCE_System.response_dto.PaginatedResponse;
import com.CodeLab.RCE_System.response_dto.SubmissionResponseDTO;
import com.CodeLab.RCE_System.response_dto.SubmissionIdResponseDTO;
import com.CodeLab.RCE_System.service.AppUserService;
import com.CodeLab.RCE_System.service.ExecutionService;
import com.CodeLab.RCE_System.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController // @Controller + @ResponseBody
@RequestMapping("/submission")
public class SubmissionController {

    private final ExecutionService executionService;
    private final AppUserService appUserService;
    private final SubmissionService submissionService;

    @Autowired
    public SubmissionController(ExecutionService executionService, AppUserService appUserService, SubmissionService submissionService){
        this.executionService = executionService;
        this.appUserService = appUserService;
        this.submissionService = submissionService;
    }


    @PostMapping("/submit-code")
    public ResponseEntity<SubmissionIdResponseDTO> submitCode(@RequestBody SubmitCodeRequestDTO dto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();
        User user = appUserService.getUserByEmail(email);

        SubmissionIdResponseDTO responseDTO = executionService.submitCode(dto,user);
        return ResponseEntity.ok(responseDTO);
    }



    @GetMapping("/get-by-problem-id/{pageNo}")
    public PaginatedResponse<SubmissionResponseDTO> getAllSubmission(@PathVariable(required = false) int pageNo, @RequestParam UUID problemId){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = appUserService.getUserByEmail(email);

        PaginatedResponse<SubmissionResponseDTO> responseDTO = submissionService.getAllSubmissionsByProblemIdAndUserId(pageNo, problemId, user);

        return responseDTO;
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<SubmissionResponseDTO> getSubmissionById(
            @PathVariable("id") UUID submissionId) {

        SubmissionResponseDTO dto = submissionService.getSubmissionById(submissionId);
        return ResponseEntity.ok(dto);
    }



}
