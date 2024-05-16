<script setup>
  import { AspectRatio } from "@/components/ui/aspect-ratio";
  import { Button } from "@/components/ui/button";
  import { useRouter } from "vue-router";
  const router = useRouter();

  const handleRegister = () => {
    router.push("/register");
  }

</script>

<template>
  <div id="app" class="flex flex-col min-h-screen bg-foreground">
    <header class="bg-primary text-accent text-center p-6 md:p-10 rounded-b-lg">
      <h1 class="text-5xl md:text-8xl font-bold">BodyFit</h1>
    </header>
    <main
      class="flex-1 flex flex-col items-center justify-start p-4 md:p-10 space-y-8"
    >
      <AspectRatio :ratio="16 / 9" class="bg-muted rounded w-full max-w-md">
        <img
          src="https://web-back.perfectgym.com/sites/default/files/styles/900x/public/equipment%20%286%29.webp?itok=UbaJqjIr"
          alt="Photo by Drew Beamer"
          class="rounded object-cover w-full h-full"
        />
      </AspectRatio>
      <div class="w-full max-w-md text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-accent mb-2">
          ¡Únete a BodyFit! 💪
        </h2>
        <p class="text-lg md:text-xl text-muted mb-4">
          Mejora tu físico y tu salud con nuestro programa personalizado. 🏋️‍♀️
        </p>
        <p class="text-lg md:text-xl text-muted mb-8">
          Accede a los mejores entrenadores y rutinas. 🌟
        </p>
        <p class="text-lg md:text-xl text-muted">
          Transforma tu vida hoy con BodyFit. 🌟💪
        </p>
      </div>
    </main>
    <footer
      class="bg-primary text-white text-center p-4 rounded-t-lg w-full max-w-md"
    >
      <Button @click="handleLogin" class="bg-foreground w-full mb-2 md:mb-4"> Entrar </Button>
      <p class="mb-2">¿No tienes cuenta?, Registrate aqui <span class="emoji">👇</span></p>
      <Button @click="handleRegister" class="bg-foreground w-full"> Registrarse </Button>
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
