package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.ChatDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ChatServiceImp {

    boolean sendMessage(int userId, int chatRoomId, String message);

    Page<ChatDTO> readMessage(int chatRoomId, int page, int size);

    void deleteMessage(int userId, int chatRoomId);

}
