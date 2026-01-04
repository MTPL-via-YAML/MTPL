import { SourceProvider } from './source';

class PluginRegistry {
  private providers: Map<string, SourceProvider> = new Map();

  register(provider: SourceProvider) {
    if (this.providers.has(provider.name)) {
      console.warn(`Provider ${provider.name} is already registered. Overwriting.`);
    }
    this.providers.set(provider.name, provider);
  }

  getProvider(name: string): SourceProvider | undefined {
    return this.providers.get(name);
  }

  getAllProviders(): SourceProvider[] {
    return Array.from(this.providers.values());
  }
}

export const registry = new PluginRegistry();
