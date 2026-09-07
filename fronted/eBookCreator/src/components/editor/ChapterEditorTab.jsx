import { useMemo, useState } from "react";
import {
  Sparkles,
  Type,
  Eye,
  Maximize2,
  Minimize2,
  Check,
  Clock3,
  FileText,
  BookOpen,
  PenLine,
  Hash,
  AlignLeft,
  WandSparkles,
  Loader2,
} from "lucide-react";

import InputField from "../ui/InputField";
import SimpleMDEditor from "./SimpleMDEditor";

const ChapterEditorTab = ({
  book,
  selectedChapterIndex,
  onChapterChange,
  onGenerateChapterContent,
  isGenerating,
}) => {
  const [isPreviewMode, setIsPreviewMode] =
    useState(false);

  const [isFullscreen, setIsFullscreen] =
    useState(false);

  const currentChapter =
    book?.chapters?.[selectedChapterIndex];

  const formatMarkdown = (
    content = ""
  ) => {
    if (!content) return "";

    let html = content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      `<img
        src="$2"
        alt="$1"
        class="my-10 w-full rounded-2xl object-cover shadow-xl"
      />`
    );

    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      `<a
        href="$2"
        target="_blank"
        rel="noreferrer"
        class="font-semibold text-indigo-600 underline decoration-indigo-200 underline-offset-4"
      >$1</a>`
    );

    html = html.replace(
      /^# (.*)$/gm,
      `<h1 class="mb-7 mt-14 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">$1</h1>`
    );

    html = html.replace(
      /^## (.*)$/gm,
      `<h2 class="mb-5 mt-12 text-3xl font-extrabold tracking-tight text-slate-900">$1</h2>`
    );

    html = html.replace(
      /^### (.*)$/gm,
      `<h3 class="mb-4 mt-9 text-2xl font-bold tracking-tight text-slate-900">$1</h3>`
    );

    html = html.replace(
      /\*\*(.*?)\*\*/g,
      `<strong class="font-bold text-slate-950">$1</strong>`
    );

    html = html.replace(
      /(?<!\*)\*([^*]+)\*(?!\*)/g,
      `<em class="italic text-slate-700">$1</em>`
    );

    html = html.replace(
      /^> (.*)$/gm,
      `<blockquote class="my-9 rounded-r-2xl border-l-4 border-indigo-500 bg-indigo-50/60 px-6 py-5 text-lg italic leading-8 text-slate-700">$1</blockquote>`
    );

    html = html.replace(
      /^[-*] (.*)$/gm,
      `<li class="ml-6 mb-3 list-disc pl-2 text-[1.05rem] leading-8 text-slate-700 marker:text-indigo-500">$1</li>`
    );

    html = html.replace(
      /^\d+\. (.*)$/gm,
      `<li class="ml-6 mb-3 list-decimal pl-2 text-[1.05rem] leading-8 text-slate-700 marker:text-indigo-500">$1</li>`
    );

    html = html.replace(
      /^---$/gm,
      `<hr class="my-12 border-0 border-t border-slate-200" />`
    );

    html = html
      .split(/\n\n+/)
      .map((paragraph) => {
        paragraph = paragraph.trim();

        if (!paragraph) {
          return "";
        }

        if (
          paragraph.startsWith("<h1") ||
          paragraph.startsWith("<h2") ||
          paragraph.startsWith("<h3") ||
          paragraph.startsWith("<img") ||
          paragraph.startsWith("<blockquote") ||
          paragraph.startsWith("<li") ||
          paragraph.startsWith("<hr")
        ) {
          return paragraph;
        }

        return `
          <p class="mb-7 font-serif text-[1.08rem] leading-[1.9] text-slate-700 sm:text-[1.12rem]">
            ${paragraph.replace(
              /\n/g,
              "<br />"
            )}
          </p>
        `;
      })
      .join("");

    return html;
  };

  const {
    wordCount,
    characterCount,
    estimatedReadTime,
    previewHtml,
  } = useMemo(() => {
    const text =
      currentChapter?.content || "";

    const words = text.trim()
      ? text
          .trim()
          .split(/\s+/)
          .filter(Boolean).length
      : 0;

    return {
      wordCount: words,

      characterCount: text.length,

      estimatedReadTime: Math.max(
        1,
        Math.ceil(words / 200)
      ),

      previewHtml: isPreviewMode
        ? formatMarkdown(text)
        : "",
    };
  }, [
    currentChapter?.content,
    isPreviewMode,
  ]);
  const mdeOptions = useMemo(
    () => ({
      autofocus: true,
      spellChecker: false,
      status: false,

      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "|",
        "preview",
        "side-by-side",
        "fullscreen",
      ],
    }),
    []
  );

  const handleGenerate = () => {
    if (isGenerating) return;

    if (
      typeof onGenerateChapterContent !==
      "function"
    ) {
      return;
    }

    onGenerateChapterContent(
      selectedChapterIndex,
      "main"
    );
  };

  if (!currentChapter) {
    return (
      <div className="flex min-h-[calc(100vh-66px)] items-center justify-center bg-[#f7f8fc] px-6">

        <div className="text-center">

          <div className="relative mx-auto mb-7 h-24 w-24">

            <div className="absolute inset-0 rounded-full bg-indigo-200 blur-3xl opacity-50" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-slate-200 bg-white shadow-xl">
              <BookOpen
                size={34}
                className="text-indigo-600"
              />
            </div>

          </div>

          <h2 className="text-2xl font-black text-slate-900">
            Select a chapter
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Choose a chapter from the sidebar
            to start writing your manuscript.
          </p>

        </div>
      </div>
    );
  }
  return (
    <>
      <style>{`
        @keyframes chapterEnter {
          from {
            opacity:0;
            transform:translateY(12px);
          }

          to {
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes aiGlow {
          0%,100% {
            box-shadow:
              0 8px 25px
              rgba(99,102,241,.16);
          }

          50% {
            box-shadow:
              0 12px 35px
              rgba(139,92,246,.30);
          }
        }

        .chapter-enter {
          animation:
            chapterEnter
            .4s
            cubic-bezier(.22,1,.36,1);
        }

        .ai-glow {
          animation:
            aiGlow
            3s
            ease-in-out
            infinite;
        }

        .smooth-button {
          transition:
            transform .18s ease,
            box-shadow .18s ease,
            background .18s ease,
            border-color .18s ease,
            color .18s ease;
        }

        .smooth-button:hover:not(:disabled) {
          transform:translateY(-1px);
        }

        .smooth-button:active:not(:disabled) {
          transform:scale(.98);
        }

        .stat-card {
          transition:
            transform .2s ease,
            box-shadow .2s ease;
        }

        .stat-card:hover {
          transform:translateY(-3px);
          box-shadow:
            0 15px 35px
            rgba(15,23,42,.07);
        }

        .preview-content p:first-child {
          margin-top:0;
        }

        .preview-content h1:first-child,
        .preview-content h2:first-child,
        .preview-content h3:first-child {
          margin-top:0;
        }
      `}</style>

      <div
        className={`
          chapter-enter
          ${
            isFullscreen
              ? "fixed inset-0 z-[200] flex flex-col bg-[#f7f8fc]"
              : "min-h-[calc(100vh-66px)] w-full"
          }
        `}
      >

        <div className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-2xl">

          <div className="mx-auto flex min-h-[74px] w-full max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

            <div className="flex min-w-0 items-center gap-3">

              <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm sm:flex">
                <PenLine size={19} />
              </div>

              <div className="min-w-0">

                <div className="flex items-center gap-2">

                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[.14em] text-indigo-600">
                    Chapter{" "}
                    {selectedChapterIndex +
                      1}
                  </span>

                  <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                  <span className="hidden text-xs font-medium text-slate-400 sm:block">
                    Writing workspace
                  </span>

                </div>

                <h1 className="mt-1 max-w-[220px] truncate text-base font-extrabold tracking-tight text-slate-900 sm:max-w-[420px] sm:text-lg">
                  {currentChapter.title ||
                    "Untitled Chapter"}
                </h1>

              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1">

                <button
                  type="button"
                  onClick={() =>
                    setIsPreviewMode(false)
                  }
                  className={`
                    smooth-button
                    flex
                    h-9
                    items-center
                    gap-2
                    rounded-lg
                    px-3
                    text-xs
                    font-bold
                    ${
                      !isPreviewMode
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500"
                    }
                  `}
                >

                  <Type
                    size={14}
                    className={
                      !isPreviewMode
                        ? "text-indigo-600"
                        : ""
                    }
                  />

                  <span className="hidden sm:inline">
                    Edit
                  </span>

                </button>

                <button
                  type="button"
                  onClick={() =>
                    setIsPreviewMode(true)
                  }
                  className={`
                    smooth-button
                    flex
                    h-9
                    items-center
                    gap-2
                    rounded-lg
                    px-3
                    text-xs
                    font-bold
                    ${
                      isPreviewMode
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500"
                    }
                  `}
                >

                  <Eye
                    size={14}
                    className={
                      isPreviewMode
                        ? "text-indigo-600"
                        : ""
                    }
                  />

                  <span className="hidden sm:inline">
                    Preview
                  </span>

                </button>

              </div>

              {/* FULLSCREEN */}

              <button
                type="button"
                onClick={() =>
                  setIsFullscreen(
                    (value) => !value
                  )
                }
                className="
                  smooth-button
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-500
                  shadow-sm
                  hover:border-indigo-200
                  hover:bg-indigo-50
                  hover:text-indigo-600
                "
              >
                {isFullscreen ? (
                  <Minimize2 size={17} />
                ) : (
                  <Maximize2 size={17} />
                )}
              </button>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="
                  ai-glow
                  smooth-button
                  group
                  relative
                  flex
                  h-10
                  items-center
                  gap-2
                  overflow-hidden
                  rounded-xl
                  bg-gradient-to-r
                  from-indigo-600
                  via-violet-600
                  to-fuchsia-600
                  px-3.5
                  text-sm
                  font-bold
                  text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                  sm:px-4
                "
              >

                <span className="pointer-events-none absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100" />

                {isGenerating ? (
                  <Loader2
                    size={16}
                    className="relative animate-spin"
                  />
                ) : (
                  <WandSparkles
                    size={16}
                    className="relative transition-transform group-hover:rotate-12"
                  />
                )}

                <span className="relative hidden sm:inline">
                  {isGenerating
                    ? "Generating..."
                    : "Generate with AI"}
                </span>

                <span className="relative sm:hidden">
                  AI
                </span>

              </button>

            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-[#f7f8fc]">

          <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

            {!isPreviewMode && (
              <div className="space-y-6">
                <section className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.035)] sm:p-7">

                  <div className="mb-4 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <Hash size={16} />
                      </div>

                      <div>

                        <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-slate-400">
                          Chapter title
                        </p>

                        <p className="mt-0.5 text-xs font-medium text-slate-400">
                          Give this chapter a clear identity
                        </p>

                      </div>
                    </div>

                    <div className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 sm:flex">

                      <Type
                        size={12}
                        className="text-slate-400"
                      />

                      <span className="text-[10px] font-bold text-slate-400">
                        TITLE
                      </span>

                    </div>

                  </div>

                  <InputField
                    label=""
                    name="title"
                    value={
                      currentChapter.title ||
                      ""
                    }
                    onChange={(event) =>
                      onChapterChange(
                        "title",
                        event.target.value
                      )
                    }
                    placeholder="Enter chapter title..."
                    className="
                      !border-0
                      !bg-transparent
                      !px-0
                      !text-2xl
                      !font-black
                      !tracking-tight
                      !shadow-none
                      focus:!ring-0
                      sm:!text-3xl
                      lg:!text-4xl
                    "
                  />

                </section>
                <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_10px_35px_rgba(15,23,42,.045)]">

                  <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-white via-slate-50/50 to-white px-5 py-4 sm:px-7">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-indigo-600 shadow-sm">
                        <FileText size={18} />
                      </div>

                      <div>

                        <h2 className="text-sm font-extrabold text-slate-900">
                          Chapter Content
                        </h2>

                        <p className="mt-0.5 text-xs font-medium text-slate-400">
                          Write, format and organize your manuscript
                        </p>

                      </div>

                    </div>

                    <div className="hidden items-center gap-3 sm:flex">

                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">

                        <span className="text-[11px] font-bold text-slate-500">
                          {wordCount.toLocaleString()}{" "}
                          words
                        </span>

                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">

                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          Markdown
                        </span>

                      </div>

                    </div>
                  </div>

                  <div className="p-3 sm:p-5 lg:p-6">

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-inner focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50">

                      <SimpleMDEditor
                        value={
                          currentChapter.content ||
                          ""
                        }
                        onChange={(value) =>
                          onChapterChange(
                            "content",
                            value
                          )
                        }
                        options={mdeOptions}
                      />

                    </div>

                  </div>

                </section>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                  <StatCard
                    label="Words"
                    value={wordCount.toLocaleString()}
                    description="Written words"
                    icon={
                      <AlignLeft
                        size={13}
                      />
                    }
                    iconClass="bg-indigo-50 text-indigo-600"
                  />

                  <StatCard
                    label="Characters"
                    value={characterCount.toLocaleString()}
                    description="Total characters"
                    icon={
                      <Type size={13} />
                    }
                    iconClass="bg-violet-50 text-violet-600"
                  />

                  <StatCard
                    label="Read time"
                    value={
                      <>
                        {estimatedReadTime}
                        <span className="ml-1 text-sm font-bold text-slate-400">
                          min
                        </span>
                      </>
                    }
                    description="Estimated reading"
                    icon={
                      <Clock3
                        size={13}
                      />
                    }
                    iconClass="bg-amber-50 text-amber-600"
                  />

                  <StatCard
                    label="Status"
                    value={
                      <span className="flex items-center gap-2 text-lg text-emerald-600">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Ready
                      </span>
                    }
                    description="Content available"
                    icon={
                      <Check size={13} />
                    }
                    iconClass="bg-emerald-50 text-emerald-600"
                  />

                </div>

                {/* TIP */}

                <div className="flex items-start gap-3 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/70 via-violet-50/40 to-white p-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    <Sparkles size={16} />
                  </div>

                  <div>

                    <p className="text-xs font-bold text-slate-700">
                      Writing tip
                    </p>

                    <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
                      Use Markdown headings,
                      lists, quotes and links
                      to structure your chapter
                      beautifully.
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* =================================================
                PREVIEW
                ================================================= */}

            {isPreviewMode && (
              <article className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_20px_70px_rgba(15,23,42,.08)]">

                <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-6 py-14 sm:px-12 sm:py-20 lg:px-20">

                  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />

                  <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-violet-200/25 blur-3xl" />

                  <div className="relative mx-auto max-w-4xl text-center">

                    <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-md">
                      <BookOpen size={21} />
                    </div>

                    <span className="inline-flex rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.16em] text-indigo-600 shadow-sm">
                      Chapter{" "}
                      {selectedChapterIndex +
                        1}
                    </span>

                    <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1.08] tracking-[-.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                      {currentChapter.title ||
                        "Untitled Chapter"}
                    </h1>

                    <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-500">

                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                        {wordCount.toLocaleString()}{" "}
                        words
                      </span>

                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                        {estimatedReadTime} min
                        read
                      </span>

                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                        Markdown
                      </span>

                    </div>

                  </div>
                </div>

                <div className="px-5 py-10 sm:px-12 sm:py-16 lg:px-20 lg:py-20">

                  <div className="preview-content mx-auto max-w-3xl">

                    {previewHtml ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            previewHtml,
                        }}
                      />
                    ) : (
                      <div className="rounded-3xl border-2 border-dashed border-slate-200 px-6 py-20 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                          <FileText
                            size={23}
                          />
                        </div>

                        <p className="mt-5 text-sm font-bold text-slate-500">
                          Your chapter is
                          empty
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Switch to Edit mode
                          to start writing.
                        </p>

                      </div>
                    )}

                  </div>
                </div>

                <div className="border-t border-slate-100 bg-slate-50/60 px-6 py-5">

                  <div className="mx-auto flex max-w-3xl items-center justify-between">

                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      End of chapter
                    </span>

                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                      <Check size={14} />
                      Ready to export
                    </div>

                  </div>

                </div>

              </article>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

const StatCard = ({
  label,
  value,
  description,
  icon,
  iconClass,
}) => {
  return (
    <div className="stat-card rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_5px_20px_rgba(15,23,42,.025)] sm:p-5">

      <div className="mb-3 flex items-center justify-between">

        <span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-slate-400">
          {label}
        </span>

        <div
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${iconClass}`}
        >
          {icon}
        </div>

      </div>

      <p className="text-2xl font-black tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-[11px] font-medium text-slate-400">
        {description}
      </p>

    </div>
  );
};

export default ChapterEditorTab;