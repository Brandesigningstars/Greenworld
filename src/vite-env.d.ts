/// <reference types="vite/client" />

declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.mp4' {
    const src: string;
    export default src;
}

declare module '*.MP4' {
    const src: string;
    export default src;
}
