const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    ImageRun,
    Footer,
    Header,
    PageNumber,
    BorderStyle,
} = require("docx");

const PDFDocument = require("pdfkit");
const MarkdownIt = require("markdown-it");
const Book = require("../models/Book");

const path = require("path");
const fs = require("fs");

const md = new MarkdownIt({
    html: false,
    breaks: true,
});
const DESIGN = {
    colors: {
        primary: "4F46E5",
        dark: "172033",
        text: "303846",
        muted: "667085",
        light: "EEF2FF",
        border: "D9DEEA",
        white: "FFFFFF",
    },

    docx: {
        bodyFont: "Times New Roman",
        headingFont: "Arial",

        title: 34,
        subtitle: 18,
        author: 15,

        chapterNumber: 11,
        chapterTitle: 25,

        h1: 20,
        h2: 17,
        h3: 15,

        body: 11.5,

        margins: {
            top: 900,
            bottom: 900,
            left: 1150,
            right: 1150,
        },
    },

    pdf: {
        bodyFont: "Times-Roman",
        bodyBold: "Times-Bold",
        bodyItalic: "Times-Italic",

        headingFont: "Helvetica-Bold",
        normalFont: "Helvetica",

        title: 30,
        subtitle: 16,
        author: 14,

        chapterNumber: 11,
        chapterTitle: 24,

        h1: 18,
        h2: 15,
        h3: 13,

        body: 11,

        margins: {
            top: 65,
            bottom: 65,
            left: 70,
            right: 70,
        },
    },
};


const getCoverImagePath = (coverImage) => {
    if (!coverImage) {
        return null;
    }

    if (
        coverImage.includes("pravatar") ||
        coverImage.startsWith("http://") ||
        coverImage.startsWith("https://")
    ) {
        return null;
    }

    let imagePath = coverImage;

    if (imagePath.startsWith("/")) {
        imagePath = imagePath.substring(1);
    }

    return path.resolve(process.cwd(), imagePath);
};
const safeFileName = (value) => {
    return String(value || "book")
        .trim()
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
        .replace(/\s+/g, "_")
        .slice(0, 100) || "book";
};


const processInlineContent = (children = []) => {
    const runs = [];

    let bold = false;
    let italic = false;

    children.forEach((child) => {
        if (child.type === "strong_open") {
            bold = true;
            return;
        }

        if (child.type === "strong_close") {
            bold = false;
            return;
        }

        if (child.type === "em_open") {
            italic = true;
            return;
        }

        if (child.type === "em_close") {
            italic = false;
            return;
        }

        if (child.type === "code_inline") {
            runs.push(
                new TextRun({
                    text: child.content,
                    font: "Courier New",
                    size: 19,
                    color: DESIGN.colors.primary,
                })
            );

            return;
        }

        if (child.type === "text") {
            if (!child.content) return;

            runs.push(
                new TextRun({
                    text: child.content,
                    bold,
                    italics: italic,
                    font: DESIGN.docx.bodyFont,
                    size: Math.round(
                        DESIGN.docx.body * 2
                    ),
                    color: DESIGN.colors.text,
                })
            );
        }
    });

    return runs;
};

