<script setup>
  import MainLogin from "./MainLogin.vue";
  import Register from "../Register.vue";
  import { Button } from "@/components/ui/button";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import {
    PinInput,
    PinInputGroup,
    PinInputInput,
    PinInputSeparator,
  } from "@/components/ui/pin-input";
  import { useToast } from "@/components/ui/toast/use-toast";
  import { Toaster } from "@/components/ui/toast";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { encrypt } from "@/js/encrypt.js";
    import {
    getAuth,
    signInWithEmailAndPassword,
    fetchSignInMethodsForEmail,
  } from "firebase/auth";

  const router = useRouter();
  const isLogin = ref(false);
  const email = ref(localStorage.getItem("email") || "");
  const newEmail = ref("");
  const { toast } = useToast();
  const value = ref([]);
  const password = ref("");

  const handleLogin = (info) => {
    isLogin.value = info;
  };

  const handleLoginBack = (info) => {
    isLogin.value = info.isLogin;
    email.value = info.email;

    console.log(isLogin.value);
    console.log(email.value);
  };

  const handleNextPass = () => {
    email.value = newEmail.value;
    localStorage.setItem("email", email.value);
    router.push("/");
  };

  const login = () => {
    const valueString = value.value.join("");
    const encryptedValue = valueString+"MyEncryptedValue";
    console.log(encryptedValue);
    const auth = getAuth();

    if (email.value != "" || encryptedValue != "") {
      // Se necesita .value por el uso de ref()
      signInWithEmailAndPassword(auth, email.value, encryptedValue)
        .then((data) => {
          console.log("Successfully singed in!");
          console.log(auth.currentUser);
          router.push("/");
        })
        .catch((err) => {
          /*
        firebase auth errors code:

        auth/invalid-email
        auth/user-not-found
        auth/wrong-password
        auth/user-disabled

        */
          console.log("Failed to register: ", err.code);
          switch (err.code) {
            case "auth/invalid-email":
              toast({
                title: "Error",
                description: "Invalid Email!",
              });
              break;
            case "auth/user-not-found":
              toast({
                title: "Error",
                description: "No account with that email was found",
              });

              break;
            case "auth/wrong-password":
              toast({
                title: "Error",
                description: "Incorrect password",
              });

              break;
            case "auth/user-disabled":
              toast({
                title: "Error",
                description: "User is Banned",
              });

              break;
            default:
              toast({
                title: "Error",
                description: "Email or password was incorrect",
              });
              break;
          }
        });
    } else {
      toast({
        title: "Error",
        description: "You must fill out all the fields!",
      });
    }
  };
</script>
<template>
  <div v-if="email !== ''">
    <Register
      @login="handleLoginBack"
      title="Login"
      description="Ingresa los datos y continua para poder entrar en la APP 💪"
    >
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
          <Button
            @click="login"
            type="submit"
            class="w-full bg-foreground mt-20"
          >
            Entrar
          </Button>
        </div>
      </div>
    </Register>
  </div>
  <div v-else>
    <div v-if="isLogin == true">
      <Register
        @login="handleLoginBack"
        title="Login"
        description="Ingresa los datos y continua para poder entrar en la APP 💪"
      >
        <Toaster />
        <div class="grid gap-5 mt-10">
          <div class="grid gap-2 text-center">
            <Label class="mb-10" for="email"
              >Agrega un email para Loguearte!</Label
            >

            <div class="grid gap-2">
              <Input
              v-model="newEmail"
                id="newEmail"
                type="email"
                class="text-foreground"
                placeholder="m@example.com"
                required
              />
            </div>
          </div>
          <div>
            <Button @click="handleNextPass" class="w-full bg-foreground mt-32">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-arrow-narrow-right"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M15 16l4 -4" />
                <path d="M15 8l4 4" />
              </svg>
            </Button>
          </div>
        </div>
      </Register>
    </div>
    <div v-else>
      <MainLogin @login="handleLogin" />
    </div>
  </div>
</template>
<script></script>
