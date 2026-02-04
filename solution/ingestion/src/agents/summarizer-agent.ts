import dedent from 'dedent'

import type { ArticleState } from '@root/state'
import { fetchLLM, fetchTokenCounter } from '@adapters'

const llm = fetchLLM()
const tokenCounter = fetchTokenCounter()

export async function summarizer(state: ArticleState): Promise<Partial<ArticleState>> {
  /* Extract the content from the state */
  const { content } = state

  console.log(`[Summarizer] Generating summary`)

  /* If we don't have content, return an empty summary */
  if (!content) {
    console.log(`-> No content available to summarize. Returning empty summary.`)
    console.log()
    return { summary: '' }
  }

  /* Build the prompt, send it to the LLM, and get its response */
  const prompt = buildPrompt(content)
  const response = await llm.invoke(prompt)
  const summary = response.content as string

  /* Log the token counts to show the reduction */
  console.log(`-> Tokens in content: ${tokenCounter.encode(content).length}`)
  console.log(`-> Tokens in summary: ${tokenCounter.encode(summary).length}`)

  console.log(`-> Summary generation complete`)
  console.log()

  return { summary }
}

function buildPrompt(content: string): string {
  return dedent`
    Summarize the following article in 2-3 sentences.
    Focus on the key points and main takeaways.
    Do not include any preamble or explanation, just the summary.

    Article:
    ${content}`
}
