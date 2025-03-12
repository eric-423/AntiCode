package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Chat;
import com.sba.exam.sba.entity.ChatRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    List<Chat> findByChatRoom(ChatRoom chatRoom);


    @Query("SELECT c FROM Chat c WHERE c.sender.id = :senderId AND c.receive.id = :receiveId " +
            "OR" +
            " c.sender.id = :receiveId AND c.receive.id = :senderId")
    List<Chat> findBySender_IdAndReceive_Id(@Param("senderId") int senderId, @Param("receiveId") int receiveId);

}
