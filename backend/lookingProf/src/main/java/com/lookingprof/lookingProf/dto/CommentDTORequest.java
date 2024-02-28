package com.lookingprof.lookingProf.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CommentDTORequest {

    String description;
    Integer qualification;
    Integer userOrigin;
    Integer userDestination;


}
