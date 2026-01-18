package com.CodeLab.RCE_System.entity;

import com.CodeLab.RCE_System.enums.Difficulty;
import com.CodeLab.RCE_System.request_dto.ProblemRequestDTO;
import com.CodeLab.RCE_System.response_dto.ProblemResponseDTO;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)

@Entity
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false, unique = true, columnDefinition = "TEXT")
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Column
    private boolean visibility;

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "problem_id",referencedColumnName = "id")
    private List<Example> exampleList = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "problem_topic",
            joinColumns = @JoinColumn(name = "problem_id"),
            inverseJoinColumns = @JoinColumn(name = "topic_id")

    )
    private Set<Topic> topicList = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "problem_company",
            joinColumns = @JoinColumn(name = "problem_id"),
            inverseJoinColumns = @JoinColumn(name = "company_id")
    )
    private Set<Company> companyList = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "problem_id", referencedColumnName = "id")
    private List<Testcase> testcaseList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "problem_id", referencedColumnName = "id")
    private List<CodeTemplate> codeTemplateList = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "solution_id")
    private Solution solution;

    @ElementCollection
    @CollectionTable(
            name = "problem_constraints",
            joinColumns = @JoinColumn(name = "problem_id")
    )
    @Column(name = "constraint_text")
    private List<String> constraints = new ArrayList<>();

    private String note;

    private String followUp;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;


    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Submission> submissionList = new ArrayList<>();

    public static Problem fromDTO(ProblemRequestDTO dto){
        Problem problem = new Problem();
        problem.setTitle(dto.getTitle());
        problem.setDescription(dto.getDescription());
        problem.setDifficulty(dto.getDifficulty());


        problem.setExampleList(Example.fromDTOs(dto.getExampleList()));
        problem.setCodeTemplateList(CodeTemplate.fromDTOs(dto.getCodeTemplateList()));
        problem.setSolution(Solution.fromDTO(dto.getSolution()));
        problem.setTestcaseList(Testcase.fromDTOs(dto.getTestcaseList()));

        //Storing Testcase into file is remaining

        problem.setNote(dto.getNote());
        problem.setFollowUp(dto.getFollowUp());
        problem.setConstraints(dto.getConstraints());

        return problem;
    }

    public static ProblemResponseDTO toDTO(Problem problem){
        ProblemResponseDTO dto = new ProblemResponseDTO();
        dto.setId(problem.id);
        dto.setTitle(problem.getTitle());
        dto.setDifficulty(problem.difficulty);
        dto.setDescription(problem.getDescription());
        dto.setConstraints(problem.getConstraints());
        dto.setSolution(Solution.toDTO(problem.solution));
        dto.setFollowUp(problem.getFollowUp());
        dto.setNote(problem.getNote());
        dto.setCodeTemplateList(CodeTemplate.toDTOs(problem.codeTemplateList));
        dto.setExampleList(Example.toDTOs(problem.exampleList));

        Set<String> companyList = new HashSet<>();
        for(Company company : problem.companyList){
            companyList.add(company.getCompanyName());
        }
        dto.setCompanyList(companyList);

        Set<String> topicList = new HashSet<>();
        for(Topic topic : problem.topicList){
            topicList.add(topic.getTopicName());
        }
        dto.setTopicList(topicList);



        return dto;
    }

}
