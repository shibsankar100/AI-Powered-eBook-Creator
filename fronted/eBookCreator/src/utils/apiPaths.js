export const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000";export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_PROFILE: "/api/auth/profile",
        UPDATE_PROFILE: "/api/auth/profile",
    },
    BOOKS: {
        CREATE_BOOK: "/api/books",
        GET_BOOKS: "/api/books",
        GET_BOOK: (id) =>
            `/api/books/${id}`,
        GET_BOOK_BY_ID: (id) =>
            `/api/books/${id}`,
        UPDATE_BOOK: (id) =>
            `/api/books/${id}`,
        DELETE_BOOK: (id) =>
            `/api/books/${id}`,
        UPLOAD_COVER: (id) =>
            `/api/books/cover/${id}`,
        UPDATE_COVER: (id) =>
            `/api/books/cover/${id}`,
    },
    AI: {
        GENERATE_OUTLINE:
            "/api/ai/generate-outline",

        GENERATE_CHAPTER_CONTENT:
            "/api/ai/generate-chapter-content",
    },
    EXPORT: {
        PDF: (id) =>
            `/api/export/${id}/pdf`,

        DOC: (id) =>
            `/api/export/${id}/doc`,
    },
};