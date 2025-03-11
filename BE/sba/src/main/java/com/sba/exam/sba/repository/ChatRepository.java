package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Chat;
import com.sba.exam.sba.entity.ChatRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    List<Chat> findByChatRoom(ChatRoom chatRoom);
}
