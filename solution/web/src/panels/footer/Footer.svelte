<script lang="ts">
  import AppVersion from './AppVersion.svelte'
  import RedisLogo from './RedisLogo.svelte'
</script>

<footer class="bg-redis-dusk text-white px-6 py-5 flex items-center justify-between">
  <AppVersion />
  <div class="flex items-center gap-2">
    <span class="px-2 py-0.5 text-xs rounded-full bg-redis-violet text-redis-midnight">Topics</span>
    <span class="px-2 py-0.5 text-xs rounded-full bg-redis-sky-blue text-redis-midnight">People</span>
    <span class="px-2 py-0.5 text-xs rounded-full bg-redis-hyper text-white">Organizations</span>
    <span class="px-2 py-0.5 text-xs rounded-full bg-redis-yellow text-redis-midnight">Locations</span>
  </div>
  <RedisLogo />
</footer>
