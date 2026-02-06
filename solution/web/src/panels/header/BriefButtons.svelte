<script lang="ts">
  import Button from '@components/buttons/Button.svelte'

  function handleDailyBrief() {
    console.log('Daily brief clicked')
    // TODO: Call brief API
  }

  function handleWeeklyBrief() {
    console.log('Weekly brief clicked')
    // TODO: Call brief API
  }

  function handleMonthlyBrief() {
    console.log('Monthly brief clicked')
    // TODO: Call brief API
  }
</script>

<div class="flex items-center gap-2">
  <span class="text-sm text-redis-dusk-30">Brief:</span>
  <Button icon="fa-solid fa-clock" label="24h" title="Last 24 hours" onclick={handleDailyBrief} />
  <Button icon="fa-solid fa-calendar-week" label="Week" title="Last week" onclick={handleWeeklyBrief} />
  <Button icon="fa-solid fa-calendar" label="Month" title="Last month" onclick={handleMonthlyBrief} />
</div>

