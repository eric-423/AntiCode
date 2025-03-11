package com.sba.exam.sba.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChatRequest {
    private int receiveId;
    private int senderId;
    private int chatRoomId;
    private String message;
}