const processMarkdownToDocx = (markdown = "") => {
    if (!markdown.trim()) {
        return [];
    }

    const tokens = md.parse(markdown, {});
    const paragraphs = [];

    let listType = null;
    let orderedCounter = 1;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        try {

            if (token.type === "heading_open") {
                const level = parseInt(
                    token.tag.replace("h", ""),
                    10
                );

                const inlineToken = tokens[i + 1];

                let headingLevel =
                    HeadingLevel.HEADING_3;

                let fontSize =
                    DESIGN.docx.h3;

                if (level === 1) {
                    headingLevel =
                        HeadingLevel.HEADING_1;

                    fontSize =
                        DESIGN.docx.h1;
                }

                if (level === 2) {
                    headingLevel =
                        HeadingLevel.HEADING_2;

                    fontSize =
                        DESIGN.docx.h2;
                }

                if (
                    inlineToken &&
                    inlineToken.type === "inline"
                ) {
                    paragraphs.push(
                        new Paragraph({
                            heading: headingLevel,

                            children: [
                                new TextRun({
                                    text:
                                        inlineToken.content,

                                    bold: true,

                                    font:
                                        DESIGN.docx
                                            .headingFont,

                                    size:
                                        fontSize * 2,

                                    color:
                                        DESIGN.colors.dark,
                                }),
                            ],

                            spacing: {
                                before:
                                    level === 1
                                        ? 380
                                        : 260,

                                after: 130,
                            },

                            keepNext: true,
                        })
                    );

                    i += 2;
                }

                continue;
            }

            if (token.type === "paragraph_open") {
                const inlineToken = tokens[i + 1];

                if (
                    inlineToken &&
                    inlineToken.type === "inline"
                ) {
                    const runs =
                        processInlineContent(
                            inlineToken.children || []
                        );

                    if (runs.length) {
                        paragraphs.push(
                            new Paragraph({
                                children: runs,

                                alignment:
                                    AlignmentType.JUSTIFIED,

                                indent: {
                                    firstLine: 360,
                                },

                                spacing: {
                                    before: 0,
                                    after: 150,
                                    line: 290,
                                },
                            })
                        );
                    }

                    i += 2;
                }

                continue;
            }

            if (
                token.type ===
                "bullet_list_open"
            ) {
                listType = "bullet";
                continue;
            }

            if (
                token.type ===
                "bullet_list_close"
            ) {
                listType = null;

                paragraphs.push(
                    new Paragraph({
                        text: "",
                        spacing: {
                            after: 80,
                        },
                    })
                );

                continue;
            }

            if (
                token.type ===
                "ordered_list_open"
            ) {
                listType = "ordered";
                orderedCounter = 1;
                continue;
            }

            if (
                token.type ===
                "ordered_list_close"
            ) {
                listType = null;
                orderedCounter = 1;

                paragraphs.push(
                    new Paragraph({
                        text: "",
                        spacing: {
                            after: 80,
                        },
                    })
                );

                continue;
            }


          if (
                token.type ===
                "list_item_open"
            ) {
                const inlineToken =
                    tokens[i + 2];

                if (
                    inlineToken &&
                    inlineToken.type === "inline"
                ) {
                    let prefix = "• ";

                    if (
                        listType ===
                        "ordered"
                    ) {
                        prefix =
                            `${orderedCounter}. `;

                        orderedCounter++;
                    }

                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: prefix,
                                    bold: true,
                                    font:
                                        DESIGN.docx
                                            .bodyFont,
                                    size: 22,
                                    color:
                                        DESIGN.colors
                                            .primary,
                                }),

                                ...processInlineContent(
                                    inlineToken.children ||
                                        []
                                ),
                            ],

                            indent: {
                                left: 500,
                                hanging: 250,
                            },

                            spacing: {
                                before: 30,
                                after: 70,
                            },
                        })
                    );

                    i += 3;
                }

                continue;
            }

            // ==================================================
            // BLOCKQUOTE
            // ==================================================

            if (
                token.type ===
                "blockquote_open"
            ) {
                const inlineToken =
                    tokens[i + 2];

                if (
                    inlineToken &&
                    inlineToken.type === "inline"
                ) {
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text:
                                        inlineToken.content,

                                    italics: true,

                                    font:
                                        DESIGN.docx
                                            .bodyFont,

                                    size: 22,

                                    color:
                                        DESIGN.colors
                                            .muted,
                                }),
                            ],

                            indent: {
                                left: 700,
                                right: 300,
                            },

                            border: {
                                left: {
                                    color:
                                        DESIGN.colors
                                            .primary,

                                    style:
                                        BorderStyle.SINGLE,

                                    size: 14,

                                    space: 8,
                                },
                            },

                            spacing: {
                                before: 180,
                                after: 180,
                            },
                        })
                    );

                    i += 4;
                }

                continue;
            }
            if (
                token.type === "code_block" ||
                token.type === "fence"
            ) {
                paragraphs.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text:
                                    token.content,

                                font:
                                    "Courier New",

                                size: 18,

                                color:
                                    DESIGN.colors
                                        .text,
                            }),
                        ],

                        shading: {
                            fill: "F6F7FB",
                        },

                        indent: {
                            left: 300,
                            right: 300,
                        },

                        spacing: {
                            before: 120,
                            after: 160,
                        },
                    })
                );

                continue;
            }

            if (token.type === "hr") {
                paragraphs.push(
                    new Paragraph({
                        text: "",

                        border: {
                            bottom: {
                                color:
                                    DESIGN.colors
                                        .border,

                                style:
                                    BorderStyle.SINGLE,

                                size: 6,

                                space: 1,
                            },
                        },

                        spacing: {
                            before: 160,
                            after: 160,
                        },
                    })
                );
            }
        } catch (error) {
            console.error(
                "DOCX markdown error:",
                token.type,
                error.message
            );
        }
    }

    return paragraphs;
};

