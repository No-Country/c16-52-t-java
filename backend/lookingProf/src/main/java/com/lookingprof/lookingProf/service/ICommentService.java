package com.lookingprof.lookingProf.service;


import com.lookingprof.lookingProf.dto.CommentDTORequest;
import com.lookingprof.lookingProf.dto.CommentDTOResponse;
import com.lookingprof.lookingProf.model.Comment;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface ICommentService {


    List<CommentDTOResponse> findByUserOrigin(Integer user);

    List<CommentDTOResponse> findByUserDestination(Integer userId);

    List<CommentDTOResponse> findByUserDestinationAndQualification(Integer idUser, Integer qualify);

    public List<CommentDTOResponse> listAll();
    public CommentDTOResponse createComment(CommentDTORequest dto);
    public CommentDTOResponse updateComment(Integer id, CommentDTORequest dto);
    public HashMap<String, String> deleteComment(Integer id);
    public Optional<CommentDTOResponse> findById(Integer id);

}
