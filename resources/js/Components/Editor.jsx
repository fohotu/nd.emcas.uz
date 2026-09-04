import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";

export default function Editor({ value, onChange }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value || "",
        editorProps: {
            attributes: {
                class:
                    "min-h-[250px] border rounded-lg p-4 focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (
            editor &&
            value !== editor.getHTML()
        ) {
            editor.commands.setContent(value || "");
        }
    }, [value]);

    if (!editor) {
        return null;
    }

    return (
        <div className="space-y-2">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 border rounded p-2 bg-gray-50">
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                    className={`px-3 py-1 rounded ${
                        editor.isActive("bold")
                            ? "bg-blue-500 text-white"
                            : "bg-white border"
                    }`}
                >
                    B
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                    className={`px-3 py-1 rounded ${
                        editor.isActive("italic")
                            ? "bg-blue-500 text-white"
                            : "bg-white border"
                    }`}
                >
                    I
                </button>
                
                <button
                    type="button"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBulletList()
                            .run()
                    }
                    className={`px-3 py-1 rounded ${
                        editor.isActive("bulletList")
                            ? "bg-blue-500 text-white"
                            : "bg-white border"
                    }`}
                >
                    • List
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleOrderedList()
                            .run()
                    }
                    className={`px-3 py-1 rounded ${
                        editor.isActive("orderedList")
                            ? "bg-blue-500 text-white"
                            : "bg-white border"
                    }`}
                >
                    1. List
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().undo().run()
                    }
                    className="px-3 py-1 rounded bg-white border"
                >
                    Undo
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().redo().run()
                    }
                    className="px-3 py-1 rounded bg-white border"
                >
                    Redo
                </button>
            </div>
            {/* Editor */}
            <EditorContent editor={editor} />
        </div>
    );
}