import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    preventDrag?: boolean;
}

// Quill toolbar configuration
const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link'],
        ['clean']
    ],
};

const formats = [
    'bold', 'italic', 'underline', 'strike',
    'list',
    'align',
    'link'
];

export default function RichTextEditor({ value, onChange, preventDrag = false }: RichTextEditorProps) {
    return (
        <div className="rich-text-editor-wrapper">
            <style>{`
                .rich-text-editor-wrapper .ql-toolbar {
                    background: #1A1425;
                    border: 1px solid rgba(122, 50, 224, 0.2);
                    border-bottom: none;
                    border-radius: 8px 8px 0 0;
                }
                .rich-text-editor-wrapper .ql-toolbar .ql-stroke {
                    stroke: #BBC5F2;
                }
                .rich-text-editor-wrapper .ql-toolbar .ql-fill {
                    fill: #BBC5F2;
                }
                .rich-text-editor-wrapper .ql-toolbar .ql-picker {
                    color: #BBC5F2;
                }
                .rich-text-editor-wrapper .ql-toolbar button:hover .ql-stroke,
                .rich-text-editor-wrapper .ql-toolbar button.ql-active .ql-stroke {
                    stroke: #B488FF;
                }
                .rich-text-editor-wrapper .ql-toolbar button:hover .ql-fill,
                .rich-text-editor-wrapper .ql-toolbar button.ql-active .ql-fill {
                    fill: #B488FF;
                }
                .rich-text-editor-wrapper .ql-toolbar button:hover,
                .rich-text-editor-wrapper .ql-toolbar button.ql-active {
                    background: rgba(122, 50, 224, 0.3);
                    border-radius: 4px;
                }
                .rich-text-editor-wrapper .ql-container {
                    background: #0F0C1A;
                    border: 1px solid rgba(122, 50, 224, 0.2);
                    border-radius: 0 0 8px 8px;
                    min-height: 200px;
                    font-size: 14px;
                }
                .rich-text-editor-wrapper .ql-editor {
                    color: white;
                    min-height: 180px;
                    user-select: text !important;
                    -webkit-user-select: text !important;
                    cursor: text !important;
                }
                .rich-text-editor-wrapper .ql-editor.ql-blank::before {
                    color: #6B7280;
                    font-style: normal;
                }
                .rich-text-editor-wrapper .ql-editor p {
                    margin-bottom: 0.5em;
                }
                .rich-text-editor-wrapper .ql-picker-options {
                    background: #1A1425;
                    border-color: rgba(122, 50, 224, 0.2);
                }
                .rich-text-editor-wrapper .ql-picker-item {
                    color: #BBC5F2;
                }
                .rich-text-editor-wrapper .ql-picker-item:hover {
                    color: #B488FF;
                }
            `}</style>
            <div
                onMouseDown={(e) => preventDrag && e.stopPropagation()}
                onPointerDown={(e) => preventDrag && e.stopPropagation()}
            >
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                    placeholder="Enter description..."
                />
            </div>
        </div>
    );
}
