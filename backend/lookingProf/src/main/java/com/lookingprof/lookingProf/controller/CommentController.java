package com.lookingprof.lookingProf.controller;

import com.lookingprof.lookingProf.dto.CommentDTORequest;
import com.lookingprof.lookingProf.dto.CommentDTOResponse;
import com.lookingprof.lookingProf.model.Comment;
import com.lookingprof.lookingProf.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor()
public class CommentController {

    private final CommentService commentService;


    @GetMapping()
    public ResponseEntity<List<CommentDTOResponse>> getAllComments(){
        try{
            List<CommentDTOResponse> commentList = commentService.listAll();
            return ResponseEntity.ok(commentList);
        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentDTOResponse> getById(@PathVariable Integer id ){
        try{
            Optional<CommentDTOResponse> comment = commentService.findById(id);
            return comment.map(value -> ResponseEntity.ok().body(value)).orElseGet(() -> ResponseEntity.notFound().build());
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        }

    @GetMapping("/getByUserDestination/{idUser}")
    public ResponseEntity<List<CommentDTOResponse>> getByDestination(@PathVariable Integer idUser){
        try{
            List<CommentDTOResponse> commentList = commentService.findByUserDestination(idUser);
            return ResponseEntity.ok(commentList);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getByUserOrigin/{idUser}")
    public ResponseEntity<List<CommentDTOResponse>> getByOrigin(@PathVariable Integer idUser){
        try{
            List<CommentDTOResponse> commentResponseDtos = commentService.findByUserOrigin(idUser);
            return ResponseEntity.ok(commentResponseDtos);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


   @PostMapping()
    public ResponseEntity<CommentDTOResponse> createComment(@RequestBody CommentDTORequest dto){
        try{
            CommentDTOResponse createdComment = commentService.createComment(dto);
            return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<CommentDTOResponse> updateComment(@PathVariable Integer id, @RequestBody CommentDTORequest dto){
        try{
            CommentDTOResponse updatedComment = commentService.updateComment(id, dto);
            return new ResponseEntity<>(updatedComment, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HashMap<String, String>> deleteComment(@PathVariable Integer id){
        try{
            HashMap<String, String> response = commentService.deleteComment(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/getByUserDestinationAndQualification/{idUser}/{qualification}")
    public ResponseEntity<List<CommentDTOResponse>> getByDestination(@PathVariable Integer idUser, @PathVariable Integer qualification){
        try{
            List<CommentDTOResponse> commentList = commentService.findByUserDestinationAndQualification(idUser, qualification);
            return ResponseEntity.ok(commentList);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
