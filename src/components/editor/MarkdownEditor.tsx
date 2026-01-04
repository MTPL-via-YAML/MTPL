import React from 'react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-surface-white">
      <div className="flex-1 relative group">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full p-6 resize-none outline-none font-mono text-sm leading-loose text-text-primary bg-transparent placeholder:text-text-muted selection:bg-primary/20 dark:text-text-primary"
          placeholder="# Start typing your document..."
          spellCheck={false}
        />
      </div>
      <div className="border-t border-surface-200 dark:border-white/5 p-2 text-xs text-text-muted bg-surface-50 dark:bg-surface-100 flex justify-between items-center px-4">
        <span>Line: {value.split('\n').length}</span>
        <span>支持 Markdown</span>
      </div>
    </div>
  );
};
