<script setup lang="ts">
const { t, localePath } = useSafeI18nWithRouter()
const {
  sessionResolving,
  sessionMeError,
  showProfile,
  showSignIn,
  displayName,
  initials,
  retryFetchMe,
} = useAuthSessionUi()
</script>

<template>
  <div class="flex items-center shrink-0">
    <div
      v-if="sessionResolving"
      class="flex items-center gap-2 py-0.5"
      :aria-busy="true"
      :aria-label="t('auth.sessionResolving')"
    >
      <span class="inline-block size-[26px] rounded-full bg-white/15 animate-pulse" />
      <span class="hidden sm:inline-block h-3.5 w-20 rounded bg-white/15 animate-pulse" />
    </div>
    <div
      v-else-if="showProfile"
      class="flex items-center"
    >
      <NuxtLink
        :to="localePath('/profile')"
        class="group flex items-center gap-2 max-w-[200px] rounded-lg py-1 pl-1 pr-2.5 no-underline border border-white/25 bg-white/5 hover:border-gold hover:bg-white/10 transition-all duration-280"
        :title="displayName"
      >
        <span
          class="shrink-0 size-[26px] rounded-full bg-gold/90 text-navy-deep flex items-center justify-center text-[10px] font-bold font-geologica shadow-sm"
          aria-hidden="true"
        >
          {{ initials }}
        </span>
        <span
          class="hidden sm:inline text-[12.5px] font-semibold font-geologica text-white/90 group-hover:text-gold-light truncate"
        >
          {{ displayName }}
        </span>
      </NuxtLink>
    </div>
    <div
      v-else-if="sessionMeError"
      class="flex items-center gap-2 max-w-[min(100%,220px)]"
      role="status"
    >
      <span class="hidden sm:inline text-[10.5px] leading-tight text-warning/95 font-geologica">
        {{ t('auth.sessionMeError') }}
      </span>
      <button
        type="button"
        class="inline-flex items-center rounded-lg border border-gold/70 bg-gold/15 px-2.5 py-1 text-[10.5px] font-bold font-geologica text-gold-light hover:bg-gold/25 transition-colors duration-280 shrink-0"
        @click="retryFetchMe"
      >
        {{ t('auth.retry') }}
      </button>
    </div>
    <NuxtLink
      v-else-if="showSignIn"
      :to="localePath('/login')"
      class="inline-flex items-center gap-2 rounded-lg bg-gold text-navy-deep no-underline py-1.5 px-3.5 sm:px-4 text-[11.5px] sm:text-xs font-bold font-geologica tracking-wide shadow-sm border border-gold-light/80 hover:bg-gold-light hover:-translate-y-px hover:shadow-md transition-all duration-280"
    >
      <svg class="w-3.5 h-3.5 shrink-0 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
      </svg>
      <span>{{ t('auth.loginCta') }}</span>
    </NuxtLink>
  </div>
</template>
