<script setup>
  import MainLogin from "../components/login/MainLogin.vue";
  import { ref } from "vue";
  import Register from "../components/Register.vue";
  import { Button } from "@/components/ui/button";
  import { Label } from "@/components/ui/label";
  import {
    PinInput,
    PinInputGroup,
    PinInputInput,
    PinInputSeparator,
  } from "@/components/ui/pin-input";
  import { useToast } from "@/components/ui/toast/use-toast";
  import { Toaster } from "@/components/ui/toast";

  const email = ref(localStorage.getItem("email") || "");
  const { toast } = useToast();
  const value = ref([]);
</script>

<template>
  <div v-if="email !== ''">
    <Register title="Login" description="Ingresa los datos y continua para poder entrar en la APP 💪">
      <Toaster />
      <div class="grid gap-5 mt-10">
        <div class="grid gap-2 text-center">
          <Label class="mb-10" for="email"
            >Agrega un patron para Loguearte!</Label
          >
          <div class="flex justify-center text-primary">
            <PinInput
              id="pin-input"
              v-model="value"
              placeholder="○"
              type="number"
            >
              <PinInputGroup class="gap-1">
                <template v-for="(id, index) in 4" :key="id">
                  <PinInputInput class="rounded-md border" :index="index" />
                  <template v-if="index !== 3">
                    <PinInputSeparator />
                  </template>
                </template>
              </PinInputGroup>
            </PinInput>
          </div>
        </div>
        <div>
          <Button @click="" type="submit" class="w-full bg-foreground mt-20">
            Entrar
          </Button>
        </div>
      </div>
    </Register>
  </div>
  <div v-else>
    <MainLogin />
  </div>
</template>

<style></style>
