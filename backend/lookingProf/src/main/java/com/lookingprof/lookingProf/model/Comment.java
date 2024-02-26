package com.lookingprof.lookingProf.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Comment {

    @Id
    @GeneratedValue
    private Integer id;
    private String description;
    private Integer qualification;

    @ManyToOne
    @JoinColumn(name = "fk_user_origin")
    private User userOrigin;

    @ManyToOne
    @JoinColumn(name = "fk_user_destination")
    private User userDestination;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
