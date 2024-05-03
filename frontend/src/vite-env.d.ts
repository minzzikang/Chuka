/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_API_KEY: string;
  readonly VITE_REDIRECT_URI: string;
  readonly VITE_KAKAO_JS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  Kakao: any;
}