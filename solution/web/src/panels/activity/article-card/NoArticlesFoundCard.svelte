<script lang="ts">
  import type { NoArticlesFoundActivity } from '@stores/activities-store.svelte'

  type Props = {
    activity: NoArticlesFoundActivity
  }

  let { activity }: Props = $props()

  function formatDateTime(date: Date): string {
    return date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  }
</script>

<article class="bg-redis-dusk rounded-lg overflow-hidden">
  <header class="flex items-center justify-between px-4 py-3 bg-redis-dusk-90">
    <div class="flex items-center gap-2">
      <i class="fa-solid fa-magnifying-glass text-redis-dusk-50"></i>
      <span class="font-medium text-redis-white">No Articles Found</span>
    </div>
    <time class="text-sm text-redis-dusk-30">{formatDateTime(activity.timestamp)}</time>
  </header>
  <div class="px-4 py-3 text-sm text-redis-dusk-30">
    No articles matched your search criteria.
  </div>
</article>

