package com.sba.exam.sba;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SbaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SbaApplication.class, args);
	}

}
