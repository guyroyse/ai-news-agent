import { convert } from 'html-to-text'
import dedent from 'dedent'

import type { ArticleState } from '@state'
import { fetchLLM } from '@adapters'

const llm = fetchLLM()

export async function textExtractor(state: ArticleState): Promise<Partial<ArticleState>> {
  const { feedItem } = state

  if (!feedItem) throw new Error('No feed item to process')

  if (!feedItem.html) {
    console.log(`No HTML available for: ${feedItem.title}`)
    return { content: feedItem.content }
  }

  const text = extractTextFromHtml(feedItem.html)
  const prompt = buildPrompt(text)
  const response = await llm.invoke(prompt)
  const content = response.content as string

  return { content }
}

function extractTextFromHtml(html: string): string {
  return convert(html, {
    wordwrap: false,
    selectors: [
      { selector: 'a', options: { ignoreHref: true } },
      { selector: 'img', format: 'skip' },
      { selector: 'script', format: 'skip' },
      { selector: 'style', format: 'skip' }
    ]
  })
}

function buildPrompt(text: string): string {
  return dedent`
    Extract the main article content from the following text.
    Return only the article text, excluding ads, navigation, comments, and other non-article content.
    Do not include any preamble or explanation, just the extracted text.

    Text:
    ${text}`
}
