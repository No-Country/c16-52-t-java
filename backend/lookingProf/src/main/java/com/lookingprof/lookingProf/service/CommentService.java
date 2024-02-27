package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.dto.CommentResponseDto;
import com.lookingprof.lookingProf.model.Comment;
import com.lookingprof.lookingProf.model.User;
import com.lookingprof.lookingProf.repository.ICommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService implements ICommentService{

    private final ICommentRepository iCommentRepository;


    @Override
    @Transactional(readOnly = true)
    public List<CommentResponseDto> findByUserOrigin(User user) {
        List<Comment> comments = iCommentRepository.findByUserOrigin(user);
        return convertCommentToCommentDto(comments);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentResponseDto> findByUserDestination(User user) {
        List<Comment> comments = iCommentRepository.findByUserDestination(user);
        return convertCommentToCommentDto(comments);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentResponseDto> findByUserDestinationAndQualification(User user, Integer qualify) {
        List<Comment> comments = iCommentRepository.findByUserDestinationAndQualification(user,qualify);
        return convertCommentToCommentDto(comments);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentResponseDto> listAll() {
        List<Comment> comments = iCommentRepository.findAll();
        return convertCommentToCommentDto(comments);
    }

    @Override
    @Transactional
    public CommentResponseDto createComment(Comment dto) {
        try{
            Comment comment = iCommentRepository.save(dto);
            return new CommentResponseDto(comment);
        }catch (Exception e){
            throw new RuntimeException("Error creating comment");
        }
    }

    @Override
    @Transactional
    public CommentResponseDto updateComment(Integer id, Comment dto) {
        try {
            Comment existingComment = iCommentRepository.findById(id).orElse(null);
            if (existingComment != null) {
                existingComment.setDescription(dto.getDescription());
                iCommentRepository.save(existingComment);
                return new CommentResponseDto(existingComment);
            }
            else throw new RuntimeException("Comment not found");
        }catch (Exception e){
            throw new RuntimeException("Error while updating comment");
        }
    }

    @Override
    @Transactional
    public HashMap<String, String> deleteComment(Integer id) {
        try {
            HashMap<String, String> response = new HashMap<>();
            response.put("message", "Comment was deleted succesfully");
            iCommentRepository.deleteById(id);
            return response;
        }catch (Exception e){
            throw new RuntimeException("Error while deleting comment");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<CommentResponseDto> findById(Integer id) {
        try {
            Optional<Comment> comment = iCommentRepository.findById(id);
            return comment.map(c -> ResponseEntity.ok(new CommentResponseDto(c)))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private List<CommentResponseDto> convertCommentToCommentDto(List<Comment> comments){
        List<CommentResponseDto> commentResponseDtos = new ArrayList<>();
        for (Comment comment: comments){
        CommentResponseDto commentResponseDto = new CommentResponseDto(comment);
        commentResponseDtos.add(commentResponseDto);
        }
        return commentResponseDtos;
    }
}
