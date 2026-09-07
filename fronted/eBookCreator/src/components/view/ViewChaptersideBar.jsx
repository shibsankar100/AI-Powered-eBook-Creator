import { BookOpen, ChevronLeft } from "lucide-react";

const ViewChapterSidebar = ({
    book,
    selectedChapterIndex,
    onSelectChapter,
    isOpen,
    onClose,
}) => {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}
            <div
                className={`
                    fixed
                    lg:relative
                    left-0
                    top-0
                    h-full
                    w-80
                    bg-white
                    border-r
                    border-gray-200
                    transform
                    transition-transform
                    duration-300
                    ease-in-out
                    z-50
                    ${
                        isOpen
                            ? "translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                    }
                `}
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <BookOpen
                            className="text-violet-600"
                            size={22}
                        />

                        <span className="font-semibold text-gray-800">
                            Chapters
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Close sidebar"
                    >
                        <ChevronLeft size={20} />
                    </button>
                </div>
                <div className="p-3 overflow-y-auto h-[calc(100%-65px)]">
                    {book?.chapters?.length > 0 ? (
                        <div className="space-y-2">
                            {book.chapters.map((chapter, index) => (
                                <button
                                    key={chapter._id || index}
                                    type="button"
                                    onClick={() => {
                                        onSelectChapter(index);
                                        onClose();
                                    }}
                                    className={`
                                        w-full
                                        text-left
                                        p-4
                                        rounded-lg
                                        transition-colors
                                        border
                                        ${
                                            selectedChapterIndex === index
                                                ? "bg-violet-50 border-violet-200"
                                                : "border-transparent hover:bg-gray-50"
                                        }
                                    `}
                                >
                                    <div
                                        className={`
                                            font-medium
                                            text-sm
                                            truncate
                                            ${
                                                selectedChapterIndex === index
                                                    ? "text-violet-900"
                                                    : "text-gray-900"
                                            }
                                        `}
                                    >
                                        {chapter.title || `Chapter ${index + 1}`}
                                    </div>

                                    <div className="text-xs text-gray-500 mt-1">
                                        Chapter {index + 1}
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 px-4">
                            <BookOpen
                                size={40}
                                className="mx-auto text-gray-300 mb-3"
                            />

                            <p className="text-sm text-gray-500">
                                No chapters available.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ViewChapterSidebar;