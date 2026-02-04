export type ArticleSource = {
  title: string
  link: string
}

// Enriched article after AI processing - output from the workflow
export type Article = {
  title: string
  link: string
  publicationDate: string
  source: ArticleSource
  content: string
  summary: string
}
