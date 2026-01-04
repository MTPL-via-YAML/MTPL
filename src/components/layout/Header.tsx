import React from 'react';
import { Printer, FileText, PanelLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onPrint: () => void;
  canPrint: boolean;
  title?: string;
  onToggleSidebar: () => void;
  showSidebar: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onPrint, canPrint, title, onToggleSidebar, showSidebar }) => {
  return (
    <header className="bg-white/80 dark:bg-transparent backdrop-blur-md border-b border-surface-200 dark:border-white/5 h-[calc(4rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 print:hidden transition-all duration-300">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleSidebar}
          className={`p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-200 transition-colors text-text-secondary hover:text-primary ${showSidebar ? 'bg-surface-100 dark:bg-surface-200 text-primary' : ''}`}
          title="Toggle Sidebar"
        >
          <PanelLeft size={20} />
        </button>

        <div className="bg-gradient-to-br from-primary to-primary-dark p-2 rounded-lg text-white shadow-lg shadow-primary/20 hidden md:block">
          <FileText size={20} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-bold text-text-primary leading-tight">MTPL</h1>
          <p className="text-[10px] font-medium text-text-muted tracking-wide uppercase hidden md:block">Markdown Templated PDF Lite via YAML</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {title && (
          <span className="text-sm text-text-secondary hidden md:block mr-4 border-r border-surface-200 dark:border-white/10 pr-4">
            Current: <span className="font-medium text-text-primary">{title}</span>
          </span>
        )}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrint}
          disabled={!canPrint}
          className={`
            btn ${canPrint ? 'btn-primary' : 'bg-surface-100 dark:bg-surface-200 text-text-muted cursor-not-allowed'}
          `}
        >
          <Printer size={16} className="mr-2" />
          <span className="hidden sm:inline">打印 / PDF</span>
        </motion.button>
      </div>
    </header>
  );
};
