import {
  Plus,
  Trash2,
  Sparkles,
  BookOpen,
  GripVertical,
  ChevronLeft,
  MoreHorizontal,
  FileText,
  Loader2,
} from "lucide-react";

const ChapterSidebar = ({
  book,
  selectedChapterIndex,
  onSelectChapter,
  onAddChapter,
  onDeleteChapter,
  onReorderChapters,
  onGenerateChapterContent,
  generatingChapter,
}) => {
  const chapters = Array.isArray(book?.chapters)
    ? book.chapters
    : [];


  const getWordCount = (content = "") => {
    const text = String(content || "").trim();

    if (!text) return 0;

    return text.split(/\s+/).filter(Boolean).length;
  };



  const completedChapters = chapters.filter(
    (chapter) =>
      String(chapter?.content || "").trim().length > 0
  ).length;

  const progress =
    chapters.length > 0
      ? Math.round(
          (completedChapters / chapters.length) * 100
        )
      : 0;
  const isSidebarGenerating = (index) => {
    return (
      generatingChapter?.index === index &&
      generatingChapter?.source === "sidebar"
    );
  };
  const handleDragStart = (event, index) => {
    if (generatingChapter) {
      event.preventDefault();
      return;
    }
    event.dataTransfer.effectAllowed = "move";

    event.dataTransfer.setData(
      "text/plain",
      String(index)
    );
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();

    if (generatingChapter) return;

    const sourceIndex = Number(
      event.dataTransfer.getData("text/plain")
    );

    if (
      Number.isNaN(sourceIndex) ||
      sourceIndex === targetIndex
    ) {
      return;
    }

    onReorderChapters(
      sourceIndex,
      targetIndex
    );
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <style>{`
        /* =====================================================
           SIDEBAR ANIMATION
        ===================================================== */

        @keyframes sidebarIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes chapterIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progressShine {
          0% {
            transform: translateX(-120%);
          }

          100% {
            transform: translateX(300%);
          }
        }

        .sidebar-enter {
          animation:
            sidebarIn
            .4s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        .chapter-item {
          animation:
            chapterIn
            .3s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        .chapter-item:nth-child(1) {
          animation-delay: .03s;
        }

        .chapter-item:nth-child(2) {
          animation-delay: .06s;
        }

        .chapter-item:nth-child(3) {
          animation-delay: .09s;
        }

        .chapter-item:nth-child(4) {
          animation-delay: .12s;
        }

        .chapter-item:nth-child(5) {
          animation-delay: .15s;
        }

        /* =====================================================
           CHAPTER ROW
        ===================================================== */

        .chapter-row {
          transition:
            background .22s ease,
            border-color .22s ease,
            box-shadow .22s ease,
            transform .22s ease;
        }

        .chapter-row:hover {
          transform: translateY(-1px);
        }

        /* =====================================================
           NUMBER
        ===================================================== */

        .chapter-number {
          transition:
            transform .22s ease,
            background .22s ease,
            color .22s ease,
            box-shadow .22s ease;
        }

        .chapter-row:hover .chapter-number {
          transform: scale(1.03);
        }

        /* =====================================================
           ACTIONS
           
           Hidden by default.
           Show ONLY on hover/focus.
        ===================================================== */

        .chapter-actions {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;

          transform: translateX(5px) scale(.96);

          transition:
            opacity .2s ease,
            visibility .2s ease,
            transform .2s
              cubic-bezier(.22,1,.36,1);
        }

        .chapter-row:hover .chapter-actions,
        .chapter-row:focus-within .chapter-actions {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;

          transform: translateX(0) scale(1);
        }

        /* =====================================================
           ACTION BUTTON
        ===================================================== */

        .chapter-action {
          transition:
            transform .16s ease,
            background .16s ease,
            color .16s ease;
        }

        .chapter-action:hover {
          transform: translateY(-1px);
        }

        .chapter-action:active {
          transform: scale(.92);
        }

        /* =====================================================
           DRAG HANDLE
        ===================================================== */

        .drag-handle {
          opacity: 0;

          transform: translateX(3px);

          transition:
            opacity .2s ease,
            transform .2s ease;
        }

        .chapter-row:hover .drag-handle {
          opacity: 1;
          transform: translateX(0);
        }

        /* =====================================================
           PROGRESS
        ===================================================== */

        .progress-container {
          position: relative;
          overflow: hidden;
        }

        .progress-container::after {
          content: "";

          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;

          width: 35%;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.25),
              transparent
            );

          animation:
            progressShine
            2.8s
            ease-in-out
            infinite;
        }

        /* =====================================================
           ADD BUTTON
        ===================================================== */

        .add-button {
          transition:
            transform .2s ease,
            background .2s ease,
            border-color .2s ease,
            box-shadow .2s ease;
        }

        .add-button:hover {
          transform: translateY(-1px);

          box-shadow:
            0 8px 20px
            rgba(79,70,229,.08);
        }

        .add-button:active {
          transform: scale(.98);
        }

        /* =====================================================
           BACK BUTTON
        ===================================================== */

        .back-button {
          transition:
            background .2s ease,
            color .2s ease;
        }

        /* =====================================================
           HIDE SCROLLBAR
           Scroll still works with mouse wheel.
        ===================================================== */

        .chapter-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .chapter-scroll::-webkit-scrollbar {
          display: none;
        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .sidebar-enter,
          .chapter-item,
          .progress-container::after {
            animation: none !important;
          }

          .chapter-row,
          .chapter-number,
          .chapter-actions,
          .chapter-action,
          .drag-handle {
            transition: none !important;
          }
        }
      `}</style>

      <div className="sidebar-enter flex h-full min-h-0 flex-col overflow-hidden bg-white">


        <div className="shrink-0 border-b border-slate-100 px-4 pb-4 pt-4">
          <button
            type="button"
            onClick={handleBack}
            className="
              back-button
              group
              mb-4
              flex
              items-center
              gap-2
              rounded-xl
              px-2
              py-2
              text-xs
              font-bold
              text-slate-500
              hover:bg-slate-50
              hover:text-indigo-600
            "
          >
            <ChevronLeft
              size={16}
              className="
                transition-transform
                duration-200
                group-hover:-translate-x-1
              "
            />

            <span>Back to Dashboard</span>
          </button>

          {/* BOOK */}

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-indigo-600
                to-violet-600
                text-white
                shadow-lg
                shadow-indigo-200
              "
            >
              <BookOpen size={20} />
            </div>

            <div className="min-w-0 flex-1">

              <h2 className="truncate text-sm font-black text-slate-900">
                {book?.title || "Untitled Book"}
              </h2>

              <p className="mt-0.5 truncate text-[11px] font-medium text-slate-400">
                {book?.author || "Unknown author"}
              </p>

            </div>
          </div>
          <div className="mt-5">

            <div className="mb-2 flex items-center justify-between">

              <span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-slate-400">
                Book progress
              </span>

              <span className="text-sm font-black text-indigo-600">
                {progress}%
              </span>

            </div>

            <div className="progress-container h-2 rounded-full bg-slate-100">

              <div
                className="
                  relative
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-indigo-600
                  via-blue-600
                  to-violet-600
                  transition-all
                  duration-700
                  ease-out
                "
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="mt-2 flex items-center justify-between">

              <span className="text-[10px] font-medium text-slate-400">
                {completedChapters} completed
              </span>

              <span className="text-[10px] font-medium text-slate-400">
                {chapters.length} chapters
              </span>

            </div>

          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between px-4 pb-3 pt-5">

          <div className="flex items-center gap-2">

            <h3 className="text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-400">
              Chapters
            </h3>

            <span
              className="
                flex
                h-6
                min-w-6
                items-center
                justify-center
                rounded-lg
                bg-slate-100
                px-1.5
                text-[10px]
                font-black
                text-slate-500
              "
            >
              {chapters.length}
            </span>

          </div>

          <MoreHorizontal
            size={17}
            className="text-slate-300"
          />

        </div>

        <div
          className="
            chapter-scroll
            min-h-0
            flex-1
            overflow-y-auto
            overflow-x-hidden
            px-3
            pb-4
          "
        >

          {chapters.length === 0 ? (

            <div className="px-3 py-12 text-center">

              <div
                className="
                  mx-auto
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-slate-50
                  text-slate-300
                "
              >
                <FileText size={20} />
              </div>

              <p className="mt-4 text-xs font-bold text-slate-500">
                No chapters yet
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-400">
                Add your first chapter to start writing.
              </p>

            </div>

          ) : (

            <div className="space-y-1.5">

              {chapters.map((chapter, index) => {

                const wordCount = getWordCount(
                  chapter?.content
                );

                const active =
                  selectedChapterIndex === index;

                const generating =
                  isSidebarGenerating(index);

                const hasContent =
                  wordCount > 0;

                return (
                  <div
                    key={
                      chapter?._id ||
                      chapter?.id ||
                      `chapter-${index}`
                    }
                    draggable={!generating}
                    onDragStart={(event) =>
                      handleDragStart(event, index)
                    }
                    onDragOver={(event) =>
                      event.preventDefault()
                    }
                    onDrop={(event) =>
                      handleDrop(event, index)
                    }
                    className="chapter-item"
                  >
                    <div
                      className={`
                        chapter-row
                        group
                        relative
                        flex
                        min-h-[66px]
                        items-center
                        rounded-2xl
                        border
                        px-3
                        py-2.5
                        pr-[88px]
                        ${
                          active
                            ? `
                              border-indigo-200
                              bg-gradient-to-br
                              from-indigo-50/90
                              to-violet-50/50
                              shadow-[0_7px_22px_rgba(79,70,229,.07)]
                            `
                            : `
                              border-transparent
                              bg-white
                              hover:border-slate-200
                              hover:bg-slate-50/80
                            `
                        }
                      `}
                    >

                      {/* =================================================
                          MAIN CONTENT
                      ================================================= */}

                      <button
                        type="button"
                        onClick={() =>
                          onSelectChapter(index)
                        }
                        className="
                          flex
                          min-w-0
                          flex-1
                          items-center
                          gap-3
                          text-left
                          outline-none
                        "
                      >

                        {/* NUMBER */}

                        <div
                          className={`
                            chapter-number
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            text-xs
                            font-black
                            ${
                              active
                                ? `
                                  bg-gradient-to-br
                                  from-indigo-600
                                  to-blue-600
                                  text-white
                                  shadow-md
                                  shadow-indigo-200
                                `
                                : `
                                  bg-slate-100
                                  text-slate-500
                                  group-hover:bg-indigo-50
                                  group-hover:text-indigo-600
                                `
                            }
                          `}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* TEXT */}

                        <div className="min-w-0 flex-1">

                          <p
                            className={`
                              truncate
                              text-[13px]
                              font-extrabold
                              leading-5
                              ${
                                active
                                  ? "text-indigo-950"
                                  : "text-slate-800"
                              }
                            `}
                          >
                            {chapter?.title ||
                              `Chapter ${index + 1}`}
                          </p>

                          <div className="mt-0.5 flex items-center gap-1.5">

                            <span
                              className={`
                                h-1.5
                                w-1.5
                                shrink-0
                                rounded-full
                                ${
                                  hasContent
                                    ? "bg-emerald-500"
                                    : "bg-slate-300"
                                }
                              `}
                            />

                            <span className="truncate text-[10px] font-medium text-slate-400">
                              {hasContent
                                ? `${wordCount.toLocaleString()} words`
                                : "Not started"}
                            </span>

                          </div>

                        </div>

                      </button>
                      <div
                        className="
                          chapter-actions
                          absolute
                          right-2
                          top-1/2
                          flex
                          -translate-y-1/2
                          items-center
                          gap-1
                          rounded-xl
                          border
                          border-slate-200/80
                          bg-white/95
                          p-1
                          shadow-[0_7px_18px_rgba(15,23,42,.10)]
                          backdrop-blur-md
                        "
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                      >

                        {/* GENERATE */}

                        <button
                          type="button"
                          title={
                            generating
                              ? "Generating..."
                              : "Generate with AI"
                          }
                          disabled={
                            Boolean(generatingChapter)
                          }
                          onClick={(event) => {

                            event.preventDefault();
                            event.stopPropagation();

                            if (
                              generatingChapter
                            ) {
                              return;
                            }

                            onGenerateChapterContent(
                              index,
                              "sidebar"
                            );
                          }}
                          className={`
                            chapter-action
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            ${
                              generating
                                ? `
                                  bg-violet-100
                                  text-violet-600
                                `
                                : `
                                  text-indigo-500
                                  hover:bg-indigo-50
                                  hover:text-indigo-600
                                `
                            }
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                          `}
                        >

                          {generating ? (
                            <Loader2
                              size={15}
                              className="animate-spin"
                            />
                          ) : (
                            <Sparkles size={15} />
                          )}

                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          title="Delete chapter"
                          disabled={
                            Boolean(generatingChapter)
                          }
                          onClick={(event) => {

                            event.preventDefault();
                            event.stopPropagation();

                            if (
                              generatingChapter
                            ) {
                              return;
                            }

                            onDeleteChapter(index);
                          }}
                          className="
                            chapter-action
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-slate-400
                            hover:bg-red-50
                            hover:text-red-500
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                        >
                          <Trash2 size={14} />
                        </button>

                      </div>
                      <div
                        className="
                          drag-handle
                          pointer-events-none
                          absolute
                          bottom-1.5
                          right-2
                        "
                      >
                        <GripVertical
                          size={12}
                          className="text-slate-300"
                        />
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>
          )}

        </div>
        <div
          className="
            shrink-0
            border-t
            border-slate-100
            bg-white
            p-3
          "
        >

          <button
            type="button"
            onClick={onAddChapter}
            disabled={Boolean(generatingChapter)}
            className="
              add-button
              group
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-dashed
              border-indigo-200
              bg-indigo-50/50
              px-4
              py-3
              text-xs
              font-extrabold
              text-indigo-600
              hover:border-indigo-300
              hover:bg-indigo-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            <Plus
              size={16}
              className="
                transition-transform
                duration-300
                group-hover:rotate-90
              "
            />

            Add New Chapter

          </button>

          <p className="mt-2 text-center text-[9px] font-medium text-slate-400">
            Drag chapters to reorder
          </p>

        </div>

      </div>
    </>
  );
};

export default ChapterSidebar;