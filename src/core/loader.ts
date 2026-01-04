import { get, set } from 'idb-keyval';
import { registry } from './registry';
import { validateTemplate } from './schema';
import yaml from 'js-yaml';

export class TemplateLoader {
  static async load(source: string, id: string) {
    const cacheKey = `tpl:${source}:${id}`;
    
    // 1. Try Cache (Simple strategy: cache-first. Real world needs version check/stale-while-revalidate)
    try {
      const cached = await get(cacheKey);
      if (cached) {
        console.log('Loaded from cache:', id);
        return cached;
      }
    } catch (e) {
      console.warn('Cache read failed', e);
    }

    // 2. Fetch
    const provider = registry.getProvider(source);
    if (!provider) throw new Error(`Provider ${source} not found`);

    console.log(`Fetching template ${id} from ${source}...`);
    const rawYaml = await provider.getTemplate(id);
    
    // 3. Parse
    let parsed: unknown;
    try {
      parsed = yaml.load(rawYaml);
    } catch (e) {
      throw new Error('Failed to parse YAML');
    }

    // 4. Validate
    const validation = validateTemplate(parsed);
    
    if (!validation.success) {
      // Create a readable error message
      const issues = validation.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
      throw new Error(`Invalid Template Schema: ${issues}`);
    }

    const config = validation.data;

    // 5. Cache
    await set(cacheKey, config);

    return config;
  }
}
