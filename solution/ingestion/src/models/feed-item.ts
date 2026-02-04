// Raw data from RSS feed - input to the workflow
export type FeedItem = {
  feedTitle: string
  feedLink: string
  title: string
  content: string
  pubDate: string
  link: string
  html: string | undefined
}
