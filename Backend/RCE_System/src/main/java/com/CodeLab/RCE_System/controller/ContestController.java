package com.CodeLab.RCE_System.controller;

import com.CodeLab.RCE_System.entity.Contest;
import com.CodeLab.RCE_System.entity.User;
import com.CodeLab.RCE_System.request_dto.ContestRequestDTO;
import com.CodeLab.RCE_System.response_dto.*;
import com.CodeLab.RCE_System.service.AppUserService;
import com.CodeLab.RCE_System.service.ContestService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/contest")

@CrossOrigin
@AllArgsConstructor
public class ContestController {
    private final ContestService contestService;
    private final AppUserService appUserService;

    @PostMapping("/add")
    public ResponseEntity<GeneralMessageResponseDTO> addContest(@RequestBody ContestRequestDTO dto){
        Contest contest = contestService.addContest(dto);

        GeneralMessageResponseDTO responseDTO = new GeneralMessageResponseDTO();
        responseDTO.setMessage("Contest Added Successfully with id-"+contest.getId());
        responseDTO.setSuccess(true);

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/get-past-contests/{pageNo}")
    public ResponseEntity<PaginatedResponse<PastAndUpcomingContestResponseDTO>> getAllPastContests(@PathVariable int pageNo){

      pageNo--;

//      pageNo = 0;
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

      if(authentication == null || authentication instanceof AnonymousAuthenticationToken || hasRole(authentication, "ROLE_ADMIN")){
          return ResponseEntity.ok(contestService.getPastContests(pageNo, null));
      }

      String email = authentication.getName();
      User user = appUserService.getUserByEmail(email);

      return ResponseEntity.ok(contestService.getPastContests(pageNo, user));
    }



    @GetMapping("/get-upcoming-contests/{pageNo}")
    public ResponseEntity<PaginatedResponse<PastAndUpcomingContestResponseDTO>> getUpcomingContests(@PathVariable int pageNo){

        pageNo--;


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication instanceof AnonymousAuthenticationToken || hasRole(authentication, "ROLE_ADMIN")){
            return ResponseEntity.ok(contestService.getUpcomingContests(pageNo, null));
        }

        String email = authentication.getName();
        User user = appUserService.getUserByEmail(email);

        return ResponseEntity.ok(contestService.getUpcomingContests(pageNo, user));
    }

    @GetMapping("/get-live-contests/{pageNo}")
    public ResponseEntity<PaginatedResponse<LiveContestResponseDTO>> getLiveContests(@PathVariable int pageNo){
        pageNo--;

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication instanceof AnonymousAuthenticationToken || hasRole(authentication, "ROLE_ADMIN")){
            return ResponseEntity.ok(contestService.getLiveContests(pageNo,null));
        }

        String email = authentication.getName();
        User user = appUserService.getUserByEmail(email);

        return ResponseEntity.ok(contestService.getLiveContests(pageNo, user));
    }

    @PostMapping("/register")
    public ResponseEntity<GeneralMessageResponseDTO> registerForContest(@RequestParam UUID contestId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();
        User user = appUserService.getUserByEmail(email);

        contestService.registerUserForContest(contestId, user);

        GeneralMessageResponseDTO responseDTO = new GeneralMessageResponseDTO();
        responseDTO.setSuccess(true);
        responseDTO.setMessage("Contest Registration Successful");

        return ResponseEntity.ok(responseDTO);
    }


    @PostMapping("/user-start")
    public ResponseEntity<String> startContest(@RequestParam UUID contestId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();
        User user = appUserService.getUserByEmail(email);

        contestService.startContest(contestId, user);
        return ResponseEntity.ok("User Started the Contest");


    }


    @GetMapping("/get-problems")
    public ResponseEntity<List<ProblemResponseDTO>> getProblemsOfAContest(@RequestParam UUID contestId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = appUserService.getUserByEmail(email);
        List<ProblemResponseDTO> contestProblems = contestService.getProblemByContestId(contestId, user);

        return ResponseEntity.ok(contestProblems);
    }

    private boolean hasRole(Authentication auth, String role) {
        for (GrantedAuthority authority : auth.getAuthorities()) {
            if (authority.getAuthority().equals(role)) return true;
        }
        return false;
    }
}
