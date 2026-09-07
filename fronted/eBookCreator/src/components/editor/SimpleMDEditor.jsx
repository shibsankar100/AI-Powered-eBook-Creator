import { Type } from "lucide-react";
import MDEditor, { commands } from "@uiw/react-md-editor";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const SimpleMDEditor = ({
  value = "",
  onChange,
  options = {},
  preview = "edit",
}) => {
  return (
    <div
      className="w-full"
      data-color-mode="light"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-violet-600" />

          <span className="text-sm font-medium text-slate-700">
            Markdown Editor
          </span>
        </div>

        <span className="text-xs text-slate-400">
          Markdown supported
        </span>
      </div>

      <div className="p-4">
        <MDEditor
          value={value}
          onChange={(newValue) => {
            if (typeof onChange === "function") {
              onChange(newValue ?? "");
            }
          }}
          preview={preview}
          height={400}
          spellCheck={false}
          commands={[
            commands.bold,
            commands.italic,
            commands.strikethrough,
            commands.hr,
            commands.title,
            commands.divider,
            commands.link,
            commands.code,
            commands.image,
            commands.unorderedListCommand,
            commands.orderedListCommand,
            commands.checkedListCommand,
          ]}
          {...options}
        />
      </div>
    </div>
  );
};

export default SimpleMDEditor;