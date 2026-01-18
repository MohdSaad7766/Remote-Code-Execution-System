package com.CodeLab.RCE_System.entity;

import com.CodeLab.RCE_System.request_dto.TestcaseRequestDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Testcase {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
// The input will be stored inside problem_id/testcase_id.in and the output will be inside the problem_id/testcase_id.out txt
//    private String input;
//
//    private String expectedOutput;

    private boolean isVisible;

    public static List<Testcase> fromDTOs(List<TestcaseRequestDTO> dtos){
//        System.out.println(dtos);
        List<Testcase> testcaseList = new ArrayList<>();

        for(TestcaseRequestDTO dto : dtos){
            testcaseList.add(fromDTO(dto));
        }

        return testcaseList;
    }

    public static Testcase fromDTO(TestcaseRequestDTO dto){

        Testcase testcase = new Testcase();
        System.out.println();
        testcase.setVisible(dto.isVisible());

        return testcase;
    }
}
