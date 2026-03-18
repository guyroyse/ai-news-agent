<script lang="ts">
  type Props = {
    summary: string
  }

  let { summary }: Props = $props()
</script>

<p class="text-white">{summary}</p>

