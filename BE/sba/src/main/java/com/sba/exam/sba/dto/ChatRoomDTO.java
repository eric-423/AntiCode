package com.sba.exam.sba.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class ChatRoomDTO {
    private int id;

    private String name;

    private Date createAt;

    private Date lastUpdate;

    private int senderId;

    private List<ChatDTO> chats = new ArrayList<>();
}
