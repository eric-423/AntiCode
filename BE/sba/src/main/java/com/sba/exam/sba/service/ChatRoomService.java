package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.ChatRoomDTO;
import com.sba.exam.sba.entity.Chat;
import com.sba.exam.sba.entity.ChatRoom;
import com.sba.exam.sba.repository.ChatRoomRepository;
import com.sba.exam.sba.service.imp.ChatRoomServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatRoomService implements ChatRoomServiceImp {

    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Override
    public List<ChatRoomDTO> getAllChatRoom() {
        List<ChatRoom> chatRooms =chatRoomRepository.findAll();
        List<ChatRoomDTO> result = new ArrayList<>();
        for(ChatRoom chatRoom: chatRooms){
            result.add(tranferDTO(chatRoom));
        }
        return result;
    }

    private ChatRoomDTO tranferDTO(ChatRoom chatRoom) {
        ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
        chatRoomDTO.setId(chatRoom.getId());
        chatRoomDTO.setName(chatRoom.getName());
        chatRoomDTO.setCreateAt(chatRoom.getCreateAt());
        chatRoomDTO.setLastUpdate(chatRoom.getLastUpdate());
        chatRoomDTO.setSenderId(chatRoom.getUser().getId());
        return chatRoomDTO;
    }

    @Override
    public ChatRoomDTO getChatRoom(int chatRoomId) {
        return null;
    }
}
