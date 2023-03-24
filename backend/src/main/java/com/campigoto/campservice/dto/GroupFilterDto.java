package com.campigoto.campservice.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class GroupFilterDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String searchTerm;
    private String property;
}
