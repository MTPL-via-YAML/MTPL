import { SourceProvider } from '../../core/source';
import { TemplateInfo } from '../../core/types';
import { GitHubClient } from './client';

export const GitHubProvider: SourceProvider = {
  name: 'github',

  async search(query: string): Promise<TemplateInfo[]> {
    try {
      const result = await GitHubClient.searchRepos(query);
      return result.items.map((item: any) => ({
        id: item.full_name, // owner/repo
        name: item.name,
        description: item.description,
        version: 'latest', // GitHub repos don't strictly have a version unless we check tags
        author: item.owner.login,
        source: 'github',
        url: item.html_url,
        stars: item.stargazers_count,
        updatedAt: item.updated_at,
        tags: item.topics,
      }));
    } catch (error) {
      console.error('GitHub Search Error:', error);
      return [];
    }
  },

  async getTemplate(id: string): Promise<string> {
    const [owner, repo] = id.split('/');
    // Try to fetch template.yaml from main or master
    try {
      return await GitHubClient.getFileContent(owner, repo, 'template.yaml', 'main');
    } catch (e) {
      // Fallback to master if main fails? Or let it fail.
      // For now, let's just try main.
      throw e;
    }
  }
};
