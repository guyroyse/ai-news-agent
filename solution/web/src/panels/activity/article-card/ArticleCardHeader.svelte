<script lang="ts">
  type Props = {
    source: string
    timestamp: string
  }

  let { source, timestamp }: Props = $props()

  function formatActivityTime(isoString: string): string {
    return new Date(isoString).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }
</script>

<header class="flex items-center justify-between px-4 py-3 bg-redis-dusk-90">
  <div class="flex items-center gap-2">
    <i class="fa-solid fa-newspaper text-redis-white"></i>
    <span class="font-medium text-redis-white">{source}</span>
  </div>
  <time class="text-sm text-redis-dusk-30">{formatActivityTime(timestamp)}</time>
</header>
