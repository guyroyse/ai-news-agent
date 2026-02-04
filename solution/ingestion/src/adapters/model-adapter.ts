import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { encoding_for_model, type Tiktoken } from 'tiktoken'

import { config } from '@root/config'

const MODEL_NAME = 'gpt-4o-mini'
const LARGE_MODEL_NAME = 'gpt-4o'
const EMBEDDING_MODEL_NAME = 'text-embedding-3-small'

let llmInstance: ChatOpenAI | null = null
let largeLLMInstance: ChatOpenAI | null = null
let embedderInstance: OpenAIEmbeddings | null = null
let encodingInstance: Tiktoken | null = null

export function fetchLLM(): ChatOpenAI {
  if (!llmInstance)
    llmInstance = new ChatOpenAI({
      modelName: MODEL_NAME,
      temperature: 0.3,
      apiKey: config.openAiApiKey
    })

  return llmInstance
}

export function fetchLargeLLM(): ChatOpenAI {
  if (!largeLLMInstance)
    largeLLMInstance = new ChatOpenAI({
      modelName: LARGE_MODEL_NAME,
      temperature: 0.3,
      apiKey: config.openAiApiKey
    })
  return largeLLMInstance
}

export function fetchEmbedder(): OpenAIEmbeddings {
  if (!embedderInstance)
    embedderInstance = new OpenAIEmbeddings({
      modelName: EMBEDDING_MODEL_NAME,
      apiKey: config.openAiApiKey
    })

  return embedderInstance
}

export function fetchTokenCounter(): Tiktoken {
  if (!encodingInstance) encodingInstance = encoding_for_model(MODEL_NAME)

  return encodingInstance
}
