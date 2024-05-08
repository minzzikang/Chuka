package com.luckyseven.notification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.luckyseven.notification.util")
public class NotificationApplication {

	public static void main(String[] args) {

		SpringApplication.run(NotificationApplication.class, args);

	}
}
