import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Plus,
    Trash2,
    BookOpen,
    FileText,
    Library,
    Search,
    Sparkles,
    X,
    ArrowUpRight,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashBoardLayout";
import Button from "../components/ui/Button";
import axiosInstance from "../utils/axioinstance";
import { API_PATHS } from "../utils/apiPaths";
import BookCard from "../components/cards/BookCard";
import CreateBookModal from "../components/modals/CreateBookModal";

const BookCardSkeleton = () => {
    return (
        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                shadow-[0_8px_30px_rgba(15,23,42,0.04)]
            "
        >
            <div
                className="
                    relative
                    aspect-[3/4]
                    w-full
                    animate-pulse
                    overflow-hidden
                    bg-gradient-to-br
                    from-slate-200
                    via-slate-100
                    to-slate-200
                "
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />

                <div className="absolute right-3 top-3 flex gap-2">
                    <div className="h-8 w-8 rounded-xl bg-slate-300/80" />
                    <div className="h-8 w-8 rounded-xl bg-slate-300/80" />
                </div>

                <div
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        h-14
                        w-14
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-2xl
                        bg-slate-300/70
                    "
                />
            </div>

            <div className="p-3">
                <div className="mb-3 h-4 w-4/5 animate-pulse rounded-md bg-slate-200" />

                <div className="mb-4 h-3 w-2/5 animate-pulse rounded-md bg-slate-200" />

                <div className="flex justify-between border-t border-slate-100 pt-3">
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
                </div>
            </div>
        </div>
    );
};

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div
                className="
                    absolute
                    inset-0
                    bg-slate-950/50
                    backdrop-blur-md
                "
                onClick={onClose}
            />

            <div
                className="
                    relative
                    w-full
                    max-w-md
                    animate-[modalIn_.25s_ease-out]
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/60
                    bg-white
                    p-6
                    shadow-[0_30px_80px_rgba(15,23,42,0.22)]
                "
            >
                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-16
                        h-32
                        w-32
                        rounded-full
                        bg-red-100/70
                        blur-3xl
                    "
                />

                <div className="relative mb-4 flex items-center gap-4">
                    <div
                        className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-red-50
                            ring-8
                            ring-red-50/50
                        "
                    >
                        <Trash2 className="h-5 w-5 text-red-600" />
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            {title}
                        </h3>

                        <p className="mt-0.5 text-xs text-slate-400">
                            This action requires confirmation
                        </p>
                    </div>
                </div>

                <p className="relative mb-7 text-sm leading-6 text-slate-600">
                    {message}
                </p>

                <div className="relative flex justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-red-600
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-red-600/20
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:bg-red-700
                            hover:shadow-red-600/30
                            active:translate-y-0
                        "
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const SmallStatCard = ({
    icon: Icon,
    value,
    label,
    description,
    iconClassName,
}) => {
    return (
        <div
            className="
                group
                relative
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                px-4
                py-3.5
                shadow-[0_6px_24px_rgba(15,23,42,0.035)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-indigo-100
                hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]
                sm:w-[210px]
            "
        >
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-8
                    -top-8
                    h-20
                    w-20
                    rounded-full
                    bg-indigo-100/50
                    opacity-0
                    blur-2xl
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                "
            />

            <div className="relative flex items-center gap-3.5">
                <div
                    className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${iconClassName}
                    `}
                >
                    <Icon className="h-[18px] w-[18px]" />
                </div>

                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <span
                            className="
                                text-xl
                                font-extrabold
                                leading-none
                                tracking-tight
                                text-slate-900
                            "
                        >
                            {value}
                        </span>

                        <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                    </div>

                    <p className="mt-1 text-xs font-bold text-slate-700">
                        {label}
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const EmptyState = ({
    searchActive = false,
    onCreate,
    onClearSearch,
}) => {
    return (
        <div
            className="
                relative
                flex
                min-h-[430px]
                flex-col
                items-center
                justify-center
                overflow-hidden
                rounded-3xl
                border
                border-dashed
                border-slate-200
                bg-white
                px-6
                text-center
                shadow-[0_8px_30px_rgba(15,23,42,0.025)]
            "
        >
            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-72
                    w-72
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-indigo-50/60
                    blur-3xl
                "
            />

            <div className="relative">
                <div
                    className="
                        mx-auto
                        mb-5
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-3xl
                        bg-gradient-to-br
                        from-indigo-50
                        to-violet-50
                        shadow-inner
                    "
                >
                    {searchActive ? (
                        <Search className="h-8 w-8 text-indigo-400" />
                    ) : (
                        <BookOpen className="h-8 w-8 text-indigo-400" />
                    )}
                </div>

                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                    {searchActive
                        ? "No eBooks found"
                        : "Your library is empty"}
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    {searchActive
                        ? "We couldn't find any eBooks matching your search. Try another title."
                        : "You haven't created any eBooks yet. Start building your first AI-powered book today."}
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-3">
                    {searchActive && (
                        <button
                            type="button"
                            onClick={onClearSearch}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-slate-600
                                shadow-sm
                                transition-all
                                hover:-translate-y-0.5
                                hover:border-slate-300
                                hover:shadow-md
                            "
                        >
                            <X className="h-4 w-4" />
                            Clear Search
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={onCreate}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-gradient-to-r
                            from-indigo-600
                            to-violet-600
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-indigo-600/20
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:shadow-xl
                            hover:shadow-indigo-600/25
                        "
                    >
                        <Plus className="h-4 w-4" />

                        {searchActive
                            ? "Create New eBook"
                            : "Create Your First eBook"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const DashboardPage = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isCreateModalOpen, setIsCreateModalOpen] =
        useState(false);

    const [bookToDelete, setBookToDelete] =
        useState(null);

    const [searchQuery, setSearchQuery] =
        useState("");

    const navigate = useNavigate();

    const fetchBooks = async () => {
        try {
            setIsLoading(true);

            const response = await axiosInstance.get(
                API_PATHS.BOOKS.GET_BOOKS
            );

            console.log(
                "BOOK API RESPONSE:",
                response.data
            );

            let booksData = [];

            if (Array.isArray(response.data)) {
                booksData = response.data;
            } else if (
                Array.isArray(response.data?.books)
            ) {
                booksData = response.data.books;
            }

            setBooks(booksData);
        } catch (error) {
            console.error(
                "FETCH BOOKS ERROR:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                    "Failed to fetch your eBooks."
            );

            setBooks([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const filteredBooks = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return books;
        }

        return books.filter((book) => {
            const title =
                book?.title?.toLowerCase() || "";

            const author =
                book?.author?.toLowerCase() || "";

            const subtitle =
                book?.subtitle?.toLowerCase() || "";

            return (
                title.includes(query) ||
                author.includes(query) ||
                subtitle.includes(query)
            );
        });
    }, [books, searchQuery]);

    const totalBooks = books.length;

    const draftBooks = books.filter(
        (book) =>
            book?.status?.toLowerCase() !==
            "published"
    ).length;

    const handleCreateBookClick = () => {
        setIsCreateModalOpen(true);
    };

    const handleBookCreated = (bookId) => {
        setIsCreateModalOpen(false);

        if (!bookId) {
            toast.error(
                "Book was created but ID was not returned."
            );
            return;
        }

        navigate(`/editor/${bookId}`);
    };

    const handleDeleteBook = async () => {
        if (!bookToDelete) {
            return;
        }

        try {
            await axiosInstance.delete(
                API_PATHS.BOOKS.DELETE_BOOK(
                    bookToDelete
                )
            );

            setBooks((previousBooks) =>
                previousBooks.filter(
                    (book) =>
                        book._id !==
                        bookToDelete
                )
            );

            toast.success(
                "eBook deleted successfully."
            );
        } catch (error) {
            console.error(
                "DELETE BOOK ERROR:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                    "Failed to delete eBook."
            );
        } finally {
            setBookToDelete(null);
        }
    };

    return (
        <DashboardLayout>
            <div
                className="
                    relative
                    min-h-full
                    overflow-hidden
                    bg-[#f8f9fc]
                "
            >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                        className="
                            absolute
                            -left-32
                            -top-32
                            h-96
                            w-96
                            rounded-full
                            bg-indigo-200/20
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            absolute
                            right-[-180px]
                            top-[350px]
                            h-[420px]
                            w-[420px]
                            rounded-full
                            bg-violet-200/20
                            blur-3xl
                        "
                    />

                    <div
                        className="absolute inset-0 opacity-[0.025]"
                        style={{
                            backgroundImage:
                                "linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)",
                            backgroundSize:
                                "40px 40px",
                        }}
                    />
                </div>

                <div
                    className="
                        relative
                        mx-auto
                        w-full
                        max-w-[1440px]
                        px-5
                        py-6
                        sm:px-7
                        lg:px-9
                        lg:py-8
                    "
                >
                    <div
                        className="
                            mb-7
                            flex
                            flex-col
                            gap-5
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >
                        <div className="animate-[fadeUp_.5s_ease-out]">
                            <div className="mb-3 flex items-center gap-2">
                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        rounded-full
                                        border
                                        border-indigo-100
                                        bg-indigo-50/80
                                        px-2.5
                                        py-1
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-indigo-600
                                    "
                                >
                                    <Sparkles className="h-3 w-3" />
                                    AI Workspace
                                </span>
                            </div>

                            <h1
                                className="
                                    text-[28px]
                                    font-extrabold
                                    tracking-[-0.04em]
                                    text-slate-900
                                    sm:text-[32px]
                                "
                            >
                                All eBooks
                            </h1>

                            <p
                                className="
                                    mt-1.5
                                    max-w-xl
                                    text-sm
                                    leading-6
                                    text-slate-500
                                "
                            >
                                Create, edit, organize and
                                manage your AI-generated
                                eBooks in one place.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={
                                handleCreateBookClick
                            }
                            className="
                                group
                                inline-flex
                                h-12
                                shrink-0
                                items-center
                                justify-center
                                gap-3
                                rounded-2xl
                                bg-gradient-to-r
                                from-indigo-600
                                via-indigo-600
                                to-violet-600
                                px-4
                                pr-5
                                text-sm
                                font-bold
                                text-white
                                shadow-[0_10px_25px_rgba(79,70,229,0.25)]
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-[0_16px_35px_rgba(79,70,229,0.3)]
                                active:translate-y-0
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-white/15
                                    transition-transform
                                    duration-300
                                    group-hover:rotate-90
                                "
                            >
                                <Plus className="h-4 w-4" />
                            </span>

                            Create New eBook

                            <ArrowUpRight
                                className="
                                    h-4
                                    w-4
                                    opacity-70
                                    transition-transform
                                    duration-300
                                    group-hover:-translate-y-0.5
                                    group-hover:translate-x-0.5
                                "
                            />
                        </button>
                    </div>

                    {!isLoading && (
                        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                            <SmallStatCard
                                icon={Library}
                                value={totalBooks}
                                label="Total eBooks"
                                description="Books in your library"
                                iconClassName="bg-indigo-50 text-indigo-600"
                            />

                            <SmallStatCard
                                icon={FileText}
                                value={draftBooks}
                                label="Drafts"
                                description="Currently in progress"
                                iconClassName="bg-amber-50 text-amber-600"
                            />
                        </div>
                    )}

                    <div
                        className="
                            mb-5
                            flex
                            flex-col
                            gap-4
                            lg:flex-row
                            lg:items-end
                            lg:justify-between
                        "
                    >
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                                    Your Library
                                </h2>

                                {!isLoading && (
                                    <span
                                        className="
                                            rounded-full
                                            bg-slate-100
                                            px-2.5
                                            py-1
                                            text-[10px]
                                            font-bold
                                            text-slate-500
                                        "
                                    >
                                        {
                                            filteredBooks.length
                                        }
                                    </span>
                                )}
                            </div>

                            <p className="mt-1 text-xs text-slate-400">
                                Browse and manage all your
                                eBooks.
                            </p>
                        </div>

                        {!isLoading &&
                            books.length > 0 && (
                                <div className="flex w-full max-w-md items-center gap-2">
                                    <div
                                        className="
                                            group
                                            relative
                                            flex
                                            h-10
                                            w-full
                                            items-center
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-white
                                            shadow-sm
                                            transition-all
                                            focus-within:border-indigo-300
                                            focus-within:ring-4
                                            focus-within:ring-indigo-500/5
                                        "
                                    >
                                        <Search
                                            className="
                                                ml-3
                                                h-4
                                                w-4
                                                shrink-0
                                                text-slate-400
                                                transition-colors
                                                group-focus-within:text-indigo-500
                                            "
                                        />

                                        <input
                                            type="text"
                                            value={
                                                searchQuery
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setSearchQuery(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="Search eBooks..."
                                            className="
                                                h-full
                                                min-w-0
                                                flex-1
                                                bg-transparent
                                                px-2.5
                                                text-xs
                                                text-slate-700
                                                outline-none
                                                placeholder:text-slate-400
                                            "
                                        />

                                        {searchQuery && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSearchQuery(
                                                        ""
                                                    )
                                                }
                                                className="
                                                    mr-2
                                                    flex
                                                    h-6
                                                    w-6
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    text-slate-400
                                                    transition-colors
                                                    hover:bg-slate-100
                                                    hover:text-slate-600
                                                "
                                            >
                                                <X className="h-3.5 w-3.5" />
                                            </button>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={
                                            handleCreateBookClick
                                        }
                                        className="
                                            hidden
                                            h-10
                                            shrink-0
                                            items-center
                                            gap-1.5
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-white
                                            px-3
                                            text-xs
                                            font-semibold
                                            text-slate-600
                                            shadow-sm
                                            transition-all
                                            hover:-translate-y-0.5
                                            hover:border-indigo-200
                                            hover:bg-indigo-50
                                            hover:text-indigo-600
                                            sm:flex
                                        "
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        New
                                    </button>
                                </div>
                            )}
                    </div>

                    <div
                        className="
                            mb-6
                            h-px
                            bg-gradient-to-r
                            from-slate-200
                            via-slate-200/70
                            to-transparent
                        "
                    />

                    {isLoading && (
                        <div
                            className="
                                grid
                                grid-cols-2
                                gap-4
                                lg:grid-cols-3
                                lg:gap-5
                                xl:grid-cols-4
                            "
                        >
                            {Array.from({
                                length: 8,
                            }).map((_, index) => (
                                <BookCardSkeleton
                                    key={index}
                                />
                            ))}
                        </div>
                    )}

                    {!isLoading &&
                        filteredBooks.length ===
                            0 && (
                            <EmptyState
                                searchActive={
                                    searchQuery.trim()
                                        .length > 0
                                }
                                onCreate={
                                    handleCreateBookClick
                                }
                                onClearSearch={() =>
                                    setSearchQuery(
                                        ""
                                    )
                                }
                            />
                        )}

                    {!isLoading && filteredBooks.length > 0 && (
                        <div
                            className="
                                grid
                                grid-cols-2
                                gap-x-9
                                gap-y-5
                                sm:grid-cols-3
                                lg:grid-cols-4
                                xl:grid-cols-5
                                2xl:grid-cols-6
                            "
                        >
                            {filteredBooks.map((book, index) => (
                                <div
                                    key={book._id}
                                    className="
                                        flex
                                        justify-center
                                        animate-[bookCardIn_.45s_ease-out_both]
                                    "
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                    }}
                                >
                                    <BookCard
                                        book={book}
                                        onDelete={() =>
                                            setBookToDelete(book._id)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <ConfirmationModal
                        isOpen={Boolean(
                            bookToDelete
                        )}
                        onClose={() =>
                            setBookToDelete(null)
                        }
                        onConfirm={
                            handleDeleteBook
                        }
                        title="Delete eBook"
                        message="Are you sure you want to delete this eBook? All of its content will be permanently removed and this action cannot be undone."
                    />

                    {isCreateModalOpen && (
                        <CreateBookModal
                            isOpen={
                                isCreateModalOpen
                            }
                            onClose={() =>
                                setIsCreateModalOpen(
                                    false
                                )
                            }
                            onBookCreated={
                                handleBookCreated
                            }
                        />
                    )}
                </div>

                <style>{`
                    @keyframes fadeUp {
                        from {
                            opacity: 0;
                            transform: translateY(12px);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes bookCardIn {
                        from {
                            opacity: 0;
                            transform: translateY(18px) scale(0.98);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }

                    @keyframes modalIn {
                        from {
                            opacity: 0;
                            transform: translateY(12px) scale(0.97);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                `}</style>
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage;