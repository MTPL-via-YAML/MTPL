import { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white dark:bg-surface-white p-4 rounded-xl shadow-lg border border-surface-200 dark:border-white/5 z-50 animate-slide-up print:hidden">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Download size={18} className="text-primary" />
            <h3 className="font-semibold text-text-primary">安装应用</h3>
          </div>
          <p className="text-sm text-text-secondary mb-3">
            安装此应用到您的主屏幕，以便快速访问和离线使用。
          </p>
          <div className="flex gap-2">
            <button 
              onClick={handleInstall}
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              安装
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="px-4 py-2 text-text-secondary dark:text-text-primary text-sm font-medium hover:bg-surface-100 dark:hover:bg-surface-200 rounded-lg transition-colors"
            >
              暂不
            </button>
          </div>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-text-muted hover:text-text-primary p-1"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
