<script lang="ts">
  import type { ErrorActivity } from '@stores/activities-store.svelte'

  type Props = {
    activity: ErrorActivity
  }

  let { activity }: Props = $props()

  function formatDateTime(isoString: string): string {
    return new Date(isoString).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }
</script>

<article class="bg-redis-dusk rounded-lg overflow-hidden">
  <header class="flex items-center justify-between px-4 py-3 bg-redis-dusk-90">
    <div class="flex items-center gap-2">
      <i class="fa-solid fa-circle-exclamation text-red-500"></i>
      <span class="font-medium text-redis-white">Error</span>
    </div>
    <time class="text-sm text-redis-dusk-30">{formatDateTime(activity.timestamp)}</time>
  </header>
  <div class="px-4 py-3 text-sm text-red-400">
    {activity.message}
  </div>
</article>
