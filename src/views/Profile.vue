<script setup>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import FooterMenu from "@/components/FooterMenu.vue";
import { useRouter } from "vue-router";

const user = ref(null);
const loading = ref(true);
const router = useRouter();
const auth = getAuth()

onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;
    } else {
      user.value = null;
    }
    loading.value = false;
  });
  
  // Cleanup subscription on unmount
  return () => unsubscribe();
});

const logout = () => {
    signOut(auth).then(() => {
              localStorage.setItem("email", user.email);
              router.push("/")
    });
}

</script>

<template>
  <div id="app" class="flex flex-col min-h-screen bg-foreground">
    <header class="bg-primary text-accent text-center p-6 md:p-10 rounded-b-lg">
      <h1 class="text-5xl md:text-8xl font-bold">Profile</h1>
    </header>
    <main class="flex-1 flex flex-col items-center justify-start p-4 md:p-10 space-y-8">
      <div class="w-full max-w-md text-center">
        <div v-if="loading" class="text-lg text-muted">Cargando...</div>
        <div v-else>
          <div v-if="user">
            
            <p class="text-lg text-muted mb-2">Email: {{ user.email }}</p>
            <Button @click="logout" class="text-lg text-muted mb-2">Salir</Button>
           
          </div>
          <div v-else>
            <p class="text-lg text-muted">No estás autenticado.</p>
          </div>
        </div>
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
