const { GoogleGenerativeAI } = require("@google/generative-ai");


const ai=new GoogleGenerativeAI({apikey: process.env.GEMINI_API_KEY});

//@desc Generate a book outline
//@route POST /api/ai/generate-outline
//@access private
const generateOutline=async(req,res) => {
    try{
        const {topic,style,numChapters,description}=req.body;

        if(!topic){
            return res.status(400).json({message:"Please provide a topic"});
        }

        const prompt=`You are an expert book writer.

Write a JSON array containing chapter outlines for a book.

Topic: ${topic}
Writing Style: ${style || "simple"}
Number of Chapters: ${numChapters || 5}
Description: ${description || "No extra description"}

Format your answer EXACTLY like this:

[
  { "chapter": 1, "title": "Chapter Title", "summary": "Short summary" },
  { "chapter": 2, "title": "Chapter Title", "summary": "Short summary" }
]

Only return the JSON array. No extra text.
        `;
        const response=await ai.models.generateContent({
            model:"gemini-2.5-flash-lite",
            contents:prompt,
        });

        const text=response.text;

        // Find and extract the json array from the response text
        const startIndex=text.indexOf("[");
        const endIndex=text.lastIndexOf("]");

        if(startIndex===-1||endIndex===-1){
            console.error("Could not find json arrsy in AI response:",text);
            return res
            .status(500)
            .json({message:"Failed to parse AI response, no json array found."});
        }

        const jsonString=text.substring(startIndex,endIndex+1);

        // Validate if the response is valid json
        try{
            const outline=JSON.parse(jsonString);
            res.status(200).json({outline});
        }  catch(e){
            console.error("Failed to parse AI response:",jsonString);
            res.status(500).json({
                message:
                "Failed to generate a valid outline. The AI response was not valid Json",
            });
        }


    } catch(error){
        console.error("Error generating outline:", error);
        res
        .status(500)
        .json({message:"Server error during AI outline generation"});

    }
};

//@desc generate content for a chapter
// @route post /api/ai/generate-chapter content
// @ access private
const generateChapterContent=async(req,res)=> {
    try{
        const {chapteTitle,ChapterDescription,style}=req.body;

        if(!chapterTitle){
            return res
            .status(400)
            .json({message:"Please provide a chapter title"});
        }

        const prompts=`You are an expert writer.

Write detailed chapter content based on the following:

Chapter Title: ${chapterTitle}
Description: ${chapterDescription || "No description given"}
Writing Style: ${style || "simple"}

Make the content long, detailed, engaging, and easy to read.`;

        const response=await ai.models.generateContent({
            model:"gemini-2.5-flash-lite",
            contents:prompt,
        });

        res.status(200).json({content:response.text});
       
    } catch(error){
        console.error("Error generating chapters:",error);
        res
        .status(500)
        .json({message:"server error during AI chapter generation"});
    }
};

module.exports={
    generateOutline,
    generateChapterContent,
};
