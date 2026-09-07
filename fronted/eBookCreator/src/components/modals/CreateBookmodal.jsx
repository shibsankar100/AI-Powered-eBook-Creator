import { useEffect, useRef, useState } from "react";
import {
    Plus,
    Sparkles,
    Trash2,
    ArrowLeft,
    BookOpen,
    Hash,
    Lightbulb,
    Palette,
    X,
    Check,
} from "lucide-react";

import axiosInstance from "../../utils/axioinstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const createChapterId = () => {
    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {
        return crypto.randomUUID();
    }

    return `chapter-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`;
};

const InputField = ({
    icon: Icon,
    label,
    placeholder,
    value,
    onChange,
    type = "text",
    min,
    max,
}) => {
    return (
        <div className="group w-full">
            <label
                className="
                    mb-1.5
                    block
                    text-[13px]
                    font-bold
                    text-slate-700
                    transition-colors
                    group-focus-within:text-indigo-600
                "
            >
                {label}
            </label>

            <div className="relative">
                {Icon && (
                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-3
                            top-1/2
                            flex
                            h-7
                            w-7
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-lg
                            bg-slate-100/80
                            text-slate-400
                            transition-colors
                            group-focus-within:bg-indigo-50
                            group-focus-within:text-indigo-600
                        "
                    >
                        <Icon
                            strokeWidth={2.2}
                            className="h-3.5 w-3.5"
                        />
                    </div>
                )}

                <input
                    type={type}
                    min={min}
                    max={max}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50/50
                        text-[14px]
                        font-medium
                        text-slate-900
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        hover:border-slate-300
                        hover:bg-white
                        focus:border-indigo-500
                        focus:bg-white
                        focus:ring-[3px]
                        focus:ring-indigo-500/15
                        ${Icon ? "pl-12 pr-4" : "px-4"}
                    `}
                />
            </div>
        </div>
    );
};

const SelectField = ({
    icon: Icon,
    label,
    value,
    onChange,
    options = [],
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <div
            className="group relative z-[100] w-full"
            ref={dropdownRef}
        >
            <label
                className="
                    mb-1.5
                    block
                    text-[13px]
                    font-bold
                    text-slate-700
                    transition-colors
                    group-focus-within:text-indigo-600
                "
            >
                {label}
            </label>

            <div className="relative">
                <div
                    onMouseDown={() =>
                        setIsOpen((previous) => !previous)
                    }
                    className={`
                        relative
                        flex
                        h-11
                        w-full
                        cursor-pointer
                        items-center
                        rounded-xl
                        border
                        bg-slate-50/50
                        px-4
                        text-[14px]
                        font-medium
                        text-slate-900
                        outline-none
                        transition-all
                        hover:bg-white
                        ${
                            isOpen
                                ? "border-indigo-500 bg-white ring-[3px] ring-indigo-500/15"
                                : "border-slate-200 hover:border-slate-300"
                        }
                        ${Icon ? "pl-12" : ""}
                    `}
                >
                    {Icon && (
                        <div
                            className={`
                                absolute
                                left-3
                                top-1/2
                                flex
                                h-7
                                w-7
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-lg
                                transition-colors
                                ${
                                    isOpen
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "bg-slate-100/80 text-slate-400 group-hover:text-slate-500"
                                }
                            `}
                        >
                            <Icon
                                strokeWidth={2.2}
                                className="h-3.5 w-3.5"
                            />
                        </div>
                    )}

                    <span className="flex-1 select-none truncate">
                        {value}
                    </span>

                    <div
                        className="
                            pointer-events-none
                            absolute
                            right-3
                            top-1/2
                            flex
                            h-5
                            w-5
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-md
                            bg-white
                            text-slate-400
                            shadow-sm
                            ring-1
                            ring-slate-200
                        "
                    >
                        <svg
                            className={`
                                h-3
                                w-3
                                transition-transform
                                duration-200
                                ${
                                    isOpen
                                        ? "rotate-180 text-indigo-500"
                                        : ""
                                }
                            `}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>

                {isOpen && (
                    <div
                        className="
                            absolute
                            left-0
                            top-[calc(100%+8px)]
                            z-[9999]
                            w-full
                            origin-top
                            overflow-hidden
                            rounded-[16px]
                            border
                            border-slate-200
                            bg-white/95
                            p-1.5
                            shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)]
                            backdrop-blur-xl
                            animate-in
                            fade-in
                            zoom-in-95
                            slide-in-from-top-2
                        "
                    >
                        {options.map((option) => (
                            <div
                                key={option}
                                onMouseDown={(event) => {
                                    event.preventDefault();

                                    onChange({
                                        target: {
                                            value: option,
                                        },
                                    });

                                    setIsOpen(false);
                                }}
                                className={`
                                    flex
                                    cursor-pointer
                                    select-none
                                    items-center
                                    justify-between
                                    rounded-xl
                                    px-3.5
                                    py-2.5
                                    text-[13.5px]
                                    font-semibold
                                    transition-all
                                    ${
                                        value === option
                                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                    }
                                `}
                            >
                                {option}

                                {value === option && (
                                    <Check
                                        className="h-4 w-4"
                                        strokeWidth={3}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const StepIndicator = ({ step }) => {
    return (
        <div className="mb-8 flex w-full items-center justify-center pt-2">
            <div
                className={`
                    relative
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-xs
                    font-bold
                    transition-all
                    duration-500
                    ${
                        step >= 1
                            ? "scale-110 bg-indigo-500 text-white shadow-lg shadow-indigo-500/40"
                            : "bg-slate-100 text-slate-400"
                    }
                `}
            >
                {step > 1 ? (
                    <Check className="h-4 w-4 animate-[spin_0.3s_ease-out]" />
                ) : (
                    "1"
                )}
            </div>

            <div className="relative mx-3 flex h-[2px] w-20 overflow-hidden rounded-full bg-slate-100">
                <div
                    className={`
                        absolute
                        bottom-0
                        left-0
                        top-0
                        w-full
                        bg-indigo-400
                        transition-transform
                        duration-700
                        ease-in-out
                        ${
                            step >= 2
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }
                    `}
                />
            </div>

            <div
                className={`
                    relative
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-xs
                    font-bold
                    transition-all
                    duration-500
                    ${
                        step >= 2
                            ? "scale-110 bg-indigo-500 text-white shadow-lg shadow-indigo-500/40"
                            : "bg-slate-100 text-slate-400"
                    }
                `}
            >
                2
            </div>
        </div>
    );
};

const normalizeChapter = (chapter, index) => {
    const stableId =
        chapter?.id ||
        chapter?._id ||
        createChapterId();

    if (typeof chapter === "string") {
        return {
            id: stableId,
            title: chapter,
            description: "",
        };
    }

    if (!chapter || typeof chapter !== "object") {
        return {
            id: stableId,
            title: `Chapter ${index + 1}`,
            description: "",
        };
    }

    return {
        ...chapter,
        id: stableId,
        title:
            chapter.title ||
            chapter.chapterTitle ||
            chapter.name ||
            `Chapter ${index + 1}`,
        description:
            chapter.description ||
            chapter.summary ||
            "",
    };
};

const CreateBookModal = ({
    isOpen,
    onClose,
    onBookCreated,
}) => {
    const { user } = useAuth();

    const [isAnimating, setIsAnimating] =
        useState(false);

    const [step, setStep] = useState(1);

    const [bookTitle, setBookTitle] =
        useState("");

    const [numChapters, setNumChapters] =
        useState(5);

    const [aiTopic, setAiTopic] =
        useState("");

    const [aiStyle, setAiStyle] =
        useState("Informative");

    const [chapters, setChapters] =
        useState([]);

    const [isGeneratingOutline, setIsGeneratingOutline] =
        useState(false);

    const [isFinalizingBook, setIsFinalizingBook] =
        useState(false);

    const chaptersContainerRef =
        useRef(null);

    const resetModal = () => {
        setStep(1);
        setBookTitle("");
        setNumChapters(5);
        setAiTopic("");
        setAiStyle("Informative");
        setChapters([]);
        setIsGeneratingOutline(false);
        setIsFinalizingBook(false);
    };

    const handleClose = () => {
        if (
            isGeneratingOutline ||
            isFinalizingBook
        ) {
            return;
        }

        setIsAnimating(false);

        setTimeout(() => {
            onClose?.();
            resetModal();
        }, 300);
    };

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() =>
                setIsAnimating(true)
            );
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [
        isOpen,
        isGeneratingOutline,
        isFinalizingBook,
    ]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const originalOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow =
                originalOverflow;
        };
    }, [isOpen]);

    const handleGenerateOutline = async () => {
        const trimmedTitle =
            bookTitle.trim();

        if (!trimmedTitle) {
            toast.error(
                "Please enter a book title."
            );
            return;
        }

        if (
            !numChapters ||
            Number(numChapters) < 1 ||
            Number(numChapters) > 20
        ) {
            toast.error(
                "Number of chapters must be between 1 and 20."
            );
            return;
        }

        setIsGeneratingOutline(true);

        try {
            const response =
                await axiosInstance.post(
                    API_PATHS.AI.GENERATE_OUTLINE,
                    {
                        topic: trimmedTitle,
                        description:
                            aiTopic.trim() || "",
                        style: aiStyle,
                        numChapters:
                            Number(numChapters),
                    }
                );

            const generatedOutline =
                response.data?.outline || [];

            if (
                !Array.isArray(
                    generatedOutline
                )
            ) {
                throw new Error(
                    "Invalid outline received from server."
                );
            }

            const normalizedChapters =
                generatedOutline.map(
                    (chapter, index) =>
                        normalizeChapter(
                            chapter,
                            index
                        )
                );

            if (
                normalizedChapters.length ===
                0
            ) {
                toast.error(
                    "No chapters generated."
                );
                return;
            }

            setChapters(
                normalizedChapters
            );

            setStep(2);

            toast.success(
                "Outline generated!"
            );

            setTimeout(() => {
                if (
                    chaptersContainerRef.current
                ) {
                    chaptersContainerRef.current.scrollTop = 0;
                }
            }, 50);
        } catch (error) {
            console.error(
                "GENERATE OUTLINE ERROR:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                    error.message ||
                    "Failed to generate outline."
            );
        } finally {
            setIsGeneratingOutline(
                false
            );
        }
    };

    const handleChapterChange = (
        index,
        field,
        value
    ) => {
        setChapters((previousChapters) =>
            previousChapters.map(
                (chapter, chapterIndex) =>
                    chapterIndex === index
                        ? {
                              ...chapter,
                              [field]: value,
                          }
                        : chapter
            )
        );
    };

    const handleDeleteChapter = (
        index
    ) => {
        if (chapters.length <= 1) {
            toast.error(
                "Must contain at least one chapter."
            );
            return;
        }

        setChapters((previousChapters) =>
            previousChapters.filter(
                (_, chapterIndex) =>
                    chapterIndex !== index
            )
        );
    };

    const handleAddChapter = () => {
        setChapters((previousChapters) => [
            ...previousChapters,
            {
                id: createChapterId(),
                title: "",
                description: "",
            },
        ]);

        setTimeout(() => {
            if (
                chaptersContainerRef.current
            ) {
                chaptersContainerRef.current.scrollTo(
                    {
                        top: chaptersContainerRef
                            .current
                            .scrollHeight,
                        behavior: "smooth",
                    }
                );
            }
        }, 100);
    };

    const handleFinalizeBook =
        async () => {
            const trimmedTitle =
                bookTitle.trim();

            if (!trimmedTitle) {
                toast.error(
                    "Please enter a book title."
                );
                return;
            }

            const invalidChapter =
                chapters.some(
                    (chapter) =>
                        !chapter.title ||
                        !chapter.title.trim()
                );

            if (invalidChapter) {
                toast.error(
                    "Please enter a title for every chapter."
                );
                return;
            }

            setIsFinalizingBook(true);

            try {
                const cleanedChapters =
                    chapters.map(
                        (chapter, index) => ({
                            title:
                                chapter.title.trim() ||
                                `Chapter ${
                                    index + 1
                                }`,
                            description:
                                chapter.description?.trim() ||
                                "",
                        })
                    );

                const response =
                    await axiosInstance.post(
                        API_PATHS.BOOKS.CREATE_BOOK,
                        {
                            title: trimmedTitle,
                            author:
                                user?.name ||
                                "Unknown Author",
                            chapters:
                                cleanedChapters,
                        }
                    );

                const bookId =
                    response.data?._id;

                if (!bookId) {
                    throw new Error(
                        "Book ID missing."
                    );
                }

                toast.success(
                    "eBook created successfully!"
                );

                if (onBookCreated) {
                    onBookCreated(bookId);
                }

                setIsAnimating(false);

                setTimeout(() => {
                    onClose?.();
                    resetModal();
                }, 300);
            } catch (error) {
                console.error(
                    "CREATE BOOK ERROR:",
                    error
                );

                toast.error(
                    error.response?.data
                        ?.message ||
                        error.message ||
                        "Failed to create eBook."
                );
            } finally {
                setIsFinalizingBook(false);
            }
        };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={`
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                p-4
                transition-all
                duration-300
                ${
                    isAnimating
                        ? "bg-slate-900/40 backdrop-blur-sm"
                        : "bg-transparent backdrop-blur-none"
                }
            `}
        >
            <div
                className="absolute inset-0"
                onClick={handleClose}
            />

            <div
                className={`
                    relative
                    flex
                    w-full
                    max-w-[460px]
                    flex-col
                    rounded-[24px]
                    bg-white
                    shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]
                    ring-1
                    ring-slate-900/5
                    transition-all
                    duration-300
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${
                        isAnimating
                            ? "translate-y-0 scale-100 opacity-100"
                            : "translate-y-8 scale-95 opacity-0"
                    }
                `}
                style={{
                    maxHeight: "90vh",
                }}
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
                    <div
                        className="
                            absolute
                            -right-20
                            -top-20
                            -z-10
                            h-48
                            w-48
                            rounded-full
                            bg-gradient-to-br
                            from-indigo-500/10
                            to-purple-500/10
                            blur-2xl
                        "
                    />

                    <div
                        className="
                            absolute
                            -bottom-20
                            -left-20
                            -z-10
                            h-48
                            w-48
                            rounded-full
                            bg-gradient-to-tr
                            from-violet-500/10
                            to-fuchsia-500/10
                            blur-2xl
                        "
                    />
                </div>

                <div
                    className="
                        z-40
                        flex
                        shrink-0
                        items-center
                        justify-between
                        rounded-t-[24px]
                        px-7
                        pb-3
                        pt-7
                    "
                >
                    <div>
                        <h2
                            className="
                                text-[22px]
                                font-extrabold
                                tracking-tight
                                text-slate-900
                            "
                        >
                            New eBook
                        </h2>

                        <p
                            className="
                                mt-0.5
                                text-[13px]
                                font-medium
                                text-slate-500
                            "
                        >
                            {step === 1
                                ? "Set up your book details"
                                : "Customize your outline"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={
                            isGeneratingOutline ||
                            isFinalizingBook
                        }
                        className="
                            group
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-100/80
                            transition-all
                            hover:bg-slate-200
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <X
                            className="
                                h-4
                                w-4
                                text-slate-500
                                transition-colors
                                group-hover:text-slate-800
                            "
                            strokeWidth={2.5}
                        />
                    </button>
                </div>

                <div
                    ref={chaptersContainerRef}
                    className={`
                        relative
                        flex-1
                        px-7
                        pb-2
                        ${
                            step === 1
                                ? "z-30 overflow-visible"
                                : "z-10 overflow-y-auto"
                        }
                    `}
                    style={{
                        scrollbarWidth: "none",
                    }}
                >
                    <StepIndicator
                        step={step}
                    />

                    <div
                        className={`
                            transition-all
                            duration-500
                            ${
                                step === 1
                                    ? "block translate-x-0 opacity-100"
                                    : "hidden -translate-x-10 opacity-0"
                            }
                        `}
                    >
                        <div className="space-y-4 pb-6 pt-1">
                            <InputField
                                icon={BookOpen}
                                label="Book Title"
                                placeholder="What is your book about?"
                                value={bookTitle}
                                onChange={(event) =>
                                    setBookTitle(
                                        event.target.value
                                    )
                                }
                            />

                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <InputField
                                        icon={Hash}
                                        label="Chapters"
                                        type="number"
                                        placeholder="5"
                                        value={
                                            numChapters
                                        }
                                        min="1"
                                        max="20"
                                        onChange={(
                                            event
                                        ) => {
                                            const value =
                                                event
                                                    .target
                                                    .value;

                                            if (
                                                value ===
                                                ""
                                            ) {
                                                setNumChapters(
                                                    ""
                                                );
                                                return;
                                            }

                                            setNumChapters(
                                                Math.min(
                                                    20,
                                                    Math.max(
                                                        1,
                                                        Number(
                                                            value
                                                        )
                                                    )
                                                )
                                            );
                                        }}
                                    />
                                </div>

                                <div className="relative w-1/2">
                                    <SelectField
                                        icon={Palette}
                                        label="Style"
                                        value={
                                            aiStyle
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setAiStyle(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        options={[
                                            "Informative",
                                            "Storytelling",
                                            "Casual",
                                            "Professional",
                                            "Humorous",
                                        ]}
                                    />
                                </div>
                            </div>

                            <InputField
                                icon={Lightbulb}
                                label="Topic (Optional)"
                                placeholder="e.g. A guide to minimalism..."
                                value={aiTopic}
                                onChange={(event) =>
                                    setAiTopic(
                                        event.target.value
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div
                        className={`
                            transition-all
                            duration-500
                            ${
                                step === 2
                                    ? "block translate-x-0 animate-in fade-in slide-in-from-right-8"
                                    : "hidden translate-x-10 opacity-0"
                            }
                        `}
                    >
                        <div className="space-y-4 pb-6 pt-1">
                            {chapters.map(
                                (
                                    chapter,
                                    index
                                ) => (
                                    <div
                                        key={
                                            chapter.id
                                        }
                                        className="
                                            group
                                            relative
                                            overflow-hidden
                                            rounded-[18px]
                                            border
                                            border-slate-200
                                            bg-white
                                            p-4
                                            transition-all
                                            duration-300
                                            hover:border-indigo-300
                                            hover:shadow-[0_4px_20px_-10px_rgba(79,70,229,0.15)]
                                        "
                                    >
                                        <div className="mb-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2.5">
                                                <div
                                                    className="
                                                        flex
                                                        h-6
                                                        w-6
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-md
                                                        bg-indigo-50
                                                        text-[11px]
                                                        font-bold
                                                        text-indigo-600
                                                        ring-1
                                                        ring-indigo-100/50
                                                    "
                                                >
                                                    {index +
                                                        1}
                                                </div>

                                                <span
                                                    className="
                                                        text-[13px]
                                                        font-bold
                                                        text-slate-700
                                                        transition-colors
                                                        group-hover:text-indigo-900
                                                    "
                                                >
                                                    Chapter{" "}
                                                    {index +
                                                        1}
                                                </span>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteChapter(
                                                        index
                                                    )
                                                }
                                                className="
                                                    flex
                                                    h-7
                                                    w-7
                                                    items-center
                                                    justify-center
                                                    rounded-md
                                                    text-slate-300
                                                    opacity-0
                                                    transition-all
                                                    hover:bg-red-50
                                                    hover:text-red-500
                                                    group-hover:opacity-100
                                                "
                                                title="Delete chapter"
                                            >
                                                <Trash2
                                                    className="h-4 w-4"
                                                    strokeWidth={
                                                        2.2
                                                    }
                                                />
                                            </button>
                                        </div>

                                        <input
                                            type="text"
                                            value={
                                                chapter.title ||
                                                ""
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                handleChapterChange(
                                                    index,
                                                    "title",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="Chapter Title..."
                                            className="
                                                mb-2.5
                                                h-10
                                                w-full
                                                rounded-xl
                                                border-none
                                                bg-slate-50
                                                px-3.5
                                                text-[14px]
                                                font-bold
                                                text-slate-900
                                                outline-none
                                                ring-1
                                                ring-slate-200
                                                transition-all
                                                placeholder:text-slate-400
                                                focus:bg-white
                                                focus:ring-[2px]
                                                focus:ring-indigo-500/30
                                            "
                                        />

                                        <textarea
                                            value={
                                                chapter.description ||
                                                ""
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                handleChapterChange(
                                                    index,
                                                    "description",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="Short description..."
                                            rows={2}
                                            className="
                                                w-full
                                                resize-none
                                                rounded-xl
                                                border-none
                                                bg-slate-50
                                                px-3.5
                                                py-2.5
                                                text-[13px]
                                                leading-relaxed
                                                text-slate-600
                                                outline-none
                                                ring-1
                                                ring-slate-200
                                                transition-all
                                                placeholder:text-slate-400
                                                focus:bg-white
                                                focus:ring-[2px]
                                                focus:ring-indigo-500/30
                                            "
                                        />
                                    </div>
                                )
                            )}

                            <button
                                type="button"
                                onClick={
                                    handleAddChapter
                                }
                                className="
                                    group
                                    flex
                                    min-h-[48px]
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-[16px]
                                    border
                                    border-dashed
                                    border-slate-300
                                    bg-slate-50/50
                                    text-[13px]
                                    font-bold
                                    text-slate-500
                                    transition-all
                                    duration-300
                                    hover:border-indigo-300
                                    hover:bg-indigo-50
                                    hover:text-indigo-600
                                "
                            >
                                <Plus
                                    className="
                                        h-4
                                        w-4
                                        transition-transform
                                        duration-300
                                        group-hover:rotate-90
                                        group-hover:scale-110
                                    "
                                    strokeWidth={2.5}
                                />

                                Add Chapter
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className="
                        relative
                        z-20
                        shrink-0
                        rounded-b-[24px]
                        bg-slate-50/80
                        px-7
                        py-5
                        backdrop-blur-md
                    "
                >
                    {step === 1 && (
                        <button
                            type="button"
                            onClick={
                                handleGenerateOutline
                            }
                            disabled={
                                isGeneratingOutline
                            }
                            className="
                                group
                                flex
                                h-[48px]
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-slate-900
                                px-5
                                text-[14px]
                                font-bold
                                text-white
                                transition-all
                                hover:bg-slate-800
                                focus:outline-none
                                focus:ring-4
                                focus:ring-slate-900/10
                                disabled:cursor-not-allowed
                                disabled:opacity-70
                            "
                        >
                            {isGeneratingOutline ? (
                                <>
                                    <span
                                        className="
                                            h-4
                                            w-4
                                            animate-spin
                                            rounded-full
                                            border-2
                                            border-white/30
                                            border-t-white
                                        "
                                    />

                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles
                                        className="
                                            h-4
                                            w-4
                                            text-indigo-400
                                            transition-transform
                                            group-hover:scale-110
                                            group-hover:text-white
                                        "
                                    />

                                    Generate AI Outline
                                </>
                            )}
                        </button>
                    )}

                    {step === 2 && (
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    if (
                                        !isFinalizingBook
                                    ) {
                                        setStep(1);
                                    }
                                }}
                                disabled={
                                    isFinalizingBook
                                }
                                className="
                                    flex
                                    h-[48px]
                                    w-[48px]
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    text-slate-500
                                    shadow-sm
                                    transition-all
                                    hover:bg-slate-50
                                    hover:text-slate-900
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >
                                <ArrowLeft
                                    className="h-4 w-4"
                                    strokeWidth={2.5}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={
                                    handleFinalizeBook
                                }
                                disabled={
                                    isFinalizingBook ||
                                    chapters.length ===
                                        0
                                }
                                className="
                                    group
                                    flex
                                    h-[48px]
                                    flex-1
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-indigo-600
                                    px-5
                                    text-[14px]
                                    font-bold
                                    text-white
                                    transition-all
                                    hover:bg-indigo-700
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-indigo-500/20
                                    disabled:cursor-not-allowed
                                    disabled:opacity-70
                                "
                            >
                                {isFinalizingBook ? (
                                    <>
                                        <span
                                            className="
                                                h-4
                                                w-4
                                                animate-spin
                                                rounded-full
                                                border-2
                                                border-white/30
                                                border-t-white
                                            "
                                        />

                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Check
                                            className="
                                                h-4
                                                w-4
                                                transition-transform
                                                group-hover:scale-110
                                            "
                                            strokeWidth={3}
                                        />

                                        Create eBook
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateBookModal;