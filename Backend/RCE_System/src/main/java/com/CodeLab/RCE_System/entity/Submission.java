package com.CodeLab.RCE_System.entity;

import com.CodeLab.RCE_System.enums.Language;
import com.CodeLab.RCE_System.enums.SubmissionStatus;
import com.CodeLab.RCE_System.response_dto.SubmissionResponseDTO;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerator;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)

@Entity
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    private SubmissionStatus status;

    @Enumerated(EnumType.STRING)
    private Language language;

    private String timeComplexity;

    private String spaceComplexity;

    @Column(columnDefinition = "TEXT")
    private String error;

    @Column(columnDefinition = "TEXT")
    private String code;

    @CreationTimestamp
    private LocalDateTime submittedAt;

    private String lastInput;

    private String lastOutput;

    private String lastExpectedOutput;

    private int totalTestcases;

    private int totalPassedTestcases;


    @ManyToOne
    @JoinColumn(name = "problem_id", nullable = false, updatable = false)
    private Problem problem;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;

    public SubmissionResponseDTO toDTO(){
        SubmissionResponseDTO responseDTO = new SubmissionResponseDTO();
        responseDTO.setId(this.id);
        responseDTO.setLanguage(this.language);
        responseDTO.setTimeComplexity(this.timeComplexity);
        responseDTO.setSpaceComplexity(this.spaceComplexity);
        responseDTO.setStatus(this.status);
        responseDTO.setSubmittedAt(this.submittedAt);
        responseDTO.setTotalTestcases(this.totalTestcases);
        responseDTO.setTotalPassedTestcases(this.totalPassedTestcases);

        return responseDTO;
    }
}
