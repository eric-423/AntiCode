package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.ChatDTO;

import java.util.List;

public interface ChatServiceImp {

    boolean sendMessage(int userId, int chatRoomId, String message);

    List<ChatDTO> readMessage(int chatRoomId);

    void deleteMessage(int userId, int chatRoomId);

}