const exportAsDocument = async (req, res) => {
    try {
        const book = await Book.findById(
            req.params.id
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        if (!req.user) {
            return res.status(401).json({
                message:
                    "Authentication required",
            });
        }

        if (
            !book.userId ||
            book.userId.toString() !==
                req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Not authorized",
            });
        }

        const children = [];

        const coverPath =
            getCoverImagePath(
                book.coverImage
            );

        if (
            coverPath &&
            fs.existsSync(coverPath)
        ) {
            try {
                const imageBuffer =
                    fs.readFileSync(
                        coverPath
                    );

                children.push(
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: imageBuffer,

                                transformation: {
                                    width: 470,
                                    height: 650,
                                },
                            }),
                        ],

                        alignment:
                            AlignmentType.CENTER,

                        spacing: {
                            before: 500,
                            after: 0,
                        },

                        pageBreakAfter: true,
                    })
                );
            } catch (error) {
                console.error(
                    "DOCX cover error:",
                    error.message
                );
            }
        }

        children.push(
            new Paragraph({
                text: "",
                spacing: {
                    before: 1700,
                },
            })
        );

        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text:
                            book.title ||
                            "Untitled Book",

                        bold: true,

                        font:
                            DESIGN.docx
                                .headingFont,

                        size:
                            DESIGN.docx.title *
                            2,

                        color:
                            DESIGN.colors.dark,
                    }),
                ],

                alignment:
                    AlignmentType.CENTER,

                spacing: {
                    after: 350,
                },
            })
        );

        if (
            book.subtitle &&
            book.subtitle.trim()
        ) {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text:
                                book.subtitle,

                            font:
                                DESIGN.docx
                                    .headingFont,

                            size:
                                DESIGN.docx
                                    .subtitle * 2,

                            color:
                                DESIGN.colors
                                    .muted,
                        }),
                    ],

                    alignment:
                        AlignmentType.CENTER,

                    spacing: {
                        after: 500,
                    },
                })
            );
        }

        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: `by ${
                            book.author ||
                            "Unknown Author"
                        }`,

                        font:
                            DESIGN.docx
                                .headingFont,

                        size:
                            DESIGN.docx
                                .author * 2,

                        color:
                            DESIGN.colors
                                .primary,
                    }),
                ],

                alignment:
                    AlignmentType.CENTER,

                spacing: {
                    after: 200,
                },
            })
        );

        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: " ",
                        size: 20,
                    }),
                ],

                alignment:
                    AlignmentType.CENTER,

                pageBreakAfter: true,
            })
        );
        const chapters =
            Array.isArray(book.chapters)
                ? book.chapters
                : [];

        chapters.forEach(
            (chapter, index) => {
                // Chapter number
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text:
                                    `CHAPTER ${
                                        index + 1
                                    }`,

                                bold: true,

                                font:
                                    DESIGN.docx
                                        .headingFont,

                                size:
                                    DESIGN.docx
                                        .chapterNumber *
                                    2,

                                color:
                                    DESIGN.colors
                                        .primary,

                                characterSpacing: 45,
                            }),
                        ],

                        alignment:
                            AlignmentType.CENTER,

                        spacing: {
                            before: 500,
                            after: 180,
                        },
                    })
                );
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text:
                                    chapter.title ||
                                    `Chapter ${
                                        index + 1
                                    }`,

                                bold: true,

                                font:
                                    DESIGN.docx
                                        .headingFont,

                                size:
                                    DESIGN.docx
                                        .chapterTitle *
                                    2,

                                color:
                                    DESIGN.colors
                                        .dark,
                            }),
                        ],

                        alignment:
                            AlignmentType.CENTER,

                        spacing: {
                            after: 300,
                        },

                        keepNext: true,
                    })
                );
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "────────",
                                color:
                                    DESIGN.colors
                                        .primary,
                                size: 18,
                            }),
                        ],

                        alignment:
                            AlignmentType.CENTER,

                        spacing: {
                            after: 350,
                        },
                    })
                );

                const content =
                    chapter.content || "";

                if (content.trim()) {
                    children.push(
                        ...processMarkdownToDocx(
                            content
                        )
                    );
                } else {
                    children.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text:
                                        "No content available.",

                                    italics: true,

                                    font:
                                        DESIGN.docx
                                            .bodyFont,

                                    size: 22,

                                    color:
                                        DESIGN.colors
                                            .muted,
                                }),
                            ],

                            alignment:
                                AlignmentType.CENTER,
                        })
                    );
                }
                if (
                    index <
                    chapters.length - 1
                ) {
                    children.push(
                        new Paragraph({
                            text: "",
                            pageBreakBefore: true,
                        })
                    );
                }
            }
        );
        const doc = new Document({
            creator: "AI eBook Builder",

            title:
                book.title ||
                "Untitled Book",

            description:
                book.subtitle ||
                "Generated eBook",

            styles: {
                default: {
                    document: {
                        run: {
                            font:
                                DESIGN.docx
                                    .bodyFont,

                            size:
                                DESIGN.docx
                                    .body * 2,

                            color:
                                DESIGN.colors
                                    .text,
                        },

                        paragraph: {
                            spacing: {
                                line: 290,
                            },
                        },
                    },
                },
            },

            sections: [
                {
                    properties: {
                        page: {
                            margin:
                                DESIGN.docx
                                    .margins,
                        },
                    },

                    headers: {
                        default: new Header({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text:
                                                book.title ||
                                                "",

                                            font:
                                                DESIGN.docx
                                                    .headingFont,

                                            size: 17,

                                            color:
                                                DESIGN.colors
                                                    .muted,
                                        }),
                                    ],

                                    alignment:
                                        AlignmentType.RIGHT,
                                }),
                            ],
                        }),
                    },

                    footers: {
                        default: new Footer({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text:
                                                "AI eBook Builder  •  ",

                                            font:
                                                DESIGN.docx
                                                    .headingFont,

                                            size: 16,

                                            color:
                                                DESIGN.colors
                                                    .muted,
                                        }),

                                        new TextRun({
                                            children: [
                                                PageNumber
                                                    .CURRENT,
                                            ],

                                            font:
                                                DESIGN.docx
                                                    .headingFont,

                                            size: 16,

                                            color:
                                                DESIGN.colors
                                                    .muted,
                                        }),
                                    ],

                                    alignment:
                                        AlignmentType.CENTER,
                                }),
                            ],
                        }),
                    },

                    children,
                },
            ],
        });

        const buffer =
            await Packer.toBuffer(doc);

        const filename =
            safeFileName(
                book.title
            ) + ".docx";

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${filename}"`
        );

        res.setHeader(
            "Content-Length",
            buffer.length
        );

        return res.send(buffer);
    } catch (error) {
        console.error(
            "DOCX EXPORT ERROR:",
            error
        );

        if (!res.headersSent) {
            return res.status(500).json({
                message:
                    "Server error during document export",

                error:
                    error.message,
            });
        }
    }
};

