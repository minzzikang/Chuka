package com.luckyseven.event.util;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LogUtil {

    private static final String POINTCUT_EXPRESSION = "execution(* com.luckyseven.event.*.controller.*.*(..))";

    @Pointcut(POINTCUT_EXPRESSION)
    public void controllerMethods() {}

    @AfterThrowing(pointcut = "controllerMethods()", throwing = "ex")
    public void logException(Exception ex) {
        // 예외가 발생했을 때 이 메소드가 실행됩니다.
        System.out.println("An exception occurred: " + ex.getMessage());
    }

}
