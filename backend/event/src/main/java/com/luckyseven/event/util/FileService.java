package com.luckyseven.event.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.luckyseven.event.common.exception.BigFileException;
import com.luckyseven.event.common.exception.EmptyFileException;
import com.luckyseven.event.common.exception.NotValidExtensionException;
import com.luckyseven.event.rollsheet.entity.Event;
import com.luckyseven.event.rollsheet.repository.EventRepository;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public class FileService {
    @Value("${spring.servlet.multipart.location}")
    private String uploadPath;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Autowired
    AmazonS3 amazonS3Client;

    @Autowired
    FileUtil fileUtil;

    @Autowired
    ImageUtil imageUtil;

    public void makeThumbnailBannerImage(MultipartFile multipartFile) {
        //TODO
    }

    public String[] uploadBannerImageToAmazonS3(MultipartFile multipartFile) throws EmptyFileException, BigFileException, NotValidExtensionException {
        //1. 파일 유효성 검사
        //1-1. 업로드 한 파일이 비어있는지 확인
        if (multipartFile.isEmpty()) {
            throw new EmptyFileException();
        }

        //1-2. 클라이언트가 업로드한 파일의 확장자 추출 (이미지 확장자인지 검사)
        String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        if (!imageUtil.isValidBannerImageExtension(extension)) {
            throw new NotValidExtensionException();
        }

        //1-3. 파일 용량 체크
        if (fileUtil.isLargerThan20MB(multipartFile)) {
            throw new BigFileException();
        }

        //2. File 객체 생성
        File bannerFile = null;

        //2-1. 파일 명 결정
        //application.properties 파일에 저장된 ${spring.servlet.multipart.location} 값 불러옴 (Amazon S3에 저장할 디렉토리 경로) 예: chuka/upload/
        Path root = Paths.get(uploadPath);

        //서비스 서버에 임시 저장하는 파일명 = UUID + '_banner' + 원본 확장자로 결정 (예: chuka/upload/aae199be-5aec-4741-9cca-b25791674023_banner.png)
        //2-1-1. UUID 생성 (같은 이름의 파일 업로드 충돌 방지)
        String uuid = UUID.randomUUID().toString();

        String bannerFilePath = uuid + "_banner." + extension;
        String bannerThumbnailFilePath = uuid + "_bannerThumbnail." + extension;

        // 2-2. 파일 객체 생성 (MultipartFile -> File) (썸네일 생성 및 Amazon S3 업로드 위함)
        bannerFile = fileUtil.multipartFile2File(multipartFile);

        //2-3. 가로 길이 최대 5300px, 세로 길이 최대 1080px인 썸네일 이미지 생성
        File bannerThumbnailFile = imageUtil.createThumbnailImage(bannerFile, 5300, 1080);

        //3. Amazon S3 파일 업로드
        try (InputStream inputStream = multipartFile.getInputStream()) {
            //3-1. 원본 이미지 업로드
            amazonS3Client.putObject(new PutObjectRequest(bucket, bannerFilePath, bannerFile).withCannedAcl(CannedAccessControlList.PublicRead));

            //3-2. 썸네일 이미지 업로드
            amazonS3Client.putObject(new PutObjectRequest(bucket, bannerThumbnailFilePath, bannerThumbnailFile).withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (Exception e) {
            e.printStackTrace();
        }

        //4. 테이블에 배너 이미지 경로 추가
        //TODO: 여기부터
        event.setBanner();
        event.setBannerThumbnail();

        if (profileImage == null) {
            profileImage = new ProfileImage();
            profileImage.setMember(member);
        } else { // 4-2. AmazonS3의 기존 프로필 이미지 삭제
            deleteProfileImageFilesOnAmazonS3(member.getKakaoId());
        }

        // 4-3. profile_image 테이블에 Amazon S3 기준 파일 경로 저장
        profileImage.setProfileImagePath(amazonProfileFilePath);
        profileImage.setThumbnailImagePath(amazonProfileThumbnailFilePath);

        profileImageRepository.save(profileImage);

        // 4-3. member 테이블에 Amazon S3 기준 파일 경로 저장
        member.setProfileImage(getProfileImageUrl(member.getKakaoId()));
        member.setThumbnailImage(getProfileThumbnailImageUrl(member.getKakaoId()));

        memberRepository.save(member);

        // 5. MultipartFile -> File로 변환하면서 로컬에 저장된 파일 삭제
        fileUtil.removeFile(convertedFile);
        fileUtil.removeFile(thumbnailFile);

        return true;
    }
}
