<script lang="ts">
  import { marked, Renderer } from 'marked'
  import type { BriefActivity } from '@stores/activities-store.svelte'

  type Props = {
    activity: BriefActivity
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

  function periodLabel(period: string): string {
    switch (period) {
      case 'daily':
        return 'Last 24 Hours'
      case 'weekly':
        return 'Last Week'
      case 'monthly':
        return 'Last Month'
      default:
        return period
    }
  }

  // Custom renderer to open links in new window
  const renderer = new Renderer()
  renderer.link = ({ href, text }) => {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
  }

  const renderedContent = $derived(marked.parse(activity.brief, { renderer }) as string)
</script>

<article class="bg-redis-dusk rounded-lg overflow-hidden">
  <header class="flex items-center justify-between px-4 py-3 bg-redis-dusk-90">
    <div class="flex items-center gap-2">
      <i class="fa-solid fa-bolt text-redis-white"></i>
      <span class="font-medium text-redis-white">
        {periodLabel(activity.period)} Brief
      </span>
      <span class="text-sm text-redis-dusk-30">
        ({activity.articleCount} article{activity.articleCount === 1 ? '' : 's'})
      </span>
    </div>
    <time class="text-sm text-redis-dusk-30">{formatDateTime(activity.timestamp)}</time>
  </header>
  <div class="px-4 py-3 prose prose-sm prose-invert max-w-none">
    {@html renderedContent}
  </div>
</article>
