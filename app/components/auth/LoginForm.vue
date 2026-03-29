<script setup lang="ts">
const { t } = useSafeI18nWithRouter()
const { login, loginPending, loginError, clearLoginError } = useAuth()

const identifier = ref('')
const password = ref('')

async function onSubmit(): Promise<void> {
  const id = identifier.value.trim()
  if (!id || !password.value) return
  await login(id, password.value)
}

function onFieldInput(): void {
  if (loginError.value) clearLoginError()
}
</script>

<template>
  <form class="flex flex-col gap-5" novalidate @submit.prevent="onSubmit">
    <div class="flex flex-col gap-2">
      <label for="login-identifier" class="text-sm font-medium text-navy font-geologica">
        {{ t('auth.identifier') }}
      </label>
      <input
        id="login-identifier"
        v-model="identifier"
        type="text"
        name="identifier"
        autocomplete="username"
        required
        class="w-full py-3 px-4 rounded-[12px] border border-border bg-white text-navy font-geologica text-body outline-none transition-[border-color,box-shadow] duration-280 focus:border-gold focus:ring-2 focus:ring-gold/35 focus:ring-offset-0 disabled:opacity-60"
        :disabled="loginPending"
        @input="onFieldInput"
      >
    </div>
    <div class="flex flex-col gap-2">
      <label for="login-password" class="text-sm font-medium text-navy font-geologica">
        {{ t('auth.password') }}
      </label>
      <input
        id="login-password"
        v-model="password"
        type="password"
        name="password"
        autocomplete="current-password"
        required
        class="w-full py-3 px-4 rounded-[12px] border border-border bg-white text-navy font-geologica text-body outline-none transition-[border-color,box-shadow] duration-280 focus:border-gold focus:ring-2 focus:ring-gold/35 focus:ring-offset-0 disabled:opacity-60"
        :disabled="loginPending"
        @input="onFieldInput"
      >
    </div>
    <div
      v-if="loginError"
      class="rounded-[12px] border border-border bg-gold-pale/40 px-4 py-3 text-sm text-navy-deep font-geologica"
      role="alert"
    >
      {{ loginError }}
    </div>
    <button
      type="submit"
      class="mt-1 inline-flex items-center justify-center gap-2 bg-gold text-navy-deep border-none py-3 px-5 rounded-lg text-[15px] font-semibold font-geologica transition-all duration-280 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold disabled:opacity-70 disabled:pointer-events-none disabled:translate-y-0"
      :disabled="loginPending || !identifier.trim() || !password"
    >
      <span
        v-if="loginPending"
        class="inline-block size-4 shrink-0 rounded-full border-2 border-navy-deep/25 border-t-navy-deep animate-spin"
        aria-hidden="true"
      />
      {{ loginPending ? t('auth.submitting') : t('auth.submit') }}
    </button>
  </form>
</template>
