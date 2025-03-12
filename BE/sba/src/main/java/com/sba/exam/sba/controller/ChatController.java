package com.sba.exam.sba.controller;

import com.sba.exam.sba.payload.request.ChatRequest;
import com.sba.exam.sba.service.imp.ChatServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @Autowired
    ChatServiceImp chatServiceImp;


    @PostMapping("/send")
    @SendTo("/topic/messages")
    public ResponseEntity<?> sendMessage(@RequestBody ChatRequest chatRequest) {
        try {
            chatServiceImp.sendMessage(chatRequest.getSenderId(), chatRequest.getReceiveId(), chatRequest.getChatRoomId(), chatRequest.getMessage());
            messagingTemplate.convertAndSend("/topic/messages/", chatRequest.getMessage() + "|" + chatRequest.getSenderId() + "|" + chatRequest.getReceiveId() + "|" + chatRequest.getChatRoomId());
            return ResponseEntity.status(201).body("Message sent");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error sending message: " + e.getMessage());
        }
    }

    @GetMapping("/read")
    public ResponseEntity<?> readMessage(@RequestParam int senderId, @RequestParam int receiveId, @RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(chatServiceImp.readMessage(senderId, receiveId, page, size));
    }
}
