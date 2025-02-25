package com.sba.exam.sba.controller;

import com.sba.exam.sba.service.RecentActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recent-activity")
public class RecentActivityController {

    @Autowired
    private RecentActivityService recentActivityService;

    @GetMapping("/receiver")
    public ResponseEntity<?> getRecentActivityByReceiverId(@RequestParam int receiverId) {
        return new ResponseEntity<>(recentActivityService.getRecentActivityByUserId(receiverId), HttpStatus.CREATED);
    }

    @GetMapping("/manager")
    public ResponseEntity<?> getRecentActivityByManager() {
        return new ResponseEntity<>(recentActivityService.getRecentActivityByManager(), HttpStatus.CREATED);
    }
}
