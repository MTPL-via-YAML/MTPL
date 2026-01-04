import { SourceProvider } from '../../core/source';
import { TemplateInfo } from '../../core/types';

const MOCK_TEMPLATE_YAML = `
meta:
  name: "标准公文 - 红头文件"
  version: "1.0.0"
  author: "GongWen Official"
  description: "符合国家标准的党政机关公文格式（红头、版记、页码）"
  license: "MIT"

style:
  page:
    size: "A4"
    orientation: "portrait"
    margin:
      top: "37mm"
      bottom: "35mm"
      left: "28mm"
      right: "26mm"
  
  fonts:
    main: "FangSong_GB2312, FangSong, STFangsong, serif"
    heading: "SimHei, STHeiti, sans-serif"
    title: "FZXiaoBiaoSong-B05S, 'Fizya XiaoBiaoSong', serif"
  
  typography:
    fontSize: "16pt"
    lineHeight: "28pt"

slots:
  title:
    type: "text"
    default: "关于做好2024年信息化建设工作的通知"
  doc_number:
    type: "text"
    default: "国办发〔2024〕1号"
  issuer:
    type: "text"
    default: "国务院办公厅"
  date:
    type: "date"
    default: "2024-01-15"
`;

const MOCK_TEMPLATES: TemplateInfo[] = [
  {
    id: "mock/official-red-head",
    name: "标准公文 - 红头文件",
    description: "符合国家标准的党政机关公文格式，包含红头、发文字号等要素。",
    version: "1.0.0",
    author: "GongWen Team",
    source: "mock",
    url: "https://example.com/templates/red-head",
    stars: 999,
    updatedAt: new Date().toISOString(),
    tags: ["公文", "红头", "标准"],
  },
  {
    id: "mock/simple-report",
    name: "通用简报",
    description: "适用于日常工作汇报、会议纪要的简洁排版。",
    version: "0.5.0",
    author: "GongWen Team",
    source: "mock",
    url: "https://example.com/templates/report",
    stars: 120,
    updatedAt: new Date().toISOString(),
    tags: ["简报", "汇报"],
  }
];

export const MockProvider: SourceProvider = {
  name: 'mock',

  async search(query: string): Promise<TemplateInfo[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!query) return MOCK_TEMPLATES;
    
    return MOCK_TEMPLATES.filter(t => 
      t.name.toLowerCase().includes(query.toLowerCase()) || 
      t.description.toLowerCase().includes(query.toLowerCase())
    );
  },

  async getTemplate(id: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (id === "mock/official-red-head") {
      return MOCK_TEMPLATE_YAML;
    }
    
    // Fallback simple template
    return `
meta:
  name: "通用简报"
  version: "0.5.0"
  author: "GongWen Team"

style:
  page:
    size: "A4"
    orientation: "portrait"
    margin:
      top: "20mm"
      bottom: "20mm"
      left: "20mm"
      right: "20mm"
`;
  }
};
