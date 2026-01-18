package com.CodeLab.RCE_System.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerator;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter



@Entity
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "topic_name", nullable = false, unique = true)
    private String topicName;


    @JsonIgnore
    @ManyToMany(mappedBy = "topicList")
    private Set<Problem> problemList= new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Topic)) return false;
        Topic topic = (Topic) o;
        return id != null && id.equals(topic.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
