import dedent from 'dedent'

import type { ArticleState } from '@root/state'
import { fetchLLM } from '@adapters'

const llm = fetchLLM()

export async function summarizer(state: ArticleState): Promise<Partial<ArticleState>> {
  const { content } = state

  if (!content) {
    console.log(`No content available to summarize`)
    return { summary: '' }
  }

  const prompt = buildPrompt(content)
  const response = await llm.invoke(prompt)
  const summary = response.content as string

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