const renderInlineTokens = (
    doc,
    tokens = []
) => {
    if (!tokens.length) return;

    let font =
        DESIGN.pdf.bodyFont;

    let buffer = "";

    const flush = (continued = true) => {
        if (!buffer) return;

        doc
            .font(font)
            .text(buffer, {
                continued,
                lineGap: 2,
            });

        buffer = "";
    };

    tokens.forEach((token) => {
        if (token.type === "text") {
            buffer += token.content;
            return;
        }

        if (
            token.type ===
            "strong_open"
        ) {
            flush(true);
            font =
                DESIGN.pdf.bodyBold;
            return;
        }

        if (
            token.type ===
            "strong_close"
        ) {
            flush(true);
            font =
                DESIGN.pdf.bodyFont;
            return;
        }

        if (
            token.type === "em_open"
        ) {
            flush(true);
            font =
                DESIGN.pdf.bodyItalic;
            return;
        }

        if (
            token.type === "em_close"
        ) {
            flush(true);
            font =
                DESIGN.pdf.bodyFont;
            return;
        }

        if (
            token.type === "code_inline"
        ) {
            flush(true);

            doc
                .font("Courier")
                .text(token.content, {
                    continued: true,
                });

            doc.font(font);

            return;
        }

        if (
            token.type === "softbreak" ||
            token.type === "hardbreak"
        ) {
            buffer += "\n";
        }
    });

    flush(false);
};

