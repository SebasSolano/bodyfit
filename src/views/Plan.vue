<script setup>
import FooterMenu from "@/components/FooterMenu.vue";
</script>

<template>
  <div id="app" class="flex flex-col min-h-screen bg-foreground">
    <header class="bg-primary text-accent text-center p-6 md:p-10 rounded-b-lg">
      <h1 class="text-5xl md:text-8xl font-bold">Plan</h1>
    </header>
    <main class="flex-1 flex flex-col items-center justify-start p-4 md:p-10 space-y-8">
      <div class="w-full max-w-md text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-accent mb-2">
          ¡Plan! 💪
        </h2>
      </div>
    </main>
    <footer>
      <FooterMenu />
    </footer>
  </div>
</template>

<style scoped>
.emoji {
  font-size: 1.5rem; /* Adjust size as needed */
}



@media screen and (min-width: 768px) {
  .text-5xl {
    font-size: 4rem; /* Adjust font size for larger screens */
  }
}
</style>
