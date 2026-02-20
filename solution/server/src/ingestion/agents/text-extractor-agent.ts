import { convert } from 'html-to-text'
import dedent from 'dedent'

import type { ArticleState } from '../state.js'
import { fetchLLM, fetchTokenCounter } from '@adapters'
import { log } from '@services'

const llm = fetchLLM()
const tokenCounter = fetchTokenCounter()

export async function textExtractor(state: ArticleState): Promise<Partial<ArticleState>> {
  /* Extract the feed item from the state */
  const { feedItem } = state

  /* Make sure we have a feed item */
  if (!feedItem) throw new Error('No feed item to process')

  log('Text Extractor', 'Extracting article text')

  /* If we don't have HTML, use the RSS content. Nothing to do here. */
  if (!feedItem.html) {
    log('Text Extractor', 'No HTML available, using RSS content')
    return { content: feedItem.content }
  }

  /* Extract the text from the HTML */
  const text = extractTextFromHtml(feedItem.html)

  /* Build the prompt, send it to the LLM, and get its response */
  const prompt = buildPrompt(text)
  const response = await llm.invoke(prompt)
  const content = response.content as string

  /* Log the token counts to show the massive savings */
  log('Text Extractor', 'Tokens in HTML:', tokenCounter.encode(feedItem.html).length)
  log('Text Extractor', 'Tokens in text:', tokenCounter.encode(text).length)
  log('Text Extractor', 'Tokens in content:', tokenCounter.encode(content).length)

  log('Text Extractor', 'Text extraction complete')

  return { content }
}

function extractTextFromHtml(html: string): string {
  return convert(html, {
    wordwrap: false,
    selectors: [
      { selector: 'a', options: { ignoreHref: false } },
      { selector: 'img', format: 'skip' },
      { selector: 'script', format: 'skip' },
      { selector: 'style', format: 'skip' }
    ]
  })
}

function buildPrompt(text: string): string {
  return dedent`
    Extract the main article content from the following text.
    Return only the article text, excluding the title, ads, navigation, comments, and other non-article content.
    Do not include any preamble or explanation, just the extracted text.

    Format the output as Markdown:
    - Use paragraphs separated by blank lines
    - Preserve any links as [text](url)
    - Use headers (##, ###) if appropriate
    - Use lists where the content has bullet points
    - Do NOT include the article title (it is stored separately)

    Text:
    ${text}`
}
