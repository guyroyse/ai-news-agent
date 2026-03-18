<script lang="ts">
  import type { ArticleSummary } from '@services/api-service'
  import ArticleDetails from './ArticleDetails.svelte'

  type Props = {
    source: string
    articles: ArticleSummary[]
  }

  let { source, articles }: Props = $props()
</script>

<details class="group">
  <summary class="flex items-center gap-2 cursor-pointer py-1 text-redis-sky-blue hover:text-white list-none">
    <i class="fa-solid fa-chevron-right text-xs transition-transform group-open:rotate-90"></i>
    <span>{source}</span>
    <span class="text-redis-dusk-50">({articles.length})</span>
  </summary>
  <div class="ml-4 border-l border-redis-dusk-70 pl-3">
    {#each articles as article}
      <ArticleDetails {article} />
    {/each}
  </div>
</details>

