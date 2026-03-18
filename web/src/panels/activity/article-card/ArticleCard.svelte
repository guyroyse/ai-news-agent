<script lang="ts">
  import type { ArticleActivity } from '@stores/activities-store.svelte'
  import ArticleCardHeader from './ArticleCardHeader.svelte'
  import ArticleCardSummary from './ArticleCardSummary.svelte'
  import ArticleCardDetail from './ArticleCardDetails.svelte'

  type Props = {
    activity: ArticleActivity
  }

  let { activity }: Props = $props()

  const article = $derived(activity.article)
  const timestamp = $derived(activity.timestamp)
  const source = $derived(activity.article.source)
  const content = $derived(activity.article.content)
</script>

<article class="bg-redis-dusk rounded-lg overflow-hidden">
  <ArticleCardHeader {source} {timestamp} />
  <details class="px-4 py-3 group">
    <ArticleCardSummary {article} />
    <ArticleCardDetail {content} />
  </details>
</article>
