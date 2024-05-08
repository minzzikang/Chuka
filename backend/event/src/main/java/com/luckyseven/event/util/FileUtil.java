package com.luckyseven.event.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Component
@Slf4j
public class FileUtil {
    public File multipartFile2File(MultipartFile multipartFile) {
        File file = new File(multipartFile.getOriginalFilename());

        try {
            file.createNewFile();
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(multipartFile.getBytes());
            fos.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return file;
    }

    public void removeFile(File targetFile) {
        if (targetFile.exists()) {
            targetFile.delete();
        }
    }

    public boolean isLargerThan20MB(MultipartFile receiptImage) {
        //배너 이미지 20MB 초과 업로드 불가
        return receiptImage.getSize() > 2 * Math.pow(10, 7);
    }
}
