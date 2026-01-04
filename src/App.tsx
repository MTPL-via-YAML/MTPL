import { useState, useEffect } from 'react';
import { registry } from './core/registry';
import { GitHubProvider } from './plugins/github/provider';
import { MockProvider } from './plugins/mock/provider';
import { TemplateLoader } from './core/loader';
import { TemplateInfo } from './core/types';
import { TemplateConfig } from './core/schema';
import { Renderer } from './components/Renderer';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MarkdownEditor } from './components/editor/MarkdownEditor';
import { PenTool, Eye } from 'lucide-react';
import { PWAInstallPrompt } from './components/pwa/PWAInstallPrompt';

// Register plugins
registry.register(GitHubProvider);
registry.register(MockProvider);

function App() {
  // State
  const [query, setQuery] = useState('');
  const [templates, setTemplates] = useState<TemplateInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateInfo | null>(null);
  const [config, setConfig] = useState<TemplateConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Editor State
  const [content, setContent] = useState('# 欢迎使用公文排版工具\n\n请在左侧选择一个模板，然后在此处编辑内容。\n\n## 功能特点\n- 实时预览\n- 标准公文格式\n- 离线可用');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('preview');
  const [showSidebar, setShowSidebar] = useState(true);

  // Initial Load (Mock Data)
  useEffect(() => {
    handleSearch('mock'); // Load mock templates initially
    
    // Mobile check
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  }, []);

  const handleSearch = async (q: string = query) => {
    setLoading(true);
    setError(null);
    try {
      // If query is empty or 'mock', use mock provider
      // Otherwise search github
      let providerName = 'github';
      if (!q || q === 'mock') providerName = 'mock';

      const provider = registry.getProvider(providerName);
      if (provider) {
        const results = await provider.search(q === 'mock' ? '' : q);
        setTemplates(results);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTemplate = async (tpl: TemplateInfo) => {
    setLoading(true);
    setError(null);
    try {
      const loadedConfig = await TemplateLoader.load(tpl.source, tpl.id);
      setConfig(loadedConfig as TemplateConfig);
      setSelectedTemplate(tpl);
      // Auto switch to preview on mobile
      if (window.innerWidth < 768) {
        setShowSidebar(false);
        setActiveTab('preview');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-screen flex flex-col bg-surface-50 dark:bg-surface-50 text-text-primary font-sans overflow-hidden print:h-auto print:overflow-visible transition-colors duration-300">
      <Header 
        onPrint={handlePrint} 
        canPrint={!!config} 
        title={selectedTemplate?.name}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
        showSidebar={showSidebar}
      />

      <div className="flex-1 flex overflow-hidden relative print:h-auto print:overflow-visible print:block">
        
        {/* Desktop Sidebar Container */}
        <div className={`hidden md:block h-full transition-all duration-300 ease-[var(--ease-out)] border-r border-surface-200 dark:border-white/5 bg-white dark:bg-surface-white ${showSidebar ? 'w-80 opacity-100' : 'w-0 opacity-0 overflow-hidden'} print:hidden`}>
          <div className="w-80 h-full">
            <Sidebar
              query={query}
              onQueryChange={setQuery}
              onSearch={() => handleSearch()}
              templates={templates}
              loading={loading}
              selectedId={selectedTemplate?.id}
              onSelect={loadTemplate}
            />
          </div>
        </div>

        {/* Mobile Sidebar Drawer */}
        <div 
          className={`md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'} print:hidden`} 
          onClick={() => setShowSidebar(false)}
        >
          <div 
            className={`absolute left-0 top-0 h-full w-80 bg-white dark:bg-surface-white shadow-xl transition-transform duration-300 ease-[var(--ease-out)] ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`} 
            onClick={e => e.stopPropagation()}
          >
             <Sidebar
              query={query}
              onQueryChange={setQuery}
              onSearch={() => handleSearch()}
              templates={templates}
              loading={loading}
              selectedId={selectedTemplate?.id}
              onSelect={loadTemplate}
            />
          </div>
        </div>

        {/* Main Workspace */}
        <main className="flex-1 flex flex-col min-w-0 bg-surface-100 dark:bg-surface-50 print:bg-white print:block print:h-auto print:overflow-visible">
          
          {/* Mobile Tabs */}
          <div className="md:hidden flex border-b border-surface-200 dark:border-white/5 bg-white dark:bg-surface-white print:hidden">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'editor' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <PenTool size={16} /> 编辑
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'preview' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <Eye size={16} /> 预览
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex overflow-hidden print:block print:h-auto print:overflow-visible">
            {/* Editor Pane */}
            <div className={`
              flex-1 h-full border-r border-surface-200 dark:border-white/5 bg-white dark:bg-surface-white transition-all
              ${activeTab === 'editor' ? 'block' : 'hidden md:block'}
              print:hidden
            `}>
              <MarkdownEditor value={content} onChange={setContent} />
            </div>

            {/* Preview Pane */}
            <div className={`
              flex-1 h-full overflow-y-auto bg-surface-100 dark:bg-surface-50 p-4 pb-[calc(2rem+env(safe-area-inset-bottom))] md:p-8 flex flex-col items-center
              ${activeTab === 'preview' ? 'block' : 'hidden md:block'}
              print:block print:w-full print:p-0 print:bg-white print:h-auto print:overflow-visible
            `}>
              {error && (
                <div className="w-full max-w-2xl mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm animate-fade-in">
                  {error}
                </div>
              )}
              
              {config ? (
                <div className="bg-white shadow-lg print:shadow-none animate-slide-up origin-top">
                  <Renderer config={config} content={content} />
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-text-muted min-h-[50vh] animate-fade-in">
                  <div className="w-16 h-16 bg-surface-200 dark:bg-surface-200/50 rounded-full flex items-center justify-center mb-4 text-text-secondary">
                    <Eye size={32} />
                  </div>
                  <p>选择一个模板以生成预览</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <PWAInstallPrompt />
    </div>
  );
}

export default App;
