export class GitHubClient {
  private static BASE_URL = 'https://api.github.com';

  static async searchRepos(query: string) {
    // Search for repos with specific topic or keyword
    const q = encodeURIComponent(`${query} topic:mtpl`);
    const response = await fetch(`${this.BASE_URL}/search/repositories?q=${q}&sort=stars&order=desc`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API Rate Limit Exceeded');
      }
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }

    return response.json();
  }

  static async getFileContent(owner: string, repo: string, path: string = 'template.yaml', branch: string = 'main') {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch template file: ${response.statusText}`);
    }
    return response.text();
  }
}
