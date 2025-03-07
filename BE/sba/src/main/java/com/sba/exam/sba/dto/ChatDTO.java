package com.sba.exam.sba.dto;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class ChatDTO {
    private int chatId;

    private String message;

    private Date sendTime;

    private boolean isRead;

    private int chatRoomId;
    private int senderId;
}
