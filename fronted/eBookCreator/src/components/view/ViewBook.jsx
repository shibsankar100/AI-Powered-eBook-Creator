import { useState } from "react";
import { ChevronLeft, Menu } from "lucide-react";
import ViewChapterSidebar from "../view/ViewChaptersideBar";

const ViewBook = ({ book }) => {
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [fontSize, setFontSize] = useState(18);

    const selectedChapter = book.chapters[selectedChapterIndex];
    const formatContent = (content) => {
        if (!content) return "";

        return content
            .split("\n\n")
            .filter((paragraph) => paragraph.trim())
            .map((paragraph) => {
                paragraph = paragraph.trim();
                paragraph = paragraph.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong>$1</strong>"
                );
                paragraph = paragraph.replace(
                    /(?<!\*)\*(?!\*)(.*?)\*(?!\*)/g,
                    "<em>$1</em>"
                );

                return `<p>${paragraph}</p>`;
            })
            .join("");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ViewChapterSidebar
                book={book}
                selectedChapterIndex={selectedChapterIndex}
                onSelectChapter={setSelectedChapterIndex}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <main className="lg:ml-0">
                <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between px-4 py-4 md:px-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-violet-600 transition-colors"
                                aria-label="Open chapters"
                            >
                                <Menu size={24} />
                            </button>
                            <div>
                                <h1 className="text-lg md:text-xl font-semibold text-gray-900">
                                    {book.title}
                                </h1>

                                <p className="text-sm text-gray-500">
                                    by {book.author}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1 bg-white">

                            <button
                                onClick={() =>
                                    setFontSize(Math.max(14, fontSize - 2))
                                }
                                disabled={fontSize === 14}
                                className="px-2 py-1 text-sm font-medium text-gray-600 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                                aria-label="Decrease font size"
                            >
                                A−
                            </button>

                            <span className="min-w-[45px] text-center text-sm text-gray-700">
                                {fontSize}px
                            </span>

                            <button
                                onClick={() =>
                                    setFontSize(Math.min(24, fontSize + 2))
                                }
                                disabled={fontSize === 24}
                                className="px-2 py-1 text-sm font-medium text-gray-600 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                                aria-label="Increase font size"
                            >
                                A+
                            </button>

                        </div>
                    </div>
                </header>
                <div className="max-w-4xl mx-auto px-5 py-8 md:px-8">

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-10">
                        <div className="mb-8 text-center">
                            <p className="text-sm font-medium text-violet-600 uppercase tracking-wide mb-2">
                                Chapter {selectedChapterIndex + 1}
                            </p>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                {selectedChapter.title}
                            </h2>
                        </div>
                        <div
                            className="reading-content text-gray-800"
                            style={{
                                fontSize: `${fontSize}px`,
                                lineHeight: 1.7,
                                fontFamily:
                                    '"Charter", Georgia, "Times New Roman", serif',
                            }}
                            dangerouslySetInnerHTML={{
                                __html: formatContent(selectedChapter.content),
                            }}
                        />

                        <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-gray-200">
                            <button
                                onClick={() =>
                                    setSelectedChapterIndex(
                                        Math.max(
                                            0,
                                            selectedChapterIndex - 1
                                        )
                                    )
                                }
                                disabled={selectedChapterIndex === 0}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={20} />

                                <span className="hidden sm:inline">
                                    Previous Chapter
                                </span>

                                <span className="sm:hidden">
                                    Previous
                                </span>
                            </button>
                            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                                {selectedChapterIndex + 1} of{" "}
                                {book.chapters.length}
                            </span>
                            <button
                                onClick={() =>
                                    setSelectedChapterIndex(
                                        Math.min(
                                            book.chapters.length - 1,
                                            selectedChapterIndex + 1
                                        )
                                    )
                                }
                                disabled={
                                    selectedChapterIndex ===
                                    book.chapters.length - 1
                                }
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <span className="hidden sm:inline">
                                    Next Chapter
                                </span>

                                <span className="sm:hidden">
                                    Next
                                </span>

                                <ChevronLeft
                                    size={20}
                                    className="rotate-180"
                                />
                            </button>

                        </div>
                    </div>
                </div>
            </main>
            <style>{`
                .reading-content p {
                    margin-bottom: 1.5em;
                    text-align: justify;
                    hyphens: auto;
                }

                .reading-content p:first-child {
                    margin-top: 0;
                }

                .reading-content p:last-child {
                    margin-bottom: 0;
                }

                .reading-content strong {
                    font-weight: 600;
                    color: #1f2937;
                }

                .reading-content em {
                    font-style: italic;
                }
            `}</style>

        </div>
    );
};

export default ViewBook;