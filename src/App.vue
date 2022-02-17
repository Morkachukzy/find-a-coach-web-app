<template>
  <the-header></the-header>
  <router-view v-slot='{ Component }'>
    <transition name='route' mode='out-in'>
      <component :is='Component'></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader';

export default {
  name: 'App',
  components: {
    TheHeader
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.route-enter-active {
  animation: fade .2s ease;
}

.route-leave-active {
  animation: fade .2s ease reverse;
}


* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>