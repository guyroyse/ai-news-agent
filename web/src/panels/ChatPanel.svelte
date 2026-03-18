<script lang="ts">
  import { marked } from 'marked'
  import AppStore from '@stores/app-store.svelte'
  import { fetchArticle } from '@services/api-service'

  const app = AppStore.instance
  const chat = app.chat

  let messagesContainer!: HTMLDivElement
  let inputField!: HTMLInputElement

  $effect(() => {
    // Track messages to trigger scroll and refocus
    chat.messages
    // Scroll to bottom when messages change
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
    // Refocus input after messages change
    if (inputField) {
      inputField.focus()
    }
  })

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      chat.sendMessage()
    }
  }

  async function handleArticleClick(event: MouseEvent): Promise<void> {
    const target = event.target as HTMLElement
    if (target.tagName === 'A') {
      const href = target.getAttribute('href')
      if (href?.startsWith('/article/')) {
        event.preventDefault()
        const id = href.replace('/article/', '')
        const result = await fetchArticle(id)
        if (result.success) {
          await app.activities.addChatArticles([result.article])
        } else {
          await app.activities.addError(`Article not found: ${id}`)
        }
      }
    }
  }

  function renderMarkdown(content: string): string {
    return marked.parse(content, { async: false }) as string
  }
</script>

<aside class="w-160 bg-redis-dusk border-y-4 border-l-4 border-redis-midnight flex flex-col h-full">
  <!-- Header with nuke button -->
  <div class="flex items-center justify-between p-4">
    <h2 class="text-lg font-semibold text-white">Chat</h2>
    <button
      onclick={async () => await chat.clear()}
      class="text-redis-dusk-30 hover:text-redis-hyper-red transition-colors"
      title="Clear chat history"
    >
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </div>

  <!-- Messages area -->
  <div bind:this={messagesContainer} class="flex-1 overflow-y-auto p-4 space-y-3">
    {#if chat.messages.length === 0}
      <p class="text-sm text-redis-dusk-30 text-center mt-4">Ask me about the news!</p>
    {:else}
      {#each chat.messages as message}
        <div class={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
          {#if message.role === 'user'}
            <div class="max-w-[85%] rounded-lg px-3 py-2 text-sm bg-redis-dusk-90 text-white">
              {message.content}
            </div>
          {:else}
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <div
              onclick={handleArticleClick}
              onkeydown={e => e.key === 'Enter' && handleArticleClick(e as unknown as MouseEvent)}
              role="article"
              class="max-w-[85%] rounded-lg px-3 py-2 text-sm bg-redis-midnight text-redis-dusk-30 prose prose-sm prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0"
            >
              {@html renderMarkdown(message.content)}
            </div>
          {/if}
        </div>
      {/each}
      {#if chat.isLoading}
        <div class="flex justify-start">
          <div class="bg-redis-midnight text-redis-dusk-30 rounded-lg px-3 py-2 text-sm">
            <i class="fa-solid fa-spinner fa-spin"></i> Thinking...
          </div>
        </div>
      {/if}
    {/if}
  </div>

  <!-- Input area -->
  <div class="p-4">
    <input
      bind:this={inputField}
      type="text"
      bind:value={chat.inputMessage}
      onkeydown={handleKeydown}
      placeholder="Type a message and press Enter..."
      disabled={chat.isLoading}
      class="w-full bg-redis-midnight text-white placeholder-redis-dusk-30 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-redis-imperial-red disabled:opacity-50"
    />
  </div>
</aside>
