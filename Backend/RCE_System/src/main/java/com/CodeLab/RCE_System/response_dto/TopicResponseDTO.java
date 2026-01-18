package com.CodeLab.RCE_System.response_dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class TopicResponseDTO {
    private UUID id;
    private String topicName;
    private long problemCtn;
}
