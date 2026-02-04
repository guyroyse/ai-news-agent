import { ChatOpenAI } from '@langchain/openai'

import { config } from '@root/config'

export function fetchLLM(): ChatOpenAI {
  return new ChatOpenAI({
    modelName: 'gpt-4o-mini',
    temperature: 0.3,
    apiKey: config.openAiApiKey
  })
}
