<script setup>
  import { AspectRatio } from "@/components/ui/aspect-ratio";
  import { Button } from "@/components/ui/button";
  import { useRouter } from "vue-router";
  import { ref } from "vue";
  const router = useRouter();
  import { defineEmits } from "vue"
  import {random} from 'positivity-api'

  const emits = defineEmits(["login"]);
  const isLogin = ref(false)
  const posi = ref(random())

  const handleLogin = () => {
    console.log("entro a handleLogin")
    isLogin.value = true;
    emits("login", isLogin.value);
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const next = () => {
    posi.value = random()
  }
</script>

<template>
  <div id="app" class="flex flex-col min-h-screen bg-foreground">
    <header class="bg-primary text-accent text-center p-6 md:p-10 fixed top-0 left-0 right-0 z-10 rounded-b-lg">
      <h1 class="text-5xl md:text-8xl font-bold">BodyFit</h1>
    </header>
    <main
      class="flex-1 overflow-auto p-4 md:p-10 space-y-8 mt-20 mb-16"
    >
    <div class="w-full text-center pt-10">
      <AspectRatio :ratio="16 / 9" class="bg-muted rounded w-full ">
        <img
          src="https://web-back.perfectgym.com/sites/default/files/styles/900x/public/equipment%20%286%29.webp?itok=UbaJqjIr"
          alt="Photo by Drew Beamer"
          class="rounded object-cover w-full h-full"
        />
      </AspectRatio>
      <div class="w-full  text-center ">
        <h2 class="text-2xl md:text-3xl font-bold text-accent mb-2 mt-10">
          ¡Únete a BodyFit! 💪
        </h2>

        <p @click="next" class="  pointer-events-auto transition-transform duration-1000 transform hover:scale-105 text-lg md:text-xl text-accent mt-10 bg-green-500 rounded-2xl p-3">
          {{ posi }} 🌟💪
        </p>
      </div>
    </div>
    </main>
    <footer
      class=" fixed bottom-0 left-0 right-0 z-10 bg-primary text-white text-center p-4 rounded-t-lg  "
    >
      <Button @click="handleLogin" class="bg-foreground w-full mb-2 md:mb-4">
        Entrar
      </Button>
      <p class="mb-2">
        ¿No tienes cuenta?, Registrate aqui <span class="emoji">👇</span>
      </p>
      <Button @click="handleRegister" class="bg-foreground w-full">
        Registrarse
      </Button>
    </footer>
  </div>
</template>

<style scoped>
  .emoji {
    font-size: 1.5rem; /* Adjust size as needed */
  }

  /* Media queries for responsiveness */
  @media screen and (min-width: 768px) {
    .text-5xl {
      font-size: 4rem; /* Adjust font size for larger screens */
    }
  }
</style>
