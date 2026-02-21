<template>
  <div>
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
