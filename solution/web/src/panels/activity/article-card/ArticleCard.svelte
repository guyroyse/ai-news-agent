<script lang="ts">
  import { marked, Renderer } from 'marked'
  import type { ArticleActivity } from '@stores/activities-store.svelte'

  type Props = {
    activity: ArticleActivity
  }

  let { activity }: Props = $props()

  function formatDateTime(date: Date): string {
    return date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  }

  // Custom renderer to open links in new window
  const renderer = new Renderer()
  renderer.link = ({ href, text }) => {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
  }

  const renderedContent = $derived(marked.parse(activity.article.content, { renderer }) as string)
</script>

<article class="bg-redis-dusk rounded-lg overflow-hidden">
  <header class="flex items-center justify-between px-4 py-3 bg-redis-dusk-90">
    <div class="flex items-center gap-2">
      <i class="fa-solid fa-newspaper text-redis-sky-blue"></i>
      <span class="font-medium text-redis-white">{activity.article.source}</span>
    </div>
    <time class="text-sm text-redis-dusk-30">{formatDateTime(activity.timestamp)}</time>
  </header>
  <details class="px-4 py-3 group">
    <summary class="cursor-pointer list-none space-y-2">
      <h3 class="font-medium text-redis-white">
        <a href={activity.article.link} target="_blank" rel="noopener noreferrer" class="hover:text-redis-hyper">
          {activity.article.title}
        </a>
      </h3>
      <p class="text-sm text-redis-dusk-30 line-clamp-3 group-open:hidden">
        {activity.article.content}
      </p>
    </summary>
    <div class="prose prose-sm prose-invert mt-2">
      {@html renderedContent}
    </div>
  </details>
</article>
