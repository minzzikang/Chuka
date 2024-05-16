package com.luckyseven.user.util;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LogUtil {

    private static final String POINTCUT_EXPRESSION_SERVICE = "execution(* com.luckyseven.user.*.service.*.*(..))";
    private static final String POINTCUT_EXPRESSION_CONTROLLER = "execution(* com.luckyseven.user.*.controller.*.*(..))";

    @Pointcut(POINTCUT_EXPRESSION_SERVICE)
    public void controllerMethods() {}

    @AfterThrowing(pointcut = "controllerMethods()", throwing = "ex")
    public void logException(Exception ex) {
        log.error("[EXCEPTION] {} : {}", ex.getClass().getSimpleName(), ex.getMessage());
        for (int i = 0; i < 5; i++) {
            log.error("[STACK TRANCE {}] {}", i, ex.getStackTrace()[i]);
        }
    }

    @Around(POINTCUT_EXPRESSION_CONTROLLER)
    public Object timeChecker(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        log.info("Start: {}", joinPoint.toString());
        try {

            return joinPoint.proceed();
        } finally {
            long finish = System.currentTimeMillis();
            log.info("End: {}ms, joinPoint: {}", (finish - start), joinPoint);
        }
    }

}
