package com.luckyseven.user.user.repository;

import com.luckyseven.user.user.entity.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    void findByUserId() {
        User byUserId = userRepository.findByUserId("1");

        assertThat(byUserId).isNotNull();
    }

}
