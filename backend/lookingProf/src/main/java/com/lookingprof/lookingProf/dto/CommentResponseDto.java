package com.lookingprof.lookingProf.dto;

import com.lookingprof.lookingProf.model.Comment;
import com.lookingprof.lookingProf.model.User;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentResponseDto {

    private final Integer id;
    private final String description;
    private final Integer qualification;
    private final User userOrigin;
    private final LocalDateTime createdAt;

    public CommentResponseDto(Comment comment){
        this.id = comment.getId();
        this.description = comment.getDescription();
        this.qualification = comment.getQualification();
        this.userOrigin = comment.getUserOrigin();
        this.createdAt = comment.getCreatedAt();
    }
}
