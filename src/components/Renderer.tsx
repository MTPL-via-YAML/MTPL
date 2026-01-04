import React, { useMemo } from 'react';
import Markdown from 'react-markdown';
import { TemplateConfig } from '../core/schema';

interface RendererProps {
  config: TemplateConfig;
  content: string; // Markdown content
}

export const Renderer: React.FC<RendererProps> = ({ config, content }) => {
  const styles = useMemo(() => {
    const { margin, size, orientation } = config.style.page;
    
    // Convert array margins to string if needed, or handle complex logic
    const top = margin.top;
    const bottom = margin.bottom;
    const left = Array.isArray(margin.left) ? margin.left[0] : margin.left;
    const right = Array.isArray(margin.right) ? margin.right[0] : margin.right;

    return `
      @media print {
        @page {
          size: ${size} ${orientation};
          margin: ${top} ${right} ${bottom} ${left};
        }
        body {
          -webkit-print-color-adjust: exact;
        }
      }
      
      .preview-container {
        font-family: ${config.style.fonts?.main || 'system-ui, sans-serif'};
        font-size: ${config.style.typography?.fontSize || '16px'};
        line-height: ${config.style.typography?.lineHeight || '1.5'};
        /* Simulate page on screen */
        padding: ${top} ${right} ${bottom} ${left};
        width: 210mm; /* A4 width approx */
        min-height: 297mm;
        margin: 0 auto;
        background: white;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }

      @media print {
        .preview-container {
          width: 100%;
          min-height: auto;
          margin: 0;
          padding: 0; /* Page margins handled by @page */
          box-shadow: none;
        }
      }
    `;
  }, [config]);

  return (
    <>
      <style>{styles}</style>
      <div className="preview-container print:w-full">
        <div className="prose max-w-none">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </>
  );
};
