package com.CodeLab.RCE_System.entity;

import com.CodeLab.RCE_System.request_dto.ExampleRequestDTO;
import com.CodeLab.RCE_System.response_dto.ExampleResponseDTO;
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
public class Example {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String input;

    private String output;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    private String imagePath;

    public static Example fromDTO(ExampleRequestDTO dto){
        Example example = new Example();
        example.setInput(dto.getInput());
        example.setOutput(dto.getOutput());
        example.setExplanation(dto.getExplanation());
        example.setImagePath(dto.getImagePath());

        return example;
    }

    public static List<Example> fromDTOs(List<ExampleRequestDTO> dtos){
        List<Example> exampleList = new ArrayList<>();

        for(ExampleRequestDTO dto : dtos){
            exampleList.add(fromDTO(dto));
        }

        return exampleList;
    }
    public static ExampleResponseDTO toDTO(Example example){
        ExampleResponseDTO dto = new ExampleResponseDTO();
        dto.setInput(example.getInput());
        dto.setOutput(example.getOutput());
        dto.setExplanation(example.getExplanation());

        return dto;
    }
    public static List<ExampleResponseDTO> toDTOs(List<Example> exampleList){
        List<ExampleResponseDTO> dtos = new ArrayList<>();

        for(Example example : exampleList){
            dtos.add(toDTO(example));
        }

        return dtos;
    }
}
