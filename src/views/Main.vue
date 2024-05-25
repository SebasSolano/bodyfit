<script setup>
  import { ref, onMounted } from "vue";
  import FooterMenu from "@/components/FooterMenu.vue";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from '@/components/ui/button'

  const articles = ref([]);

  const API_KEY = "ca0f16c4997a4872afcc693883c112a4";
  const searchQuery = "gym";
  const language = "es";
  const pageSize = 3
  const url = `https://newsapi.org/v2/everything?q=${searchQuery}&language=${language}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  onMounted(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        articles.value = data.articles;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
</script>

<template>
  <div id="app" class="flex flex-col min-h-screen bg-foreground">
    <header
      class="bg-primary text-accent text-center p-6 md:p-10 fixed top-0 left-0 right-0 z-10"
    >
      <h1 class="text-5xl md:text-8xl font-bold"> Noticias 💪</h1>
    </header>
    <main class="flex-1 overflow-auto p-4 md:p-10 space-y-8 mt-20 mb-16">
      <div class="w-full max-w-md text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-accent mb-2">
         
        </h2>
      </div>
      <div class="w-full max-w-md grid gap-4 pb-10">
        <Card v-for="article in articles" :key="article.url" class="bg-primary text-accent">
          <CardHeader>
            <img
              :src="article.urlToImage"
              alt="Article Image"
              class="w-full h-32 object-cover rounded-t-lg"
            />
            <CardTitle>{{ article.title }}</CardTitle>
          </CardHeader>
          <CardFooter>
            <a :href="article.url" target="_blank" class=" bg-foreground p-2 rounded-lg"
              >Ver mas</a
            >
          </CardFooter>
        </Card>
      </div>
    </main>
    <footer class="fixed bottom-0 left-0 right-0 z-10">
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

  /* Custom styles to ensure main content has scroll */
  main {
    max-height: calc(
      100vh - 4rem - 4rem
    ); /* Adjust based on your header and footer heights */
    overflow-y: auto;
  }
</style>
