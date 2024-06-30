
interface ImportMetaEnv {
    readonly VITE_APP_CODESPACE_NAME: string;
    readonly VITE_GET_PLAYER_URL: string;
    readonly VITE_POST_PLAYER_URL: string;
    readonly VITE_DELETE_PLAYER_URL: string;
    readonly VITE_POST_USER_URL: string;
    readonly VITE_GET_USER_URL: string;
    readonly VITE_VALIDATE_TOKEN_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}