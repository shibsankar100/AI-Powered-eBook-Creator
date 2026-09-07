import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    BookOpen,
    Pencil,
    Trash2,
    User,
    ArrowUpRight,
} from "lucide-react";

const API_BASE_URL = "http://localhost:8000";

const BookCard = ({ book, onDelete }) => {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);
    const title =
        typeof book?.title === "string" && book.title.trim()
            ? book.title.trim()
            : "Untitled eBook";

    const author =
        typeof book?.author === "string" && book.author.trim()
            ? book.author.trim()
            : "Unknown Author";

    const coverImage =
        typeof book?.coverImage === "string"
            ? book.coverImage.trim()
            : "";

    const getCoverUrl = () => {
        if (!coverImage) {
            return "";
        }
        if (
            coverImage.startsWith("http://") ||
            coverImage.startsWith("https://")
        ) {
            return coverImage;
        }
        if (coverImage.startsWith("blob:")) {
            return coverImage;
        }
        if (coverImage.startsWith("data:image")) {
            return coverImage;
        }

        if (coverImage.startsWith("/")) {
            return `${API_BASE_URL}${coverImage}`;
        }
        return `${API_BASE_URL}/${coverImage}`;
    };

    const coverUrl = getCoverUrl();

    const handleEdit = (event) => {
        event.stopPropagation();

        if (!book?._id) {
            return;
        }

        navigate(`/editor/${book._id}`);
    };

    const handleDelete = (event) => {
        event.stopPropagation();

        if (!book?._id) {
            return;
        }

        onDelete?.(book);
    };
    const handleOpenBook = () => {
        if (!book?._id) {
            return;
        }

        navigate(`/editor/${book._id}`);
    };

    return (
        <article
            className="
                group
                mx-auto
                w-full
                max-w-[220px]
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-[0_4px_18px_rgba(15,23,42,0.05)]
                transition-all
                duration-300
                ease-out
                hover:-translate-y-1
                hover:border-slate-300
                hover:shadow-[0_12px_28px_rgba(15,23,42,0.10)]
            "
        >
            <div
                className="
                    relative
                    aspect-[2/3]
                    w-full
                    cursor-pointer
                    overflow-hidden
                    bg-slate-100
                "
                onClick={handleOpenBook}
            >
                {coverUrl && !imageError ? (
                    <img
                        src={coverUrl}
                        alt={`${title} cover`}
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            ease-out
                            group-hover:scale-[1.035]
                        "
                        onError={() => {
                            console.error(
                                "COVER IMAGE FAILED:",
                                coverUrl
                            );

                            setImageError(true);
                        }}
                    />
                ) : (
                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            flex-col
                            items-center
                            justify-center
                            overflow-hidden
                            bg-gradient-to-br
                            from-indigo-950
                            via-violet-900
                            to-slate-950
                            px-5
                            text-center
                        "
                    >
                        <div
                            className="
                                absolute
                                -right-16
                                -top-16
                                h-40
                                w-40
                                rounded-full
                                bg-violet-400/10
                                blur-2xl
                            "
                        />

                        <div
                            className="
                                absolute
                                -bottom-20
                                -left-16
                                h-44
                                w-44
                                rounded-full
                                bg-indigo-400/10
                                blur-2xl
                            "
                        />
                        <div
                            className="
                                relative
                                mb-4
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/15
                                bg-white/10
                                shadow-lg
                                backdrop-blur-sm
                            "
                        >
                            <BookOpen
                                className="h-6 w-6 text-white"
                                strokeWidth={1.7}
                            />
                        </div>
                        <h2
                            className="
                                relative
                                line-clamp-4
                                text-base
                                font-bold
                                leading-tight
                                text-white
                            "
                        >
                            {title}
                        </h2>
                        <p
                            className="
                                relative
                                mt-3
                                line-clamp-1
                                text-[11px]
                                text-white/55
                            "
                        >
                            {author}
                        </p>
                    </div>
                )}
                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/30
                        via-transparent
                        to-black/5
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                    "
                />
                <div
                    className="
                        absolute
                        right-2.5
                        top-2.5
                        z-20
                        hidden
                        items-center
                        gap-1.5
                        opacity-0
                        transition-all
                        duration-200
                        md:flex
                        md:-translate-y-1
                        md:group-hover:translate-y-0
                        md:group-hover:opacity-100
                    "
                >
                    <button
                        type="button"
                        onClick={handleEdit}
                        title="Edit eBook"
                        aria-label="Edit eBook"
                        className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-slate-200
                            bg-white/95
                            text-slate-700
                            shadow-lg
                            backdrop-blur-sm
                            transition-all
                            duration-200
                            hover:border-slate-900
                            hover:bg-slate-900
                            hover:text-white
                            active:scale-90
                        "
                    >
                        <Pencil className="h-3 w-3" />
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        title="Delete eBook"
                        aria-label="Delete eBook"
                        className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-slate-200
                            bg-white/95
                            text-red-500
                            shadow-lg
                            backdrop-blur-sm
                            transition-all
                            duration-200
                            hover:border-red-500
                            hover:bg-red-500
                            hover:text-white
                            active:scale-90
                        "
                    >
                        <Trash2 className="h-3 w-3" />
                    </button>
                </div>

                <div
                    className="
                        absolute
                        right-2.5
                        top-2.5
                        z-20
                        flex
                        items-center
                        gap-1.5
                        md:hidden
                    "
                >
                    <button
                        type="button"
                        onClick={handleEdit}
                        title="Edit eBook"
                        aria-label="Edit eBook"
                        className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-white/95
                            text-slate-700
                            shadow-lg
                        "
                    >
                        <Pencil className="h-3 w-3" />
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        title="Delete eBook"
                        aria-label="Delete eBook"
                        className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-white/95
                            text-red-500
                            shadow-lg
                        "
                    >
                        <Trash2 className="h-3 w-3" />
                    </button>
                </div>
                <div
                    className="
                        absolute
                        bottom-2.5
                        right-2.5
                        z-10
                        flex
                        h-7
                        w-7
                        scale-90
                        items-center
                        justify-center
                        rounded-full
                        bg-white/90
                        opacity-0
                        shadow-lg
                        backdrop-blur-sm
                        transition-all
                        duration-300
                        group-hover:scale-100
                        group-hover:opacity-100
                    "
                >
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-800" />
                </div>
            </div>

            <div className="px-3 pb-3.5 pt-3">
                <h3
                    onClick={handleOpenBook}
                    title={title}
                    className="
                        line-clamp-2
                        cursor-pointer
                        text-[13px]
                        font-bold
                        leading-snug
                        tracking-tight
                        text-slate-900
                        transition-colors
                        duration-200
                        group-hover:text-indigo-700
                    "
                >
                    {title}
                </h3>
                <div className="mt-2 flex min-w-0 items-center gap-1.5">
                    <div
                        className="
                            flex
                            h-5
                            w-5
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-100
                        "
                    >
                        <User className="h-3 w-3 text-slate-400" />
                    </div>

                    <p
                        title={author}
                        className="
                            truncate
                            text-[11px]
                            font-medium
                            text-slate-500
                        "
                    >
                        {author}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default BookCard;