const renderMarkdown = (
    doc,
    markdown = ""
) => {
    if (!markdown.trim()) return;

    const tokens = md.parse(
        markdown,
        {}
    );

    let listType = null;
    let orderedCounter = 1;

    for (
        let i = 0;
        i < tokens.length;
        i++
    ) {
        const token = tokens[i];

        try {
            if (
                token.type ===
                "heading_open"
            ) {
                const level =
                    parseInt(
                        token.tag.substring(
                            1
                        ),
                        10
                    );

                let size =
                    DESIGN.pdf.h3;

                if (level === 1)
                    size =
                        DESIGN.pdf.h1;

                if (level === 2)
                    size =
                        DESIGN.pdf.h2;

                doc.moveDown(
                    level === 1
                        ? 0.8
                        : 0.5
                );

                doc
                    .font(
                        DESIGN.pdf
                            .headingFont
                    )
                    .fontSize(size)
                    .fillColor(
                        DESIGN.colors.dark
                    );

                const inlineToken =
                    tokens[i + 1];

                if (
                    inlineToken &&
                    inlineToken.type ===
                        "inline"
                ) {
                    renderInlineTokens(
                        doc,
                        inlineToken.children
                    );

                    i++;
                }

                doc.moveDown(0.35);

                if (
                    tokens[i + 1] &&
                    tokens[i + 1].type ===
                        "heading_close"
                ) {
                    i++;
                }

                continue;
            }

            if (
                token.type ===
                "paragraph_open"
            ) {
                doc
                    .font(
                        DESIGN.pdf
                            .bodyFont
                    )
                    .fontSize(
                        DESIGN.pdf.body
                    )
                    .fillColor(
                        DESIGN.colors.text
                    );

                const inlineToken =
                    tokens[i + 1];

                if (
                    inlineToken &&
                    inlineToken.type ===
                        "inline"
                ) {
                    renderInlineTokens(
                        doc,
                        inlineToken.children
                    );

                    i++;
                }

                if (
                    tokens[i + 1] &&
                    tokens[i + 1].type ===
                        "paragraph_close"
                ) {
                    i++;
                }

                if (!listType) {
                    doc.moveDown(
                        0.55
                    );
                }

                continue;
            }

            if (
                token.type ===
                "bullet_list_open"
            ) {
                listType = "bullet";
                doc.moveDown(0.2);
                continue;
            }

            if (
                token.type ===
                "bullet_list_close"
            ) {
                listType = null;
                doc.moveDown(0.4);
                continue;
            }
            if (
                token.type ===
                "ordered_list_open"
            ) {
                listType = "ordered";
                orderedCounter = 1;
                doc.moveDown(0.2);
                continue;
            }

            if (
                token.type ===
                "ordered_list_close"
            ) {
                listType = null;
                orderedCounter = 1;
                doc.moveDown(0.4);
                continue;
            }
            if (
                token.type ===
                "list_item_open"
            ) {
                let prefix = "• ";

                if (
                    listType ===
                    "ordered"
                ) {
                    prefix =
                        `${orderedCounter}. `;

                    orderedCounter++;
                }

                const inlineToken =
                    tokens[i + 2];

                if (
                    inlineToken &&
                    inlineToken.type ===
                        "inline"
                ) {
                    doc
                        .font(
                            DESIGN.pdf
                                .bodyFont
                        )
                        .fontSize(
                            DESIGN.pdf.body
                        )
                        .fillColor(
                            DESIGN.colors.text
                        );

                    doc.text(
                        prefix,
                        {
                            indent: 15,
                            continued: true,
                        }
                    );

                    renderInlineTokens(
                        doc,
                        inlineToken.children
                    );

                    doc.moveDown(0.25);
                }

                continue;
            }

            if (
                token.type ===
                "blockquote_open"
            ) {
                const inlineToken =
                    tokens[i + 2];

                if (
                    inlineToken &&
                    inlineToken.type ===
                        "inline"
                ) {
                    doc
                        .font(
                            DESIGN.pdf
                                .bodyItalic
                        )
                        .fontSize(
                            DESIGN.pdf.body
                        )
                        .fillColor(
                            DESIGN.colors
                                .muted
                        );

                    doc.text(
                        `"${inlineToken.content}"`,
                        {
                            indent: 25,
                            lineGap: 3,
                        }
                    );

                    doc.moveDown(0.5);

                    i += 4;
                }

                continue;
            }
            if (
                token.type ===
                    "code_block" ||
                token.type === "fence"
            ) {
                doc
                    .font("Courier")
                    .fontSize(9)
                    .fillColor(
                        DESIGN.colors.text
                    )
                    .text(
                        token.content,
                        {
                            indent: 15,
                            lineGap: 2,
                        }
                    );

                doc
                    .font(
                        DESIGN.pdf
                            .bodyFont
                    )
                    .fontSize(
                        DESIGN.pdf.body
                    );

                doc.moveDown(0.5);

                continue;
            }
            if (token.type === "hr") {
                doc.moveDown(0.5);

                const y = doc.y;

                doc
                    .moveTo(
                        doc.page.margins.left,
                        y
                    )
                    .lineTo(
                        doc.page.width -
                            doc.page.margins.right,
                        y
                    )
                    .stroke();

                doc.moveDown(0.5);
            }
        } catch (error) {
            console.error(
                "PDF markdown error:",
                token.type,
                error.message
            );
        }
    }
};

