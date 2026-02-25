<script lang="ts">
  import AppStore from '@stores/app-store.svelte'
  import IngestCard from './ingest-card/IngestCard.svelte'
  import ErrorCard from './ErrorCard.svelte'
  import ArticleCard from './article-card/ArticleCard.svelte'
  import NoArticlesFoundCard from './article-card/NoArticlesFoundCard.svelte'
  import BriefCard from './brief-card/BriefCard.svelte'

  const appStore = AppStore.instance
</script>

<div class="space-y-4">
  {#each appStore.activities.activities as activity}
    {#if activity.type === 'ingest'}
      <IngestCard {activity} />
    {:else if activity.type === 'error'}
      <ErrorCard {activity} />
    {:else if activity.type === 'article'}
      <ArticleCard {activity} />
    {:else if activity.type === 'no-articles-found'}
      <NoArticlesFoundCard {activity} />
    {:else if activity.type === 'brief'}
      <BriefCard {activity} />
    {/if}
  {/each}
</div>
