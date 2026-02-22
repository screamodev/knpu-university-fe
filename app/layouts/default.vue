<template>
  <div class="flex flex-col min-h-screen">
    <FeaturesUtilityBar />
    <WidgetsAppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <WidgetsAppFooter />
    <FeaturesSearchOverlay />
    <FeaturesMobileNav />
  </div>
</template>