const addPDFHeaderFooter = (
    doc,
    book
) => {
    const range =
        doc.bufferedPageRange();

    for (
        let i = range.start;
        i < range.start + range.count;
        i++
    ) {
        doc.switchToPage(i);
        if (i > 0) {
            doc
                .font(
                    DESIGN.pdf.normalFont
                )
                .fontSize(8)
                .fillColor("#98A2B3")
                .text(
                    book.title ||
                        "",
                    doc.page.margins.left,
                    28,
                    {
                        width:
                            doc.page.width -
                            doc.page.margins.left -
                            doc.page.margins.right,

                        align: "right",
                    }
                );
        }

        // Footer
        if (i > 0) {
            doc
                .font(
                    DESIGN.pdf.normalFont
                )
                .fontSize(8)
                .fillColor("#98A2B3")
                .text(
                    `Page ${i}`,
                    doc.page.margins.left,
                    doc.page.height - 35,
                    {
                        width:
                            doc.page.width -
                            doc.page.margins.left -
                            doc.page.margins.right,

                        align: "center",
                    }
                );
        }
    }
};

// ======================================================
// PDF EXPORT
// ======================================================

const exportAsPDF = async (
    req,
    res
) => {
    try {
        const book =
            await Book.findById(
                req.params.id
            );

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        if (!req.user) {
            return res.status(401).json({
                message:
                    "Authentication required",
            });
        }

        if (
            !book.userId ||
            book.userId.toString() !==
                req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Not authorized",
            });
        }

        const doc =
            new PDFDocument({
                size: "A4",

                margins:
                    DESIGN.pdf.margins,

                bufferPages: true,
            });

        const filename =
            safeFileName(
                book.title
            ) + ".pdf";

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${filename}"`
        );

        doc.pipe(res);
        const coverPath =
            getCoverImagePath(
                book.coverImage
            );

        if (
            coverPath &&
            fs.existsSync(coverPath)
        ) {
            try {
                doc.image(
                    coverPath,
                    0,
                    0,
                    {
                        fit: [
                            doc.page.width,
                            doc.page.height,
                        ],

                        align: "center",
                        valign: "center",
                    }
                );

                doc.addPage();
            } catch (error) {
                console.error(
                    "PDF cover error:",
                    error.message
                );
            }
        }

        const centerY =
            doc.page.height / 2 - 120;

        doc
            .font(
                DESIGN.pdf.headingFont
            )
            .fontSize(
                DESIGN.pdf.title
            )
            .fillColor(
                DESIGN.colors.dark
            )
            .text(
                book.title ||
                    "Untitled Book",
                80,
                centerY,
                {
                    width:
                        doc.page.width -
                        160,

                    align: "center",
                }
            );

        let currentY =
            centerY + 65;

        if (
            book.subtitle &&
            book.subtitle.trim()
        ) {
            doc
                .font(
                    DESIGN.pdf.normalFont
                )
                .fontSize(
                    DESIGN.pdf.subtitle
                )
                .fillColor(
                    DESIGN.colors.muted
                )
                .text(
                    book.subtitle,
                    100,
                    currentY,
                    {
                        width:
                            doc.page.width -
                            200,

                        align: "center",
                    }
                );

            currentY += 55;
        }

        doc
            .font(
                DESIGN.pdf.normalFont
            )
            .fontSize(
                DESIGN.pdf.author
            )
            .fillColor(
                DESIGN.colors.primary
            )
            .text(
                `by ${
                    book.author ||
                    "Unknown Author"
                }`,
                100,
                currentY,
                {
                    width:
                        doc.page.width -
                        200,

                    align: "center",
                }
            );

        doc.addPage();

        const chapters =
            Array.isArray(book.chapters)
                ? book.chapters
                : [];

        chapters.forEach(
            (chapter, index) => {
                doc
                    .font(
                        DESIGN.pdf
                            .normalFont
                    )
                    .fontSize(
                        DESIGN.pdf
                            .chapterNumber
                    )
                    .fillColor(
                        DESIGN.colors.primary
                    )
                    .text(
                        `CHAPTER ${
                            index + 1
                        }`,
                        {
                            align: "center",
                        }
                    );

                doc.moveDown(0.3);

                doc
                    .font(
                        DESIGN.pdf
                            .headingFont
                    )
                    .fontSize(
                        DESIGN.pdf
                            .chapterTitle
                    )
                    .fillColor(
                        DESIGN.colors.dark
                    )
                    .text(
                        chapter.title ||
                            `Chapter ${
                                index + 1
                            }`,
                        {
                            align: "center",
                        }
                    );

                doc.moveDown(0.6);

                // Divider
                const dividerY =
                    doc.y;

                doc
                    .moveTo(
                        doc.page.margins.left +
                            120,
                        dividerY
                    )
                    .lineTo(
                        doc.page.width -
                            doc.page.margins.right -
                            120,
                        dividerY
                    )
                    .lineWidth(1)
                    .strokeColor(
                        DESIGN.colors
                            .primary
                    )
                    .stroke();

                doc.moveDown(1.2);

                const content =
                    chapter.content ||
                    "";

                if (
                    content.trim()
                ) {
                    renderMarkdown(
                        doc,
                        content
                    );
                } else {
                    doc
                        .font(
                            DESIGN.pdf
                                .bodyItalic
                        )
                        .fontSize(
                            DESIGN.pdf.body
                        )
                        .fillColor(
                            DESIGN.colors
                                .muted
                        )
                        .text(
                            "No content available.",
                            {
                                align:
                                    "center",
                            }
                        );
                }

                if (
                    index <
                    chapters.length - 1
                ) {
                    doc.addPage();
                }
            }
        );
        addPDFHeaderFooter(
            doc,
            book
        );

        doc.end();
    } catch (error) {
        console.error(
            "PDF EXPORT ERROR:",
            error
        );

        if (!res.headersSent) {
            return res.status(500).json({
                message:
                    "Server error during PDF export",

                error:
                    error.message,
            });
        }
    }
};
module.exports = {
    exportAsPDF,
    exportAsDocument,
};