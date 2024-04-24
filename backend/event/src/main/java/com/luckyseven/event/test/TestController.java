package com.luckyseven.event.test;

import com.luckyseven.event.util.FileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

//TODO: 지우기
@Slf4j
@Tag(name = "Test", description = "이벤트 등록 테스트 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/test")
public class TestController {
    @Autowired
    FileService fileService;

    @PostMapping(value = "/banner", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(summary = "배너 이미지 업로드", description = "배너 이미지를 업로드한다.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "정상 수정"),
        @ApiResponse(responseCode = "400", description = "비어있는 파일"),
        @ApiResponse(responseCode = "413", description = "20MB를 초과하는 파일"),
        @ApiResponse(responseCode = "415", description = "지원하지 않는 확장자"),
        @ApiResponse(responseCode = "500", description = "서버 오류"),
        @ApiResponse(responseCode = "503", description = "서버 오류 (File IO)")
    })
    public ResponseEntity<?> uploadBanner (@RequestPart(value = "file", required = false) MultipartFile bannerImage) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(memberService.getSelfProfileURL(kakaoId));
        } catch (EmptyFileException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(BaseResponseBody.of(400, "파일이 비어있습니다."));
        } catch (BigFileException e) {
            return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                    .body(BaseResponseBody.of(413, "업로드한 파일의 용량이 20MB 이상입니다."));
        } catch (NotValidExtensionException e) {
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                    .body(
                            BaseResponseBody.of(
                                    415, "지원하는 확장자가 아닙니다. 지원하는 이미지 형식: jpg, jpeg, pdf, tiff"));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(BaseResponseBody.of(503, "썸네일 이미지 생성 중 예외 발생 (서비스 서버 오류)"));
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponseBody.of(500, "서버 오류"));
        }
    }
}
