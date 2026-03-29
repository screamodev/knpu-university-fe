<template>
  <div class="flex flex-col min-h-screen overflow-x-hidden">
    <FeaturesUtilityBar />
    <WidgetsAppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <WidgetsAppFooter />
    <FeaturesMobileNav />
  </div>
</template>
