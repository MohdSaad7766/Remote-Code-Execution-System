package com.CodeLab.RCE_System.entity;

import com.CodeLab.RCE_System.request_dto.ContestRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
public class Contest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private long duration;
    private boolean startReminderSent;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToMany
    @JoinTable(
            name = "contest_user",
            joinColumns = @JoinColumn(name = "contest_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> userList = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "contest_problem",
            joinColumns = @JoinColumn(name = "contest_id"),
            inverseJoinColumns = @JoinColumn(name = "problem_id")
    )
    private Set<Problem> problemList = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "contest", orphanRemoval = true)
    private List<ContestProblemSubmission> contestProblemSubmissionList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "contest", orphanRemoval = true)
    private List<LeaderBoardEntry> leaderBoardEntryList = new ArrayList<>();

    public static Contest fromDTO(ContestRequestDTO dto){
        Contest contest = new Contest();
        contest.setTitle(dto.getTitle());
        contest.setDescription(dto.getDescription());
        contest.setStartTime(dto.getStartTime());
        contest.setEndTime(dto.getEndTime());
        contest.setDuration(dto.getDuration());
        contest.setStartReminderSent(false);

        return contest;
    }
}


