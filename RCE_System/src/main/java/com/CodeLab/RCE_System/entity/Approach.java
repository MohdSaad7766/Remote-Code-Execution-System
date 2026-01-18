package com.CodeLab.RCE_System.entity;

import com.CodeLab.RCE_System.enums.ApproachType;
import com.CodeLab.RCE_System.request_dto.ApproachRequestDTO;
import com.CodeLab.RCE_System.response_dto.ApproachResponseDTO;
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
public class Approach {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    private ApproachType approachType;

    @Column(columnDefinition = "TEXT")
    private String description;

    public static Approach fromDTO(ApproachRequestDTO dto){
        Approach approach = new Approach();
        approach.setApproachType(dto.getApproachType());
        approach.setDescription(dto.getDescription());

        return approach;
    }

    public static List<Approach> fromDTOs(List<ApproachRequestDTO> dtos){
        List<Approach> approachList = new ArrayList<>();

        for(ApproachRequestDTO dto : dtos){
            approachList.add(fromDTO(dto));
        }

        return approachList;
    }

    public static ApproachResponseDTO toDTO(Approach approach){
        ApproachResponseDTO dto = new ApproachResponseDTO();
        dto.setApproachType(approach.approachType);
        dto.setApproachDescription(approach.description);

        return dto;
    }

    public static List<ApproachResponseDTO> toDTOs(List<Approach> approachList){
        List<ApproachResponseDTO> dtos = new ArrayList<>();

        for(Approach approach : approachList){
            dtos.add(Approach.toDTO(approach));
        }

        return dtos;
    }
}
