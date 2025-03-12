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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
    public boolean sendMessage(int senderId, int receiveId, int chatRoomId, String message) {

        try {
            Users sender = userRepository.findById(senderId).get();
            Users receive = userRepository.findById(receiveId).get();
            ChatRoom chatRoom = chatRoomRepository.findByUser_Id(senderId);

            if (chatRoom == null) {
                chatRoom = new ChatRoom();
                chatRoom.setName(sender.getUserName());
                chatRoom.setCreateAt(new Date());
                chatRoom.setLastUpdate(new Date());
                chatRoom.setUser(sender);
                chatRoomRepository.save(chatRoom);
            }

            Chat chat = new Chat();
            chat.setMessage(message);
            chat.setSendTime(new Date());
            chat.setRead(false);
            chat.setChatRoom(chatRoom);
            chat.setSender(sender);
            chat.setReceive(receive);


            chatRepository.save(chat);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Page<ChatDTO> readMessage(int senderId,int receiveId, int page, int size) {
//        List<Chat> chats = chatRepository.findByChatRoom(chatRoomRepository.findById(chatRoomId).orElseThrow(() -> new RuntimeException("Chat room not found")));
        List<ChatDTO> chatDTOS = new ArrayList<>();
        List<Chat> chats = chatRepository.findBySender_IdAndReceive_Id(senderId, receiveId);

        for (Chat chat : chats) {
            chatDTOS.add(tranferDTO(chat));
        }

        int totalElement = chatDTOS.size();
        int start = Math.min(page * size, chats.size());
        int end = Math.min(page + size, chats.size());

        List<ChatDTO> chatSublist = chatDTOS.subList(start, end);
        return new PageImpl<>(chatSublist, PageRequest.of(page, size), totalElement);
    }

    private ChatDTO tranferDTO(Chat chat) {
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
