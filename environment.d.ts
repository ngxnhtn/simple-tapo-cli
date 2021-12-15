declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MAIL: string;
            PASS: string;
        }
    }
}

export {};