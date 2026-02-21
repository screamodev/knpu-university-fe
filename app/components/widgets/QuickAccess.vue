<script setup lang="ts">
const { t, localePath } = useSafeI18nWithRouter()

const links = [
  { path: '/student/schedule', key: 'quickAccess.schedule' },
  { path: '/student/moodle', key: 'quickAccess.moodle' },
  { path: '/student/email', key: 'quickAccess.email' },
  { path: '/cabinet', key: 'quickAccess.cabinet' },
  { path: '/science/library', key: 'quickAccess.library' },
  { path: '/university/contacts', key: 'quickAccess.map' },
]
</script>

<template>
  <div class="bg-off-white border-b border-border py-5">
    <div class="max-w-container mx-auto px-8 flex gap-3 items-center justify-center flex-wrap">
      <span class="text-xs text-text-muted font-medium tracking-wider uppercase mr-2">{{ t('quickAccess.label') }}</span>
      <NuxtLink
        v-for="link in links"
        :key="link.path"
        :to="localePath(link.path)"
        class="flex items-center gap-1.5 py-2 px-4 bg-white border-[1.5px] border-border rounded-100 text-[13px] font-medium text-navy no-underline transition-all duration-280 hover:border-gold hover:text-gold hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(27,46,75,0.1)]"
      >
        <svg class="w-3.5 h-3.5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        {{ t(link.key) }}
      </NuxtLink>
    </div>
  </div>
</template>
