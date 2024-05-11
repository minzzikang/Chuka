package com.luckyseven.event.util;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.MetadataException;
import com.drew.metadata.exif.ExifIFD0Directory;
import com.luckyseven.event.common.exception.NotValidExtensionException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.imgscalr.Scalr;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Component
@Slf4j
public class ImageUtil {
    private String[] bannerImageExtensions = {"jpg", "png", "jpeg", "gif", "webp"};
    private String[] transparentImageExtensions = {"png"};
    private String[] opaqueImageExtensions = {"jpg", "jpeg", "gif", "webp"};

    public boolean isValidBannerImageExtension(String extension) {
        for (String validExtension : bannerImageExtensions) {
            if(extension.equals(validExtension.toUpperCase()) || extension.equals(validExtension.toLowerCase())) {
                return true;
            }
        }

        return false;
    }
    public boolean isTransparentImageExtensions(String extension) throws NotValidExtensionException {
        if(!isValidBannerImageExtension(extension)) {
            throw new NotValidExtensionException();
        }

        for (String validExtension : transparentImageExtensions) {
            if(extension.equals(validExtension.toUpperCase()) || extension.equals(validExtension.toLowerCase())) {
                return true;
            }
        }

        return false;
    }

    //EXIF에서 회전 정보를 가져오는 메소드
    public int getOrientation(Metadata metadata) {
        int orientation = 1; // 정방향
        Directory directory = metadata.getFirstDirectoryOfType(ExifIFD0Directory.class);

        //directory는 있는데 그 안에 orientation값이 없을 수 있으므로 null 체크
        if (directory != null && directory.containsTag(ExifIFD0Directory.TAG_ORIENTATION)) {
            try {
                orientation = directory.getInt(ExifIFD0Directory.TAG_ORIENTATION);
            } catch (MetadataException e) {
                throw new RuntimeException(e);
            }
        }

        return orientation;
    }

    //원본 이미지의 EXIF를 가져와 대상 이미지에 회전 적용
    public BufferedImage adjustImageRotation(File originalFile, BufferedImage passedThumbnailImage) {
        Metadata metadata = null;

        try {
            metadata = ImageMetadataReader.readMetadata(originalFile);
        } catch (ImageProcessingException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        int orientation = getOrientation(metadata);
        BufferedImage rotatedThumbnailImage = null;

        if (orientation == 6) {
            //90-degree, clockwise rotation (to the right).
            rotatedThumbnailImage = Scalr.rotate(passedThumbnailImage, Scalr.Rotation.CW_90);
        } else if (orientation == 3) {
            //180-degree, clockwise rotation (to the right).
            rotatedThumbnailImage = Scalr.rotate(passedThumbnailImage, Scalr.Rotation.CW_180);
        } else if (orientation == 8) {
            //270-degree, clockwise rotation (to the right).
            rotatedThumbnailImage = Scalr.rotate(passedThumbnailImage, Scalr.Rotation.CW_270);
        } else {
            rotatedThumbnailImage = passedThumbnailImage;
        }

        return rotatedThumbnailImage;
    }

    public File createThumbnailImage(File originalImageFile, int targetWidth, int targetHeight) throws IOException {
        //원본 이미지 읽기
        BufferedImage originalImage = ImageIO.read(originalImageFile);

        //원본 이미지의 EXIF를 가져와 원본 이미지의 사본 (BufferedImage 객체) 회전
        originalImage = adjustImageRotation(originalImageFile, originalImage);

        //썸네일 이미지 해상도 계산
        int originalWidth = originalImage.getWidth();
        int originalHeight = originalImage.getHeight();

        //원본 이미지의 해상도가 썸네일 이미지의 해상도보다 작은 경우 Input 그대로 리턴 (해상도 늘리지 않음)
        if (originalWidth <= targetWidth && originalHeight <= targetHeight) {
            return originalImageFile;
        }

        float scale = Math.min((float) targetWidth / originalWidth, (float) targetHeight / originalHeight);

        int scaledWidth = (int) (originalWidth * scale);
        int scaledHeight = (int) (originalHeight * scale);

        //썸네일 이미지 생성
        File thumbnailFile = null;
        try {
            String extension = FilenameUtils.getExtension(originalImageFile.getName());
            BufferedImage thumbnailImage = null;

            if(isTransparentImageExtensions(extension)) {
                thumbnailImage = new BufferedImage(scaledWidth, scaledHeight, BufferedImage.TYPE_INT_ARGB);
            } else {
                //Images having 4 color channels should not be written to a jpeg file -StackOverflow
                thumbnailImage = new BufferedImage(scaledWidth, scaledHeight, BufferedImage.TYPE_INT_RGB);
            }

            Graphics2D g2 = thumbnailImage.createGraphics();
            g2.drawImage(originalImage, 0, 0, scaledWidth, scaledHeight, null);
            g2.dispose();

            //banner.png -> banner_thumbnail.png
            //aae199be-5aec-4741-9cca-b25791674023_banner.png -> aae199be-5aec-4741-9cca-b25791674023_bannerThumbnail.png
            thumbnailFile = new File(FilenameUtils.getBaseName(originalImageFile.getName()) + "Thumbnail." + extension);
            ImageIO.write(thumbnailImage, extension, thumbnailFile);
        } catch (Exception e) {
            throw new IOException();
        }

        return thumbnailFile;
    }
}
