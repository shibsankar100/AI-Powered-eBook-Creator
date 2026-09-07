const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Create model
const model = genAI.getGenerativeModel({
    model: "gemini-3.5-flash-lite",
});

// @desc Generate a book outline
// @route POST /api/ai/generate-outline
// @access Private
const generateOutline = async (req, res) => {
    try {
        const {
            topic,
            style,
            numChapters,
            description,
        } = req.body;

        if (!topic) {
            return res.status(400).json({
                message: "Please provide a topic",
            });
        }

        const prompt = `
You are an expert book writer.

Write a JSON array containing chapter outlines for a book.

Topic: ${topic}
Writing Style: ${style || "simple"}
Number of Chapters: ${numChapters || 5}
Description: ${description || "No extra description"}

Format your answer EXACTLY like this:

[
  {
    "chapter": 1,
    "title": "Chapter Title",
    "summary": "Short summary"
  },
  {
    "chapter": 2,
    "title": "Chapter Title",
    "summary": "Short summary"
  }
]

Create exactly ${numChapters || 5} chapters.

Only return the JSON array.
Do not include markdown.
Do not include \`\`\`json.
Do not include any extra text.
`;

        // Generate content
        const result = await model.generateContent(prompt);

        // Get generated text
        const text = result.response.text();

        console.log("Gemini response:", text);

        // Find JSON array
        const startIndex = text.indexOf("[");
        const endIndex = text.lastIndexOf("]");

        if (startIndex === -1 || endIndex === -1) {
            console.error(
                "Could not find JSON array in AI response:",
                text
            );

            return res.status(500).json({
                message:
                    "Failed to parse AI response. No JSON array found.",
            });
        }

        const jsonString = text.substring(
            startIndex,
            endIndex + 1
        );

        // Parse JSON
        try {
            const outline = JSON.parse(jsonString);

            return res.status(200).json({
                outline,
            });
        } catch (parseError) {
            console.error(
                "Failed to parse AI response:",
                jsonString
            );

            return res.status(500).json({
                message:
                    "Failed to generate a valid outline. The AI response was not valid JSON.",
            });
        }

    } catch (error) {
        console.error(
            "Error generating outline:",
            error
        );

        return res.status(500).json({
            message:
                "Server error during AI outline generation",
            error: error.message,
        });
    }
};


// @desc Generate content for a chapter
// @route POST /api/ai/generate-chapter-content
// @access Private
const generateChapterContent = async (req, res) => {
    try {
        const {
            chapterTitle,
            chapterDescription,
            style,
        } = req.body;

        if (!chapterTitle) {
            return res.status(400).json({
                message: "Please provide a chapter title",
            });
        }

        const prompt = `
You are an expert book writer.

Write detailed chapter content based on the following:

Chapter Title: ${chapterTitle}

Description:
${chapterDescription || "No description given"}

Writing Style:
${style || "simple"}

Requirements:

- Write detailed and engaging content.
- Use clear and easy-to-understand language.
- Organize the chapter with appropriate headings and subheadings.
- Include examples where useful.
- Make the content informative and useful.
- Do not talk about being an AI.
- Return only the chapter content.
`;

        // Generate content
        const result = await model.generateContent(prompt);

        // Get text
        const text = result.response.text();

        return res.status(200).json({
            content: text,
        });

    } catch (error) {
        console.error(
            "Error generating chapter:",
            error
        );

        return res.status(500).json({
            message:
                "Server error during AI chapter generation",
            error: error.message,
        });
    }
};


module.exports = {
    generateOutline,
    generateChapterContent,
};