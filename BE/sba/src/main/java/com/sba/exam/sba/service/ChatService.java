package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.ChatDTO;
import com.sba.exam.sba.entity.Chat;
import com.sba.exam.sba.entity.ChatRoom;
import com.sba.exam.sba.entity.Users;
import com.sba.exam.sba.repository.ChatRepository;
import com.sba.exam.sba.repository.ChatRoomRepository;
import com.sba.exam.sba.repository.UserRepository;
import com.sba.exam.sba.service.imp.ChatServiceImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ChatService implements ChatServiceImp {

    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Autowired
    ChatRepository chatRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public boolean sendMessage(int userId, int chatRoomId, String message) {

        try {
            Users user = userRepository.findById(userId).get();
            ChatRoom chatRoom = chatRoomRepository.findByUser_Id(userId);

            if (chatRoom == null) {
                chatRoom = new ChatRoom();
                chatRoom.setName(user.getUserName());
                chatRoom.setCreateAt(new Date());
                chatRoom.setLastUpdate(new Date());
                chatRoom.setUser(user);
                chatRoomRepository.save(chatRoom);
            }

            Chat chat = new Chat();
            chat.setMessage(message);
            chat.setSendTime(new Date());
            chat.setRead(false);
            chat.setChatRoom(chatRoom);
            chat.setSender(user);
            chatRepository.save(chat);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public List<ChatDTO> readMessage(int chatRoomId) {
        List<Chat> chats = chatRepository.findByChatRoom(chatRoomRepository.findById(chatRoomId).get());
        List<ChatDTO> result = new ArrayList<>();
        for (Chat chat : chats){
            result.add(tranferDTO(chat));
        }
        return result;
    }

    private ChatDTO tranferDTO(Chat chat){
        ChatDTO result = new ChatDTO();
        result.setChatId(chat.getChatId());
        result.setMessage(chat.getMessage());
        result.setSendTime(chat.getSendTime());
        result.setRead(chat.isRead());
        result.setChatRoomId(chat.getChatRoom().getId());
        result.setSenderId(chat.getSender().getId());
        return result;
    }

    @Override
    public void deleteMessage(int userId, int chatRoomId) {

    }
}
