<script setup lang="ts">
/**
 * Collapsible section, built on `<details>` so it works without JavaScript and stays keyboard
 * accessible for free.
 *
 * The long legacy lists this site inherited — сертифікати про акредитацію, анкети моніторингу,
 * контингент за роками — are unreadable as flat lists, so they are grouped and collapsed with
 * this. Pages that only need a static disclosure used a raw `<details>` before; this is that
 * markup with the site's styling in one place.
 */
withDefaults(
  defineProps<{
    title: string
    /** Small note next to the title, e.g. how many items are inside. */
    hint?: string | null
    open?: boolean
  }>(),
  { hint: null, open: false },
)
</script>

<template>
  <details
    class="group border border-border rounded-12 bg-white overflow-hidden [&[open]]:border-gold/60"
    :open="open"
  >
    <summary
      class="flex items-center gap-3 px-5 py-4 cursor-pointer list-none marker:hidden
             hover:bg-off-white transition-colors duration-280"
    >
      <svg
        class="w-4 h-4 shrink-0 text-gold transition-transform duration-280 group-open:rotate-90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
      <span class="font-playfair text-lg font-semibold text-navy flex-1">{{ title }}</span>
      <span v-if="hint" class="text-body-sm text-text-muted whitespace-nowrap">{{ hint }}</span>
    </summary>

    <div class="px-5 pb-5 pt-1 border-t border-border">
      <slot />
    </div>
  </details>
</template>

<style scoped>
/* Safari still paints the default disclosure triangle without this. */
summary::-webkit-details-marker {
  display: none;
}
</style>
