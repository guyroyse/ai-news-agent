<script lang="ts">
  import Button from '@components/buttons/Button.svelte'
  import { fetchBrief, type BriefPeriod } from '@services/api-service'
  import AppStore from '@stores/app-store.svelte'

  const appStore = AppStore.instance

  let loadingPeriod = $state<BriefPeriod | null>(null)

  async function handleBrief(period: BriefPeriod) {
    if (loadingPeriod) return // Prevent multiple simultaneous requests

    loadingPeriod = period
    try {
      const result = await fetchBrief({
        sessionId: appStore.chat.sessionId,
        period
      })

      if (result.success) {
        await appStore.activities.addBrief(result.period, result.brief, result.articleCount)
      } else {
        await appStore.activities.addError(result.error)
      }
    } catch (error) {
      await appStore.activities.addError(String(error))
    } finally {
      loadingPeriod = null
    }
  }
</script>

<div class="flex items-center gap-2">
  <span class="text-sm text-redis-dusk-30">Brief:</span>
  <Button
    icon={loadingPeriod === 'daily' ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-clock'}
    label="24h"
    title="Last 24 hours"
    onclick={() => handleBrief('daily')}
    disabled={loadingPeriod !== null}
  />
  <Button
    icon={loadingPeriod === 'weekly' ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-calendar-week'}
    label="Week"
    title="Last week"
    onclick={() => handleBrief('weekly')}
    disabled={loadingPeriod !== null}
  />
  <Button
    icon={loadingPeriod === 'monthly' ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-calendar'}
    label="Month"
    title="Last month"
    onclick={() => handleBrief('monthly')}
    disabled={loadingPeriod !== null}
  />
</div>
