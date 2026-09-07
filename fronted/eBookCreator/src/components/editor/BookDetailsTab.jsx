import {
    UploadCloud,
    Image as ImageIcon,
    BookOpen,
    User,
    Type,
    Sparkles,
    CheckCircle2,
    FileImage,
    X,
} from "lucide-react";
import { useRef, useState } from "react";

import InputField from "../ui/InputField";
import { BASE_URL } from "../../utils/apiPaths";

const BookDetailsTab = ({
    book,
    onBookChange,
    onCoverImageUpload,
    onCoverUpload,
    isUploading = false,
    fileInputRef,
}) => {
    const internalFileInputRef = useRef(null);
    const [previewError, setPreviewError] = useState(false);
    const uploadHandler =
        onCoverImageUpload || onCoverUpload;

    const inputRef =
        fileInputRef || internalFileInputRef;
    const getCoverImageUrl = () => {
        const rawCover = book?.coverImage;

        if (
            typeof rawCover !== "string" ||
            !rawCover.trim()
        ) {
            return "";
        }

        const cleaned = rawCover.trim();
        if (
            cleaned.startsWith("http://") ||
            cleaned.startsWith("https://")
        ) {
            return cleaned;
        }
        if (cleaned.startsWith("blob:")) {
            return cleaned;
        }
        if (cleaned.startsWith("data:image")) {
            return cleaned;
        }
        const normalized = cleaned.replace(/\\/g, "/");

        const baseUrl = String(BASE_URL || "")
            .replace(/\/+$/, "");

        if (normalized.startsWith("/uploads/")) {
            return `${baseUrl}${normalized}`;
        }
        if (normalized.startsWith("uploads/")) {
            return `${baseUrl}/${normalized}`;
        }
        if (normalized.startsWith("/backend/uploads/")) {
            return `${baseUrl}${normalized.replace(
                "/backend",
                ""
            )}`;
        }

        if (normalized.startsWith("backend/uploads/")) {
            return `${baseUrl}/${normalized.replace(
                "backend/",
                ""
            )}`;
        }

        if (normalized.startsWith("/")) {
            return `${baseUrl}${normalized}`;
        }

        return `${baseUrl}/${normalized}`;
    };

    const coverImageUrl = getCoverImageUrl();
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setPreviewError(false);

        if (typeof uploadHandler !== "function") {
            console.error(
                "Cover upload handler is missing."
            );
            return;
        }

        uploadHandler(event);
    };

    const openFilePicker = () => {
        if (isUploading) return;

        inputRef.current?.click();
    };

    const handleRemoveCover = () => {
        if (typeof onBookChange !== "function") {
            return;
        }

        onBookChange("coverImage", "");

        setPreviewError(false);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };
    return (
        <div className="book-details-tab mx-auto w-full max-w-[1400px]">

            <style>{`
                @keyframes bookDetailsFade {
                    0% {
                        opacity: 0;
                        transform: translateY(14px);
                    }

                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes cardReveal {
                    0% {
                        opacity: 0;
                        transform: translateY(18px) scale(.985);
                    }

                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes iconFloat {
                    0%,
                    100% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(-3px);
                    }
                }

                @keyframes shimmer {
                    0% {
                        transform: translateX(-120%);
                    }

                    100% {
                        transform: translateX(120%);
                    }
                }

                .details-header {
                    animation:
                        bookDetailsFade
                        .55s
                        cubic-bezier(.22,1,.36,1)
                        both;
                }

                .details-card {
                    animation:
                        cardReveal
                        .65s
                        cubic-bezier(.22,1,.36,1)
                        both;
                }

                .details-card:nth-child(2) {
                    animation-delay: .08s;
                }

                .details-icon {
                    transition:
                        transform .3s ease,
                        box-shadow .3s ease;
                }

                .details-icon:hover {
                    transform: translateY(-2px) rotate(-2deg);
                    box-shadow:
                        0 10px 24px
                        rgba(79,70,229,.12);
                }

                .info-field {
                    transition:
                        transform .25s ease;
                }

                .info-field:hover {
                    transform: translateX(2px);
                }

                .stat-card {
                    transition:
                        transform .25s ease,
                        border-color .25s ease,
                        box-shadow .25s ease;
                }

                .stat-card:hover {
                    transform: translateY(-3px);
                    border-color: #c7d2fe;
                    box-shadow:
                        0 12px 25px
                        rgba(15,23,42,.06);
                }

                .cover-frame {
                    transition:
                        transform .35s cubic-bezier(.22,1,.36,1),
                        box-shadow .35s ease;
                }

                .cover-frame:hover {
                    transform: translateY(-5px);
                    box-shadow:
                        0 22px 45px
                        rgba(15,23,42,.16);
                }

                .upload-zone {
                    position: relative;
                    overflow: hidden;
                    transition:
                        transform .25s ease,
                        border-color .25s ease,
                        background .25s ease,
                        box-shadow .25s ease;
                }

                .upload-zone::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 40%;
                    height: 100%;
                    background:
                        linear-gradient(
                            90deg,
                            transparent,
                            rgba(255,255,255,.65),
                            transparent
                        );
                    transform: translateX(-120%);
                    pointer-events: none;
                }

                .upload-zone:hover::after {
                    animation: shimmer .8s ease;
                }

                .upload-zone:hover:not(:disabled) {
                    transform: translateY(-2px);
                    border-color: #a5b4fc;
                    background: #f5f3ff;
                    box-shadow:
                        0 12px 28px
                        rgba(79,70,229,.08);
                }

                .remove-button {
                    transition:
                        transform .2s ease,
                        background .2s ease,
                        color .2s ease;
                }

                .remove-button:hover {
                    transform: scale(1.08);
                }

                .empty-cover-icon {
                    animation: iconFloat 3s ease-in-out infinite;
                }

                /* Prevent unnecessary inner mouse scrolling */
                .book-details-tab {
                    overflow: visible;
                }

                @media (prefers-reduced-motion: reduce) {
                    .details-header,
                    .details-card,
                    .empty-cover-icon {
                        animation: none !important;
                    }

                    * {
                        scroll-behavior: auto !important;
                    }
                }
            `}</style>
            <div className="details-header mb-5 flex items-center gap-3">

                <div className="details-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-white text-indigo-600 shadow-sm">
                    <BookOpen size={21} />
                </div>

                <div className="min-w-0">
                    <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                        Book Details
                    </h1>

                    <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                        Manage your book information and cover design.
                    </p>
                </div>
            </div>

            <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_350px]">

                <section className="details-card overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,.045)]">

                    {/* Header */}

                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                        <div className="flex items-center gap-3">

                            <div className="details-icon flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <FileImage size={17} />
                            </div>

                            <div>
                                <h2 className="text-sm font-extrabold text-slate-900">
                                    Book Information
                                </h2>

                                <p className="mt-0.5 text-[11px] text-slate-400">
                                    Update your basic information
                                </p>
                            </div>

                        </div>

                        <div className="hidden items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 sm:flex">

                            <CheckCircle2
                                size={12}
                                className="text-emerald-600"
                            />

                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-600">
                                Editable
                            </span>

                        </div>
                    </div>

                    {/* Content */}

                    <div className="space-y-4 p-5">
                        <div className="info-field">
                            <div className="mb-1.5 flex items-center gap-2">
                                <Type
                                    size={13}
                                    className="text-indigo-500"
                                />

                                <span className="text-[9px] font-extrabold uppercase tracking-[.14em] text-slate-400">
                                    Book Title
                                </span>
                            </div>

                            <InputField
                                label=""
                                name="title"
                                value={book?.title || ""}
                                onChange={(event) =>
                                    onBookChange(
                                        "title",
                                        event.target.value
                                    )
                                }
                                placeholder="Enter book title"
                            />
                        </div>
                        <div className="info-field">
                            <div className="mb-1.5 flex items-center gap-2">
                                <User
                                    size={13}
                                    className="text-indigo-500"
                                />

                                <span className="text-[9px] font-extrabold uppercase tracking-[.14em] text-slate-400">
                                    Author
                                </span>
                            </div>

                            <InputField
                                label=""
                                name="author"
                                value={book?.author || ""}
                                onChange={(event) =>
                                    onBookChange(
                                        "author",
                                        event.target.value
                                    )
                                }
                                placeholder="Enter author name"
                            />
                        </div>
                        <div className="info-field">
                            <div className="mb-1.5 flex items-center gap-2">
                                <Sparkles
                                    size={13}
                                    className="text-violet-500"
                                />

                                <span className="text-[9px] font-extrabold uppercase tracking-[.14em] text-slate-400">
                                    Subtitle
                                </span>
                            </div>

                            <InputField
                                label=""
                                name="subtitle"
                                value={book?.subtitle || ""}
                                onChange={(event) =>
                                    onBookChange(
                                        "subtitle",
                                        event.target.value
                                    )
                                }
                                placeholder="Enter subtitle"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-1">

                            <div className="stat-card rounded-2xl border border-slate-200 bg-slate-50/70 p-3">

                                <p className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400">
                                    Chapters
                                </p>

                                <p className="mt-1.5 text-xl font-black text-slate-900">
                                    {Array.isArray(book?.chapters)
                                        ? book.chapters.length
                                        : 0}
                                </p>
                            </div>

                            <div className="stat-card rounded-2xl border border-slate-200 bg-slate-50/70 p-3">

                                <p className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400">
                                    Words
                                </p>

                                <p className="mt-1.5 text-xl font-black text-slate-900">
                                    {getTotalWords(
                                        book?.chapters
                                    ).toLocaleString()}
                                </p>
                            </div>

                            <div className="stat-card rounded-2xl border border-indigo-100 bg-indigo-50/60 p-3">

                                <p className="text-[8px] font-extrabold uppercase tracking-wider text-indigo-400">
                                    Status
                                </p>

                                <div className="mt-2 flex items-center gap-1.5">

                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                                    <p className="text-xs font-black text-emerald-600">
                                        Active
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <section className="details-card overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,.045)]">

                    {/* Header */}

                    <div className="border-b border-slate-100 px-5 py-4">

                        <div className="flex items-center gap-3">

                            <div className="details-icon flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                <ImageIcon size={17} />
                            </div>

                            <div>
                                <h2 className="text-sm font-extrabold text-slate-900">
                                    Cover Image
                                </h2>

                                <p className="mt-0.5 text-[11px] text-slate-400">
                                    Add a professional book cover
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex justify-center">

                            {coverImageUrl && !previewError ? (

                                <div className="cover-frame relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-[0_12px_30px_rgba(15,23,42,.12)]">

                                    <div className="relative h-[270px] w-[202px] overflow-hidden">

                                        <img
                                            src={coverImageUrl}
                                            alt={
                                                book?.title ||
                                                "Book cover"
                                            }
                                            className="h-full w-full object-cover"
                                            onError={() => {
                                                console.error(
                                                    "COVER PREVIEW FAILED:",
                                                    coverImageUrl
                                                );

                                                setPreviewError(true);
                                            }}
                                        />

                                        {/* Bottom gradient */}

                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/40 to-transparent" />

                                        {/* Uploaded badge */}

                                        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[8px] font-bold text-white backdrop-blur-md">

                                            <CheckCircle2 size={10} />

                                            Cover uploaded
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleRemoveCover}
                                            disabled={isUploading}
                                            title="Remove cover"
                                            className="
                                                remove-button
                                                absolute
                                                right-2.5
                                                top-2.5
                                                flex
                                                h-7
                                                w-7
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-white/95
                                                text-slate-600
                                                shadow-md
                                                backdrop-blur-sm
                                                hover:bg-red-500
                                                hover:text-white
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        >
                                            <X size={13} />
                                        </button>

                                    </div>
                                </div>

                            ) : (

                                <div className="flex h-[270px] w-[202px] items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">

                                    <div className="px-4 text-center">

                                        <div className="empty-cover-icon mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500">

                                            <ImageIcon size={21} />

                                        </div>

                                        <p className="mt-4 text-xs font-extrabold text-slate-700">
                                            No cover image
                                        </p>

                                        <p className="mt-1 text-[10px] leading-4 text-slate-400">
                                            Upload JPG, PNG or WEBP
                                        </p>

                                    </div>
                                </div>
                            )}

                        </div>

                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={openFilePicker}
                            disabled={isUploading}
                            className="
                                upload-zone
                                mt-4
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                border-dashed
                                border-indigo-200
                                bg-indigo-50/40
                                px-4
                                py-3
                                text-xs
                                font-extrabold
                                text-indigo-600
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >

                            {isUploading ? (
                                <>
                                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-indigo-300 border-t-indigo-600" />

                                    Uploading cover...
                                </>
                            ) : (
                                <>
                                    <UploadCloud size={15} />

                                    {coverImageUrl
                                        ? "Change Cover Image"
                                        : "Upload Cover Image"}
                                </>
                            )}

                        </button>
                        <div className="mt-3 flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">

                            <ImageIcon
                                size={12}
                                className="mt-0.5 shrink-0 text-slate-400"
                            />

                            <p className="text-[9px] leading-4 text-slate-400">
                                Recommended 600 × 800px · Max 5MB ·
                                JPG, PNG or WEBP
                            </p>

                        </div>
                        {previewError && (
                            <div className="mt-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-[10px] leading-4 font-medium text-red-600">
                                The cover was uploaded, but the
                                image could not be displayed.
                                Check that your backend is serving
                                the /uploads folder.
                            </div>
                        )}

                    </div>
                </section>
            </div>
        </div>
    );
};

function getTotalWords(chapters = []) {
    if (!Array.isArray(chapters)) {
        return 0;
    }

    return chapters.reduce(
        (total, chapter) => {
            const text = String(
                chapter?.content || ""
            ).trim();

            if (!text) {
                return total;
            }

            const count = text
                .split(/\s+/)
                .filter(Boolean).length;

            return total + count;
        },
        0
    );
}

export default BookDetailsTab;
