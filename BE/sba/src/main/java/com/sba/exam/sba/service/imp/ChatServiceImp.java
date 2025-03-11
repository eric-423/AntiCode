package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.ChatDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ChatServiceImp {

    boolean sendMessage(int senderId, int receiveId, int chatRoomId, String message);

    Page<ChatDTO> readMessage(int senderId, int receiveId, int page, int size);

    void deleteMessage(int userId, int chatRoomId);

}
