package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer>{
    ChatRoom findByUser_Id(int id);

}
