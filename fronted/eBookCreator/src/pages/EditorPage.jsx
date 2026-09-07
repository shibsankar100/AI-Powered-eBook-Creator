import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Edit3,
  FileDown,
  FileText,
  Menu,
  NotebookText,
  Save,
  X,
  Check,
  Loader2,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import ChapterSidebar from "../components/editor/ChapterSidebar";
import ChapterEditorTab from "../components/editor/ChapterEditorTab";
import BookDetailsTab from "../components/editor/BookDetailsTab";

import axiosInstance from "../utils/axioinstance";
import { API_PATHS, BASE_URL } from "../utils/apiPaths";

const EditorPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  const [selectedChapterIndex, setSelectedChapterIndex] =
    useState(0);

  const [activeTab, setActiveTab] = useState("editor");

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const [isExportOpen, setIsExportOpen] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [generatingChapter, setGeneratingChapter] =
    useState(null);

  const [isUploading, setIsUploading] =
    useState(false);

  const [isExporting, setIsExporting] =
    useState(false);

  const [saved, setSaved] = useState(false);

  const [error, setError] = useState("");

  const exportRef = useRef(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await axiosInstance.get(
          API_PATHS.BOOKS.GET_BOOK(bookId)
        );

        const data =
          response?.data?.book ||
          response?.data?.data ||
          response?.data;

        if (!data) {
          throw new Error(
            "Book data was not returned."
          );
        }

        const normalizedBook = {
          ...data,

          chapters: Array.isArray(data.chapters)
            ? data.chapters
            : [],
        };

        setBook(normalizedBook);

        if (
          normalizedBook.chapters.length > 0
        ) {
          setSelectedChapterIndex(0);
        }
      } catch (err) {
        console.error(
          "FETCH BOOK ERROR:",
          err
        );

        setError(
          getErrorMessage(
            err,
            "Failed to load book."
          )
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        exportRef.current &&
        !exportRef.current.contains(
          event.target
        )
      ) {
        setIsExportOpen(false);
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

  const handleBookChange = (
    field,
    value
  ) => {
    setBook((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        [field]: value,
      };
    });

    setSaved(false);
  };

  const handleChapterChange = (
    field,
    value
  ) => {
    setBook((previous) => {
      if (!previous) return previous;

      const chapters = [
        ...(previous.chapters || []),
      ];

      if (!chapters[selectedChapterIndex]) {
        return previous;
      }

      chapters[selectedChapterIndex] = {
        ...chapters[selectedChapterIndex],
        [field]: value,
      };

      return {
        ...previous,
        chapters,
      };
    });

    setSaved(false);
  };

  const handleSelectChapter = (index) => {
    if (
      index < 0 ||
      index >= (book?.chapters?.length || 0)
    ) {
      return;
    }

    setSelectedChapterIndex(index);
    setActiveTab("editor");
    setIsSidebarOpen(false);
  };

  const handleAddChapter = () => {
    setBook((previous) => {
      if (!previous) return previous;

      const chapters = [
        ...(previous.chapters || []),
      ];

      const newChapter = {
        title: `Chapter ${chapters.length + 1}`,
        content: "",
      };

      chapters.push(newChapter);

      return {
        ...previous,
        chapters,
      };
    });

    setSelectedChapterIndex(
      book?.chapters?.length || 0
    );

    setActiveTab("editor");
    setSaved(false);
  };

  const handleDeleteChapter = (index) => {
    if (!book?.chapters?.length) {
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to delete this chapter?"
      )
    ) {
      return;
    }

    setBook((previous) => {
      if (!previous) return previous;

      const chapters = [
        ...(previous.chapters || []),
      ];

      chapters.splice(index, 1);

      return {
        ...previous,
        chapters,
      };
    });

    setSelectedChapterIndex((previous) => {
      if (previous > index) {
        return previous - 1;
      }

      if (
        previous === index &&
        previous > 0
      ) {
        return previous - 1;
      }

      return 0;
    });

    setSaved(false);
  };

  const handleReorderChapters = (
    fromIndex,
    toIndex
  ) => {
    if (!book?.chapters) return;

    if (
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= book.chapters.length ||
      toIndex >= book.chapters.length
    ) {
      return;
    }

    setBook((previous) => {
      if (!previous) return previous;

      const chapters = [
        ...(previous.chapters || []),
      ];

      const [movedChapter] =
        chapters.splice(fromIndex, 1);

      chapters.splice(
        toIndex,
        0,
        movedChapter
      );

      return {
        ...previous,
        chapters,
      };
    });

    setSelectedChapterIndex((previous) => {
      if (previous === fromIndex) {
        return toIndex;
      }

      if (
        fromIndex < previous &&
        toIndex >= previous
      ) {
        return previous - 1;
      }

      if (
        fromIndex > previous &&
        toIndex <= previous
      ) {
        return previous + 1;
      }

      return previous;
    });

    setSaved(false);
  };

  const handleGenerateChapterContent = async (
    index,
    source = "main"
  ) => {
    if (!book) return;

    if (
      index < 0 ||
      index >= (book.chapters?.length || 0)
    ) {
      return;
    }

    if (generatingChapter) {
      return;
    }

    try {
      setError("");

      setGeneratingChapter({
        index,
        source,
      });

      const chapter =
        book.chapters[index];

  const response =
    await axiosInstance.post(
        API_PATHS.AI.GENERATE_CHAPTER_CONTENT,
        {
            bookId: bookId,
            chapterIndex: index,
            chapterTitle:
                chapter?.title ||
                `Chapter ${index + 1}`,
        }
    );

      const generatedContent =
        response?.data?.content ||
        response?.data?.chapter?.content ||
        response?.data?.data?.content ||
        "";

      if (!generatedContent) {
        throw new Error(
          "AI did not return chapter content."
        );
      }

      setBook((previous) => {
        if (!previous) return previous;

        const chapters = [
          ...(previous.chapters || []),
        ];

        chapters[index] = {
          ...chapters[index],
          content: generatedContent,
        };

        return {
          ...previous,
          chapters,
        };
      });

      setSelectedChapterIndex(index);

      setActiveTab("editor");

      setSaved(false);
    } catch (err) {
      console.error(
        "GENERATE CHAPTER ERROR:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Failed to generate chapter content."
        )
      );
    } finally {
      setGeneratingChapter(null);
    }
  };

  const handleSaveChanges = async () => {
    if (!book) return;

    try {
      setIsSaving(true);
      setError("");
      setSaved(false);

      await axiosInstance.put(
        API_PATHS.BOOKS.UPDATE_BOOK(bookId),
        book
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      console.error(
        "SAVE BOOK ERROR:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Failed to save changes."
        )
      );
    } finally {
      setIsSaving(false);
    }
  };

