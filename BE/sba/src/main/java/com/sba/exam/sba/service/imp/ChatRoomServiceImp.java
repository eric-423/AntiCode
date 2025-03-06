package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.ChatRoomDTO;

import java.util.List;

public interface ChatRoomServiceImp {
    List<ChatRoomDTO> getAllChatRoom();
    ChatRoomDTO getChatRoom(int chatRoomId);
}
