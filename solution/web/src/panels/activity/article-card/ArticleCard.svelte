<script lang="ts">
  import type { ArticleActivity } from '@stores/activities-store.svelte'

  type Props = {
    activity: ArticleActivity
  }

  let { activity }: Props = $props()

  function formatDateTime(date: Date): string {
    return date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  }
</script>

<article class="bg-redis-dusk rounded-lg overflow-hidden">
  <header class="flex items-center justify-between px-4 py-3 bg-redis-dusk-90">
    <div class="flex items-center gap-2">
      <i class="fa-solid fa-newspaper text-redis-sky-blue"></i>
      <span class="font-medium text-redis-white">{activity.article.source}</span>
    </div>
    <time class="text-sm text-redis-dusk-30">{formatDateTime(activity.timestamp)}</time>
  </header>
  <div class="px-4 py-3 space-y-2">
    <h3 class="font-medium text-redis-white">
      <a href={activity.article.link} target="_blank" rel="noopener noreferrer" class="hover:text-redis-hyper">
        {activity.article.title}
      </a>
    </h3>
    <p class="text-sm text-redis-dusk-30 line-clamp-3">
      {activity.article.content}
    </p>
  </div>
</article>

