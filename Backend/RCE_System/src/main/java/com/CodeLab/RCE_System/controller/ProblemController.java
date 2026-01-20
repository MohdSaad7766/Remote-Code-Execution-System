package com.CodeLab.RCE_System.controller;

import com.CodeLab.RCE_System.entity.AppUser;
import com.CodeLab.RCE_System.entity.Problem;
import com.CodeLab.RCE_System.entity.User;
import com.CodeLab.RCE_System.enums.Difficulty;
import com.CodeLab.RCE_System.request_dto.ProblemRequestDTO;
import com.CodeLab.RCE_System.response_dto.*;
import com.CodeLab.RCE_System.service.AppUserService;
import com.CodeLab.RCE_System.service.ProblemService;
import com.CodeLab.RCE_System.service.TestcaseFileService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/problem")
//@CrossOrigin
public class ProblemController {

    private final ProblemService problemService;
    private final TestcaseFileService testcaseFileService;
    private final AppUserService appUserService;

    public ProblemController(ProblemService problemService, TestcaseFileService testcaseFileService, AppUserService appUserService){
        this.problemService = problemService;
        this.testcaseFileService = testcaseFileService;
        this.appUserService  = appUserService;
    }


    @PostMapping("/add")
    public ResponseEntity<GeneralMessageResponseDTO> addProblem(@RequestBody ProblemRequestDTO dto){
        System.out.println(dto.getTestcaseList());
        Problem problem = problemService.addProblem(dto,true);

        try {
            testcaseFileService.addTestcases(problem, dto.getTestcaseList());
        }
        catch (IOException e){
            System.out.println(e.getMessage());
        }
        GeneralMessageResponseDTO responseDTO = new GeneralMessageResponseDTO();
        responseDTO.setSuccess(true);
        responseDTO.setMessage("Problem Added Successfully.");

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/get-by-id/{problemId}")
    public ProblemResponseDTO getProblemById(@PathVariable UUID problemId){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication instanceof AnonymousAuthenticationToken || hasRole(authentication, "ROLE_ADMIN")){
            return problemService.getProblemById(problemId, null);
        }

        String email = authentication.getName();
        User user = appUserService.getUserByEmail(email);

        ProblemResponseDTO responseDTO = problemService.getProblemById(problemId, user);
        System.out.println(responseDTO);
        return responseDTO;
    }

    @GetMapping("/get/{pageNo}")
    public PaginatedResponse<ProblemListResponseDTO> getAllProblems(
            @PathVariable int pageNo,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Difficulty difficulty,
            @RequestParam(required = false) Set<UUID> topicIds,
            @RequestParam(required = false) Set<UUID> companyIds

    ) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        pageNo--;

        // Guest
        if (auth == null || auth instanceof AnonymousAuthenticationToken) {
            return problemService.getAllProblemsForGuestOrAdmin(pageNo, title, difficulty, topicIds, companyIds);
        }

        // Admin
        if (hasRole(auth, "ROLE_ADMIN")) {
            return problemService.getAllProblemsForGuestOrAdmin(pageNo, title, difficulty, topicIds, companyIds);
        }

        // Logged-in user
        String email = auth.getName();
        AppUser appUser = appUserService.findByEmail(email);
        return problemService.getAllProblemsForUser(pageNo, appUser.getUser(), title, difficulty, topicIds, companyIds);
    }

    private boolean hasRole(Authentication auth, String role) {
        for (GrantedAuthority authority : auth.getAuthorities()) {
            if (authority.getAuthority().equals(role)) return true;
        }
        return false;
    }

    @GetMapping("/search/{keyword}")
    public void searchProblem(@PathVariable String keyword){

    }



    public void updateProblem(){

    }

    public void deleteProblem(){

    }

    @GetMapping("/get-all-topics")
    public ResponseEntity<List<TopicResponseDTO>> getAllTopics(){
        return ResponseEntity.ok(problemService.getAllTopics());
    }

    public void addTopic(){

    }

    public void addCompany(){

    }

    @GetMapping("/get-all-companies")
    public ResponseEntity<List<CompanyResponseDTO>> getAllCompanies(){
        return ResponseEntity.ok(problemService.getAllCompanies());
    }

    @GetMapping("/get-solved-ctn-by-user")
    public ResponseEntity<ProblemCountResponseDTO> getCtnOfProblemSolvedByUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth instanceof AnonymousAuthenticationToken || hasRole(auth, "ROLE_ADMIN")) {

            ProblemCountResponseDTO dto = problemService.getProblemSolvedCtn(null);
            return ResponseEntity.ok(dto);
        }
        String email = auth.getName();


        User user = appUserService.getUserByEmail(email);

        ProblemCountResponseDTO dto = problemService.getProblemSolvedCtn(user);
        return ResponseEntity.ok(dto);
    }
}
