package com.sba.exam.sba.controller;


import com.sba.exam.sba.dto.ChatRoomDTO;
import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.service.imp.ChatRoomServiceImp;
import com.sba.exam.sba.service.imp.ChatServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/chat-room")
public class ChatRoomController {

    @Autowired
    ChatRoomServiceImp chatRoomServiceImp;

    @Autowired
    SimpMessagingTemplate messagingTemplate;


    @GetMapping()
    @SendTo("/topic/chat-room")
    public ResponseEntity<?> getChatRoom() {
        ResponseData responseData = new ResponseData();
        List<ChatRoomDTO> chatRoomDTOList = chatRoomServiceImp.getAllChatRoom();
        responseData.setData(chatRoomDTOList);
        messagingTemplate.convertAndSend("/topic/messages", chatRoomDTOList);
        return ResponseEntity.ok(responseData);

    }
}
