<script lang="ts">
  import type { ErrorActivity } from '@states/activities-state.svelte'

  type Props = {
    activity: ErrorActivity
  }

  let { activity }: Props = $props()

  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  }
</script>

<article class="bg-redis-dusk rounded-lg overflow-hidden">
  <header class="flex items-center justify-between px-4 py-3 bg-redis-dusk-90">
    <div class="flex items-center gap-2">
      <i class="fa-solid fa-circle-exclamation text-red-500"></i>
      <span class="font-medium text-redis-white">Error</span>
    </div>
    <time class="text-sm text-redis-dusk-30">{formatTime(activity.timestamp)}</time>
  </header>
  <div class="px-4 py-3 text-sm text-red-400">
    {activity.message}
  </div>
</article>

