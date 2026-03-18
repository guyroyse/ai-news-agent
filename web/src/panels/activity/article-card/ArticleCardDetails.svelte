<script lang="ts">
  import { marked, Renderer } from 'marked'

  type Props = {
    content: string
  }

  let { content }: Props = $props()

  // Custom renderer to open links in new window
  const renderer = new Renderer()
  renderer.link = ({ href, text }) => {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
  }

  const renderedContent = $derived.by(() => {
    return marked.parse(content, { renderer }) as string
  })
</script>

<div class="prose prose-sm prose-invert mt-2">
  {@html renderedContent}
</div>
