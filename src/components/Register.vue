<script setup>
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { useRouter } from "vue-router";
  import { ref, watch } from "vue";
  import { defineEmits } from "vue";

  const props = defineProps({
    title: String,
    description: String,
  });

  const emits = defineEmits(["login"]);

  const router = useRouter();

  const email = ref("");
  const isLogin = ref(false);

  const backPage = () => {
    if (!localStorage.getItem("email")) {
      console.log("entro 1");
      localStorage.removeItem("email");
      emits("login", { isLogin: isLogin.value, email: email.value });
      router.push("/");
    } else {
      //router.push("/login");
      console.log("entro 2");
      localStorage.removeItem("email");
      isLogin.value = true;
      emits("login", { isLogin: isLogin.value, email: email.value });
      router.push("/");
    }
  };
</script>

<template>
  <div id="app" class="flex flex-col min-h-screen bg-foreground">
    <header class="bg-primary text-accent text-left p-4 md:p-10 rounded-b-lg">
      <Button @click="backPage" type="submit" size="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-left"
          width="42"
          height="42"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#ffffff"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
      </Button>
    </header>
    <main
      class="flex-1 flex flex-col items-center justify-start p-4 mt-20 md:p-10 space-y-8"
    >
      <Card
        class="mx-auto max-w-sm min-h-[500px] bg-primary border-foreground text-white"
      >
        <CardHeader>
          <CardTitle class="text-xl"> {{ props.title }}</CardTitle>
          <CardDescription>
            {{ props.description }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <slot />
        </CardContent>
      </Card>
    </main>
  </div>
</template>
