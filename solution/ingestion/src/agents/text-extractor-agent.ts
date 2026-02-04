import { convert } from 'html-to-text'
import dedent from 'dedent'

import type { ArticleState } from '@root/state'
import { fetchLLM, fetchTokenCounter } from '@adapters'

const llm = fetchLLM()
const tokenCounter = fetchTokenCounter()

export async function textExtractor(state: ArticleState): Promise<Partial<ArticleState>> {
  /* Extract the feed item from the state */
  const { feedItem } = state

  /* Make sure we have a feed item */
  if (!feedItem) throw new Error('No feed item to process')

  console.log(`[Text Extractor] Extracting article text`)

  /* If we don't have HTML, use the RSS content. Nothing to do here. */
  if (!feedItem.html) {
    console.log(`-> No HTML available, using RSS content`)
    console.log()
    return { content: feedItem.content }
  }

  /* Extract the text from the HTML */
  const text = extractTextFromHtml(feedItem.html)

  /* Build the prompt, send it to the LLM, and get its response */
  const prompt = buildPrompt(text)
  const response = await llm.invoke(prompt)
  const content = response.content as string

  /* Log the token counts to show the massive savings */
  console.log(`-> Tokens in HTML: ${tokenCounter.encode(feedItem.html).length}`)
  console.log(`-> Tokens in text: ${tokenCounter.encode(text).length}`)
  console.log(`-> Tokens in content: ${tokenCounter.encode(content).length}`)

  console.log(`-> Text extraction complete`)
  console.log()

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
