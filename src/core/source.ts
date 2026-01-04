import { TemplateInfo } from './types';

export interface SourceProvider {
  name: string;
  search(query: string): Promise<TemplateInfo[]>;
  getTemplate(id: string): Promise<string>; // Returns raw YAML content
}
