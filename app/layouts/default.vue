<template>
  <!--
    Обгортка без `overflow`: будь-який `overflow` тут робить її контейнером прокручування, і
    `position: sticky` у шапці (та у вкладках підрозділів) перестає працювати. Горизонтальне
    переповнення ріжеться на рівні `html` — див. app.vue.
  -->
  <div class="flex flex-col min-h-screen">
    <FeaturesUtilityBar />
    <WidgetsAppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <WidgetsAppFooter />
    <FeaturesMobileNav />
    <FeaturesSearchOverlay />
  </div>
</template>
