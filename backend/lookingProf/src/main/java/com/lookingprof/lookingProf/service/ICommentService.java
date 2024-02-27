package com.lookingprof.lookingProf.service;


import com.lookingprof.lookingProf.dto.CommentResponseDto;
import com.lookingprof.lookingProf.model.Comment;
import com.lookingprof.lookingProf.model.User;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface ICommentService {

    public List<CommentResponseDto> findByUserOrigin(User user);
    public List<CommentResponseDto> findByUserDestination(User user);
    public List<CommentResponseDto> findByUserDestinationAndQualification(User user, Integer qualify);
    public List<CommentResponseDto> listAll();
    public CommentResponseDto createComment(Comment dto);
    public CommentResponseDto updateComment(Integer id, Comment dto);
    public HashMap<String, String> deleteComment(Integer id);

    public ResponseEntity<CommentResponseDto> findById(Integer id);

}