const handleCoverImageUpload = async (event) => {
  const file = event?.target?.files?.[0];

  if (!file) return;

  if (!bookId) {
    setError("Book ID is missing.");
    return;
  }

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    setError("Please select a JPG, PNG, or WEBP image.");
    event.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setError("Cover image must be smaller than 5 MB.");
    event.target.value = "";
    return;
  }

  try {
    setIsUploading(true);
    setError("");

    const formData = new FormData();

    formData.append("cover", file);

    console.log("Uploading cover:", {
      bookId,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    });

    const uploadUrl = `/api/books/cover/${bookId}`;

    const response = await axiosInstance.put(
      uploadUrl,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(
      "COVER UPLOAD RESPONSE:",
      response.data
    );

    const updatedBook =
      response?.data?.book ||
      response?.data?.data ||
      response?.data;

    const coverImage =
      updatedBook?.coverImage ||
      response?.data?.coverImage ||
      "";

    if (!coverImage) {
      throw new Error(
        "Cover uploaded, but the server did not return the cover image path."
      );
    }

    setBook((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        coverImage,
      };
    });

    setSaved(false);

    console.log(
      "COVER IMAGE SAVED:",
      coverImage
    );

  } catch (err) {
    console.error(
      "COVER UPLOAD ERROR:",
      err
    );

    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Failed to upload cover image.";

    setError(message);

  } finally {
    setIsUploading(false);

    if (event?.target) {
      event.target.value = "";
    }
  }
};

  const getBlobErrorMessage = async (
    response
  ) => {
    try {
      const text =
        await response.data.text();

      try {
        const json = JSON.parse(text);

        return (
          json?.message ||
          json?.error ||
          "Export failed."
        );
      } catch {
        return text || "Export failed.";
      }
    } catch {
      return "Export failed.";
    }
  };

  const handleExportPDF = async () => {
    if (isExporting) return;

    try {
      setIsExporting(true);
      setError("");
      setIsExportOpen(false);

const response =
  await axiosInstance.get(
    API_PATHS.EXPORT.PDF(bookId),
    {
      responseType: "blob",
    }
  );

      if (
        response.status < 200 ||
        response.status >= 300
      ) {
        throw new Error(
          await getBlobErrorMessage(response)
        );
      }

      const blob = new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );

      downloadBlob(
        blob,
        `${safeFileName(
          book?.title || "ebook"
        )}.pdf`
      );
    } catch (err) {
      console.error(
        "EXPORT PDF ERROR:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Failed to export PDF."
        )
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportDOCX = async () => {
    if (isExporting) return;

    try {
      setIsExporting(true);
      setError("");
      setIsExportOpen(false);

const response =
  await axiosInstance.get(
    API_PATHS.EXPORT.DOC(bookId),
    {
      responseType: "blob",
    }
  );

      if (
        response.status < 200 ||
        response.status >= 300
      ) {
        throw new Error(
          await getBlobErrorMessage(response)
        );
      }

      const blob = new Blob(
        [response.data],
        {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }
      );

      downloadBlob(
        blob,
        `${safeFileName(
          book?.title || "ebook"
        )}.docx`
      );
    } catch (err) {
      console.error(
        "EXPORT DOCX ERROR:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Failed to export document."
        )
      );
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <style>{`
          @keyframes loaderSpin {
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes loaderPulse {
            0%,100% {
              opacity:.4;
            }

            50% {
              opacity:1;
            }
          }
        `}</style>

        <div className="flex min-h-screen items-center justify-center bg-[#f7f8fc]">
          <div className="text-center">

            <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-white shadow-lg">

              <div className="absolute inset-0 rounded-2xl bg-indigo-100 blur-xl opacity-50" />

              <Loader2
                className="relative animate-spin text-indigo-600"
                size={26}
              />

            </div>

            <p
              className="text-sm font-bold text-slate-700"
              style={{
                animation:
                  "loaderPulse 1.5s ease-in-out infinite",
              }}
            >
              Loading your book...
            </p>

          </div>
        </div>
      </>
    );
  }

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fc] px-6">

        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <X size={24} />
          </div>

          <h2 className="mt-5 text-xl font-black text-slate-900">
            Book not found
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error ||
              "The requested book could not be loaded."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>

        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes pageIn {
          from {
            opacity:0;
            transform:translateY(8px);
          }

          to {
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes headerIn {
          from {
            opacity:0;
            transform:translateY(-10px);
          }

          to {
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes dropdownIn {
          from {
            opacity:0;
            transform:translateY(-5px) scale(.98);
          }

          to {
            opacity:1;
            transform:translateY(0) scale(1);
          }
        }

        @keyframes saveSuccess {
          0% {
            opacity:0;
            transform:scale(.9);
          }

          70% {
            transform:scale(1.03);
          }

          100% {
            opacity:1;
            transform:scale(1);
          }
        }

        .editor-page {
          animation:
            pageIn
            .4s
            cubic-bezier(.22,1,.36,1);
        }

        .editor-toolbar {
          animation:
            headerIn
            .45s
            cubic-bezier(.22,1,.36,1);
        }

        .export-dropdown {
          animation:
            dropdownIn
            .2s
            cubic-bezier(.22,1,.36,1);
        }

        .save-success {
          animation:
            saveSuccess
            .3s
            cubic-bezier(.22,1,.36,1);
        }

        .toolbar-button {
          transition:
            transform .18s ease,
            box-shadow .18s ease,
            background .18s ease,
            color .18s ease,
            border-color .18s ease;
        }

        .toolbar-button:hover:not(:disabled) {
          transform:translateY(-1px);
        }

        .toolbar-button:active:not(:disabled) {
          transform:scale(.98);
        }

        .export-item {
          transition:
            background .16s ease,
            transform .16s ease;
        }

        .export-item:hover {
          transform:translateX(2px);
        }

        .tab-button {
          position:relative;
          transition:
            color .2s ease,
            background .2s ease;
        }

        .tab-button::after {
          content:"";
          position:absolute;
          left:50%;
          bottom:-1px;
          width:0;
          height:2px;
          border-radius:999px;
          background:linear-gradient(
            90deg,
            #4f46e5,
            #7c3aed
          );
          transform:translateX(-50%);
          transition:width .25s ease;
        }

        .tab-button.active::after {
          width:55%;
        }

        @media (prefers-reduced-motion: reduce) {
          .editor-page,
          .editor-toolbar,
          .export-dropdown,
          .save-success {
            animation:none !important;
          }
        }
      `}</style>

      <div className="editor-page flex min-h-screen w-full bg-[#f7f8fc]">

        <aside className="hidden h-screen w-[280px] shrink-0 border-r border-slate-200 bg-white lg:block xl:w-[300px]">
          <ChapterSidebar
            book={book}
            selectedChapterIndex={
              selectedChapterIndex
            }
            onSelectChapter={
              handleSelectChapter
            }
            onAddChapter={
              handleAddChapter
            }
            onDeleteChapter={
              handleDeleteChapter
            }
            onReorderChapters={
              handleReorderChapters
            }
            onGenerateChapterContent={
              handleGenerateChapterContent
            }
            generatingChapter={
              generatingChapter
            }
          />
        </aside>

        {isSidebarOpen && (
          <div className="fixed inset-0 z-[150] lg:hidden">

            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() =>
                setIsSidebarOpen(false)
              }
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />

            <aside className="relative z-10 h-full w-[300px] max-w-[88vw] bg-white shadow-2xl">

              <ChapterSidebar
                book={book}
                selectedChapterIndex={
                  selectedChapterIndex
                }
                onSelectChapter={
                  handleSelectChapter
                }
                onAddChapter={
                  handleAddChapter
                }
                onDeleteChapter={
                  handleDeleteChapter
                }
                onReorderChapters={
                  handleReorderChapters
                }
                onGenerateChapterContent={
                  handleGenerateChapterContent
                }
                generatingChapter={
                  generatingChapter
                }
              />

            </aside>
          </div>
        )}

        <main className="flex min-w-0 flex-1 flex-col">

          <header className="editor-toolbar sticky top-0 z-[100] border-b border-slate-200/80 bg-white/95 backdrop-blur-2xl">

            <div className="flex min-h-[66px] items-center justify-between gap-3 px-3 sm:px-5 lg:px-7">

              <div className="flex items-center gap-1">

                <button
                  type="button"
                  onClick={() =>
                    setIsSidebarOpen(true)
                  }
                  className="
                    toolbar-button
                    mr-1
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    text-slate-600
                    shadow-sm
                    lg:hidden
                  "
                >
                  <Menu size={19} />
                </button>

                <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">

                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab("editor")
                    }
                    className={`
                      tab-button
                      ${
                        activeTab ===
                        "editor"
                          ? "active bg-slate-50 text-slate-900"
                          : "text-slate-500 hover:text-slate-800"
                      }
                      flex
                      h-10
                      items-center
                      gap-2
                      rounded-xl
                      px-3
                      text-sm
                      font-bold
                      sm:px-4
                    `}
                  >

                    <Edit3
                      size={16}
                      className={
                        activeTab ===
                        "editor"
                          ? "text-indigo-600"
                          : ""
                      }
                    />

                    <span>
                      Editor
                    </span>

                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab("details")
                    }
                    className={`
                      tab-button
                      ${
                        activeTab ===
                        "details"
                          ? "active bg-slate-50 text-slate-900"
                          : "text-slate-500 hover:text-slate-800"
                      }
                      flex
                      h-10
                      items-center
                      gap-2
                      rounded-xl
                      px-3
                      text-sm
                      font-bold
                      sm:px-4
                    `}
                  >

                    <NotebookText
                      size={16}
                      className={
                        activeTab ===
                        "details"
                          ? "text-indigo-600"
                          : ""
                      }
                    />

                    <span>
                      Book Details
                    </span>

                  </button>

                </div>
              </div>

              <div className="flex items-center gap-2">

                <div
                  ref={exportRef}
                  className="relative"
                >

                  <button
                    type="button"
                    onClick={() =>
                      setIsExportOpen(
                        (value) => !value
                      )
                    }
                    disabled={isExporting}
                    className="
                      toolbar-button
                      flex
                      h-10
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-3
                      text-sm
                      font-bold
                      text-slate-600
                      shadow-sm
                      hover:border-indigo-200
                      hover:bg-indigo-50
                      hover:text-indigo-600
                      disabled:opacity-60
                    "
                  >

                    {isExporting ? (
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                    ) : (
                      <FileDown
                        size={16}
                      />
                    )}

                    <span className="hidden sm:inline">
                      Export
                    </span>

                    <ChevronDown
                      size={14}
                      className={`
                        transition-transform
                        ${
                          isExportOpen
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    />

                  </button>

                  {isExportOpen && (
                    <div className="export-dropdown absolute right-0 top-[calc(100%+8px)] z-[120] w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_20px_50px_rgba(15,23,42,.15)]">

                      <div className="px-3 py-2">

                        <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-slate-400">
                          Export book
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={
                          handleExportPDF
                        }
                        className="export-item flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-indigo-50"
                      >

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500">
                          <FileText
                            size={17}
                          />
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            Export PDF
                          </p>

                          <p className="text-[11px] text-slate-400">
                            Portable document
                          </p>
                        </div>

                      </button>

                      <button
                        type="button"
                        onClick={
                          handleExportDOCX
                        }
                        className="export-item flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-indigo-50"
                      >

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <FileText
                            size={17}
                          />
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            Export DOCX
                          </p>

                          <p className="text-[11px] text-slate-400">
                            Editable document
                          </p>
                        </div>

                      </button>

                    </div>
                  )}

                </div>

                <button
                  type="button"
                  onClick={
                    handleSaveChanges
                  }
                  disabled={isSaving}
                  className={`
                    toolbar-button
                    flex
                    h-10
                    items-center
                    gap-2
                    rounded-xl
                    px-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    sm:px-4
                    ${
                      saved
                        ? "save-success bg-emerald-600 shadow-emerald-200"
                        : "bg-gradient-to-r from-indigo-600 to-blue-600 shadow-indigo-200 hover:from-indigo-700 hover:to-blue-700"
                    }
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  `}
                >

                  {isSaving ? (
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  ) : saved ? (
                    <Check size={16} />
                  ) : (
                    <Save size={16} />
                  )}

                  <span className="hidden sm:inline">
                    {isSaving
                      ? "Saving..."
                      : saved
                      ? "Saved"
                      : "Save Changes"}
                  </span>

                </button>

              </div>
            </div>
          </header>

          {error && (
            <div className="px-4 pt-4 sm:px-6 lg:px-8">

              <div className="relative flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-red-700 shadow-sm">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-100 font-black text-red-600">
                  !
                </div>

                <p className="min-w-0 flex-1 pt-0.5 text-sm font-semibold break-words">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setError("")
                  }
                  className="rounded-lg p-1 text-red-400 transition hover:bg-red-100 hover:text-red-600"
                >
                  <X size={16} />
                </button>

              </div>

            </div>
          )}

          <div className="min-w-0 flex-1">

            {activeTab === "editor" && (
              <ChapterEditorTab
                book={book}
                selectedChapterIndex={
                  selectedChapterIndex
                }
                onChapterChange={
                  handleChapterChange
                }
                onGenerateChapterContent={
                  handleGenerateChapterContent
                }
                isGenerating={
                  generatingChapter?.index ===
                    selectedChapterIndex &&
                  generatingChapter?.source ===
                    "main"
                }
              />
            )}

            {activeTab === "details" && (
              <div className="p-4 sm:p-6 lg:p-8">
                <BookDetailsTab
                  book={book}
                  onBookChange={
                    handleBookChange
                  }
                  onCoverImageUpload={
                    handleCoverImageUpload
                  }
                  isUploading={
                    isUploading
                  }
                  fileInputRef={
                    fileInputRef
                  }
                />
              </div>
            )}

          </div>
        </main>
      </div>
    </>
  );
};

function safeFileName(value) {
  return String(value || "ebook")
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 100) || "ebook";
}

function downloadBlob(
  blob,
  filename
) {
  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
}

function getErrorMessage(
  error,
  fallback
) {
  if (
    error instanceof Error &&
    error.message
  ) {
    return error.message;
  }

  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}

export default EditorPage;