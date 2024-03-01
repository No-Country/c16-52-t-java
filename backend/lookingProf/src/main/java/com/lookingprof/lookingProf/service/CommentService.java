package com.lookingprof.lookingProf.service;

import com.lookingprof.lookingProf.dto.CommentDTORequest;
import com.lookingprof.lookingProf.dto.CommentDTOResponse;
import com.lookingprof.lookingProf.model.Comment;
import com.lookingprof.lookingProf.model.User;
import com.lookingprof.lookingProf.repository.ICommentRepository;
import com.lookingprof.lookingProf.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService implements ICommentService {

    private final ICommentRepository iCommentRepository;
    private final IUserRepository userRepository;


    @Override
    @Transactional(readOnly = true)
    public List<CommentDTOResponse> findByUserOrigin(Integer user) {
        User userOrigin = userRepository.findById(user).get();
        List<Comment> comments = iCommentRepository.findByUserOrigin(userOrigin);
        List<CommentDTOResponse> commentDTOResponseList = new ArrayList<>();
        comments.forEach(comment -> {
            CommentDTOResponse commentDTOResponse = new CommentDTOResponse(comment);
            commentDTOResponseList.add(commentDTOResponse);
        });
        return commentDTOResponseList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentDTOResponse> findByUserDestination(Integer userId) {
        User userDestination = userRepository.findById(userId).get();
        List<Comment> comments = iCommentRepository.findByUserDestination(userDestination);
        List<CommentDTOResponse> commentDTOResponseList = new ArrayList<>();
        comments.forEach(comment -> {
            CommentDTOResponse commentDTOResponse = new CommentDTOResponse(comment);
            commentDTOResponseList.add(commentDTOResponse);
        });
        return commentDTOResponseList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentDTOResponse> findByUserDestinationAndQualification(Integer idUser, Integer qualify) {
        User userDestination = userRepository.findById(idUser).get();
        List<Comment> comments = iCommentRepository.findByUserDestinationAndQualification(userDestination,qualify);
        List<CommentDTOResponse> commentDTOResponseList = new ArrayList<>();
        comments.forEach(comment -> {
            CommentDTOResponse commentDTOResponse = new CommentDTOResponse(comment);
            commentDTOResponseList.add(commentDTOResponse);
        });
        return commentDTOResponseList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentDTOResponse> listAll() {
        try{
            List<Comment> commentList = iCommentRepository.findAll();
            List<CommentDTOResponse> commentDTOResponseList = new ArrayList<>();
            commentList.forEach(comment -> {
                CommentDTOResponse commentDTOResponse = new CommentDTOResponse(comment);
                commentDTOResponseList.add(commentDTOResponse);
            });

            return commentDTOResponseList;
        }catch (Exception e){
            throw new RuntimeException("Error");
        }
    }

     @Override
    @Transactional
    public CommentDTOResponse createComment(CommentDTORequest dto) {
        try{
            Comment comment = new Comment();
            comment.setDescription(dto.getDescription());
            comment.setQualification(dto.getQualification());
            comment.setUserOrigin(userRepository.findById(dto.getUserOrigin()).orElse(null));
            comment.setUserDestination(userRepository.findById(dto.getUserDestination()).orElse(null));
            comment.setCreatedAt(LocalDateTime.now());
            comment.setUpdatedAt(null);
            iCommentRepository.save(comment);

            CommentDTOResponse commentDTOResponse = new CommentDTOResponse(comment);
            return commentDTOResponse;
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Error creating comment");
        }
    }

    @Override
    @Transactional
    public CommentDTOResponse updateComment(Integer id, CommentDTORequest dto) {
        try{
            Comment comment = iCommentRepository.findById(id).orElse(null);
            if(comment==null) throw new RuntimeException("Comment not found");

            comment.setDescription(dto.getDescription());
            comment.setQualification(dto.getQualification());
            comment.setUserOrigin(userRepository.findById(dto.getUserOrigin()).orElse(null));
            comment.setUserDestination(userRepository.findById(dto.getUserDestination()).orElse(null));
            comment.setUpdatedAt(LocalDateTime.now());
            iCommentRepository.save(comment);

            CommentDTOResponse commentDTOResponse = new CommentDTOResponse(comment);
            return commentDTOResponse;
        }catch (Exception e){
            throw new RuntimeException("Error creating comment");
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
    public Optional<CommentDTOResponse> findById(Integer id) {
        try{
            Comment comment = iCommentRepository.findById(id).get();
            CommentDTOResponse commentDTOResponse = new CommentDTOResponse(comment);
            return Optional.of(commentDTOResponse);
        }catch (Exception e){
            throw new RuntimeException("Comment not found");
        }

    }



}
