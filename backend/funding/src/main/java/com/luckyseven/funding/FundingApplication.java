package com.luckyseven.funding;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableFeignClients(basePackages = "com.luckyseven.funding.client")
public class FundingApplication {

	public static void main(String[] args) {
		SpringApplication.run(FundingApplication.class, args);
	}

}
