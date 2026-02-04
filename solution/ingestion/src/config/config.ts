import 'dotenv/config'

class Config {
  get rssFeeds(): string[] {
    return [
      'https://feeds.bbci.co.uk/news/rss.xml',
      'https://feeds.arstechnica.com/arstechnica/index',
      'https://techcrunch.com/feed/'
    ]
  }

  get redisUrl(): string {
    return process.env.REDIS_URL || 'redis://localhost:6379'
  }

  get openAiApiKey(): string {
    return process.env.OPENAI_API_KEY || ''
  }
}

export const config = new Config()
