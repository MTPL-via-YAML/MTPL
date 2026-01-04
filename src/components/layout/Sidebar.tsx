import React from 'react';
import { Search, Loader2, Star, GitBranch, Calendar } from 'lucide-react';
import { TemplateInfo } from '../../core/types';
import { motion } from 'framer-motion';

interface SidebarProps {
  query: string;
  onQueryChange: (q: string) => void;
  onSearch: () => void;
  templates: TemplateInfo[];
  loading: boolean;
  selectedId: string | undefined;
  onSelect: (tpl: TemplateInfo) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  query,
  onQueryChange,
  onSearch,
  templates,
  loading,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="relative h-full bg-white dark:bg-surface-white border-r border-surface-200 dark:border-surface-200">
      <div className="absolute top-0 left-0 right-0 p-4 pt-[calc(1rem+env(safe-area-inset-top))] border-b border-surface-100 dark:border-white/5 bg-white/80 dark:bg-surface-white/80 backdrop-blur-md z-10">
        <div className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            placeholder="搜索模板..."
            className="input pl-10 pr-4 py-2.5 rounded-xl dark:bg-surface-200 dark:border-transparent dark:text-text-primary dark:placeholder-text-muted dark:focus:bg-surface-100"
          />
          <Search className="absolute left-3.5 top-3 text-text-muted group-focus-within:text-primary transition-colors" size={16} />
        </div>
      </div>

      <div className="h-full overflow-y-auto p-3 pt-[calc(6rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))] space-y-2">
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 text-text-muted">
            <Loader2 className="animate-spin mb-2" size={24} />
            <span className="text-xs">Searching...</span>
          </div>
        )}

        {!loading && templates.length === 0 && (
          <div className="text-center text-text-muted text-sm py-12 px-4">
            <p>No templates found.</p>
            <p className="text-xs mt-1 text-text-secondary">Try "gongwen" or "report"</p>
          </div>
        )}

        {templates.map((tpl, index) => (
          <motion.div
            key={tpl.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, ease: "easeOut" }}
            onClick={() => onSelect(tpl)}
            className={`
              relative p-4 rounded-xl cursor-pointer border transition-all duration-200 group
              ${selectedId === tpl.id 
                ? 'bg-surface-50 dark:bg-surface-200 border-primary/50 shadow-sm ring-1 ring-primary/20' 
                : 'bg-white dark:bg-surface-white border-transparent hover:bg-surface-50 dark:hover:bg-surface-200 hover:border-surface-200 dark:hover:border-transparent'
              }
            `}
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className={`font-semibold text-sm truncate pr-2 transition-colors ${selectedId === tpl.id ? 'text-primary' : 'text-text-primary group-hover:text-primary'}`}>
                {tpl.name}
              </h3>
              {tpl.stars !== undefined && (
                <span className="flex items-center text-[10px] text-warning bg-yellow-50 px-1.5 py-0.5 rounded-full border border-yellow-100">
                  <Star size={10} className="mr-1 fill-current" />
                  {tpl.stars}
                </span>
              )}
            </div>
            
            <p className="text-xs text-text-secondary line-clamp-2 mb-3 leading-relaxed">
              {tpl.description}
            </p>

            <div className="flex items-center gap-3 text-[10px] text-text-muted">
              <span className="flex items-center hover:text-text-primary transition-colors">
                <GitBranch size={12} className="mr-1" />
                {tpl.author}
              </span>
              {tpl.updatedAt && (
                <span className="flex items-center">
                  <Calendar size={12} className="mr-1" />
                  {new Date(tpl.updatedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
