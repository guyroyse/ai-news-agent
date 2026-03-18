<script lang="ts">
  import type { SearchedArticle } from '@services/api-service'
  import SortedChipList from '@components/chips/SortedChipList.svelte'

  type Props = {
    article: SearchedArticle
  }

  let { article }: Props = $props()

  const title = $derived(article.title)
  const link = $derived(article.link)
  const topics = $derived(article.topics)
  const people = $derived(article.namedEntities.people)
  const organizations = $derived(article.namedEntities.organizations)
  const locations = $derived(article.namedEntities.locations)
  const content = $derived(article.content)

  const publicationDate = $derived.by(() => {
    const date = new Date(article.publicationDate * 1000)
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
  })
</script>

<summary class="cursor-pointer list-none space-y-1">
  <h3 class="font-medium text-redis-white">
    <a href={link} target="_blank" rel="noopener noreferrer" class="hover:text-redis-hyper">
      {title}
    </a>
  </h3>
  <time class="text-xs text-redis-dusk-30">
    <i class="fa-solid fa-calendar-day mr-1"></i>
    {publicationDate}
  </time>

  <SortedChipList {topics} {people} {organizations} {locations} class="mt-2 mb-2" />

  <p class="text-sm text-redis-dusk-30 line-clamp-3 group-open:hidden">
    {content}
  </p>
</summary>
