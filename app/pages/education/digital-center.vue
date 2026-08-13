<script setup lang="ts">
import type { StructureUnitContacts } from '~/utils/structureContent'

/**
 * Центр цифровізації освіти.
 *
 * Laid out like a кафедра page, which is what the client asked for after the first pass: the
 * legacy body with its drop-downs on the left, the contacts card and «Оголошення» beside it,
 * and the centre's news at the bottom. The instructions and forms that used to sit here as a
 * `documents` table are back inside the drop-downs where the old site kept them — the rows stay
 * in Directus so an editor can bring the list back.
 */
definePageMeta({ layout: 'default' })

const { t, localePath } = useSafeI18nWithRouter()

useHead({
  title: () => t('nav.links.digitalCenter'),
  meta: [{ name: 'description', content: () => t('education.digitalCenter.subtitle') }],
})

/** Own category, seeded by `migration/digital-center/2_news.py` together with the archive. */
const NEWS_CATEGORY_SLUG = 'centr-cyfrovizaciyi-osvity'

/** Rectorate calendar, embedded on the legacy page with the same parameters. */
const CALENDAR_EMBED_URL
  = 'https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff'
    + '&ctz=Europe%2FKiev&showTitle=0&showCalendars=0'
    + '&src=cmVjdG9yYXRfaG5wdUBobnB1LmVkdS51YQ&color=%23616161'

/** Order the centre asked to keep one click away, mirrored into Directus by the documents pass. */
const TELEGRAM_ORDER_FILE_ID = 'ab503b4a-67b4-4aa0-8d9d-e0368873c3ae'

const { assetUrl } = useDirectus()
const orderUrl = computed(() => assetUrl(TELEGRAM_ORDER_FILE_ID) ?? '')

// `SharedLinkTileGrid` prints the label as given, so translate here.
const tiles = computed<LinkTile[]>(() => [
  { label: t('education.digitalCenter.tiles.moodle'), url: MOODLE_EXTERNAL_URL, icon: 'book' },
  { label: t('education.digitalCenter.tiles.support'), url: 'mailto:support@hnpu.edu.ua', icon: 'link' },
  { label: t('education.digitalCenter.tiles.centre'), url: 'mailto:cdo@hnpu.edu.ua', icon: 'link' },
])

/**
 * The centre is not a structure unit, so its contacts are literal here rather than coming from
 * `app/content/structure/manifest.json`. Its head is vacant — the client asked to leave it out.
 */
const contacts = computed<StructureUnitContacts>(() => ({
  address: t('education.digitalCenter.address'),
  addressEn: t('education.digitalCenter.address'),
  email: 'cdo@hnpu.edu.ua',
}))
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-b from-navy-deep to-navy py-16">
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-gold/90 mb-3">
          {{ t('education.digitalCenter.tag') }}
        </div>
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-white">
          {{ t('education.digitalCenter.title') }}
        </h1>
        <p class="mt-4 text-white/70 max-w-2xl">
          {{ t('education.digitalCenter.subtitle') }}
        </p>
      </div>
    </div>

    <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SharedLinkTileGrid :tiles="tiles" :columns="3" />

      <div class="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <a
            :href="orderUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 mb-8 px-5 py-3 rounded-12 bg-gold-pale/60 border border-gold/50 text-navy font-semibold no-underline hover:bg-gold-pale transition-colors duration-280"
          >
            <span aria-hidden>📄</span>
            {{ t('education.digitalCenter.orderButton') }}
            <span class="sr-only">{{ t('common.opensInNewTab') }}</span>
          </a>

          <SharedStaticPageBody slug="digital-center" />

          <section class="mt-12">
            <h2 class="font-playfair text-xl font-bold text-navy mb-2">
              {{ t('education.digitalCenter.calendarTitle') }}
            </h2>
            <p class="text-body-sm text-text-muted mb-4">
              {{ t('education.digitalCenter.calendarNote') }}
            </p>
            <!-- Not part of the body: the article sanitizer only keeps video embeds. -->
            <div class="rounded-12 border border-border overflow-hidden">
              <iframe
                :src="CALENDAR_EMBED_URL"
                :title="t('education.digitalCenter.calendarTitle')"
                class="w-full h-[520px] block"
                loading="lazy"
                frameborder="0"
              />
            </div>
          </section>
        </div>

        <aside class="self-start lg:sticky lg:top-[88px] flex flex-col gap-4">
          <SharedStructureUnitContacts :contacts="contacts" kind="department" />
          <SharedStructureUnitAnnouncements :unit-category-slug="NEWS_CATEGORY_SLUG" />
        </aside>
      </div>

      <section class="py-12 mt-4 border-t border-border">
        <div class="flex flex-wrap items-end justify-between gap-4 mb-6">
          <h2 class="font-playfair text-xl font-bold text-navy">
            {{ t('education.digitalCenter.newsTitle') }}
          </h2>
          <NuxtLink
            :to="localePath({ path: '/news', query: { category: NEWS_CATEGORY_SLUG } })"
            class="text-sm font-medium text-navy no-underline hover:text-gold transition-colors duration-280"
          >
            {{ t('education.digitalCenter.newsViewAll') }} →
          </NuxtLink>
        </div>
        <SharedStructureUnitNews
          :category-slug="NEWS_CATEGORY_SLUG"
          :limit="3"
          hide-all-link
        />
      </section>
    </div>
  </div>
</template>
