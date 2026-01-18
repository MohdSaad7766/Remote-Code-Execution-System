package com.CodeLab.RCE_System.entity;

import com.CodeLab.RCE_System.request_dto.SolutionRequestDTO;
import com.CodeLab.RCE_System.response_dto.SolutionResponseDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
public class Solution {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "solution_id", referencedColumnName = "id")
    private List<Approach> approachList = new ArrayList<>();

    public static Solution fromDTO(SolutionRequestDTO dto){
        Solution solution = new Solution();
        solution.setApproachList(Approach.fromDTOs(dto.getApproachList()));

        return solution;
    }

    public static SolutionResponseDTO toDTO(Solution solution){
        SolutionResponseDTO dto = new SolutionResponseDTO();
        dto.setApproachList(Approach.toDTOs(solution.approachList));
        return dto;

    }

}
