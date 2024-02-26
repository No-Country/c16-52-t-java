package com.lookingprof.lookingProf.repository;

import com.lookingprof.lookingProf.model.Comment;
import com.lookingprof.lookingProf.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findByUserOrigin(User user);

    List<Comment> findByUserDestination(User user);

    List<Comment> findByUserDestinationAndQualification(User user, Integer qualify);

}

