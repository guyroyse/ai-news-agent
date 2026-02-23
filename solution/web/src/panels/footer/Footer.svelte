<script lang="ts">
  import AppVersion from './AppVersion.svelte'
  import RedisLogo from './RedisLogo.svelte'
  import TagChip from '@components/chips/TagChip.svelte'
  import { TagType } from '@components/chips/chip-types'
</script>

<footer class="bg-redis-dusk text-white px-6 py-5 flex items-center justify-between">
  <AppVersion />
  <div class="flex items-center gap-2">
    <TagChip tag="Topics" type={TagType.Topics} />
    <TagChip tag="People" type={TagType.People} />
    <TagChip tag="Organizations" type={TagType.Organizations} />
    <TagChip tag="Locations" type={TagType.Locations} />
  </div>
  <RedisLogo />
</footer>
