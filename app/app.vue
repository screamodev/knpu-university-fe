<template>
  <div class="font-geologica text-navy antialiased min-h-screen flex flex-col">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <SharedToastContainer />
  </div>
</template>

<style>
/*
 * Горизонтальне переповнення ріжемо на кореневому елементі, а не на обгортці макета: `overflow`
 * на обгортці робить її контейнером прокручування, і липка шапка (а з нею й липкі вкладки
 * підрозділів) перестає триматися екрана під час гортання.
 */
html {
  overflow-x: hidden;
}
</style>
