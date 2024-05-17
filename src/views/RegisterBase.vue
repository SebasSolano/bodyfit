<script setup>
  import Register from "../components/Register.vue";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { useRouter } from "vue-router";
  import { ref } from "vue";
  import {
    PinInput,
    PinInputGroup,
    PinInputInput,
    PinInputSeparator,
  } from "@/components/ui/pin-input";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut, // Importa signOut
  } from "firebase/auth";
  import { useToast } from "@/components/ui/toast/use-toast";
  import { Toaster } from "@/components/ui/toast";

  import { encrypt } from "@/js/encrypt.js";

  const validateNext = ref(true);
  const value = ref([]);
  const router = useRouter();
  const firstName = ref("");
  const lastName = ref("");
  const sex = ref("");
  const age = ref(0);
  const email = ref("");
  const { toast } = useToast();
  const auth = getAuth();

  const handleNext = () => {
    if (
      firstName.value !== "" ||
      lastName.value !== "" ||
      sex.value !== "" ||
      age.value !== 0 ||
      email.value != ""
    ) {
      validateNext.value = false;
    } else {
      console.log("Please enter the first name and last name");
      toast({
        title: "Error",
        description: "Desbes rellenar los campos completos!",
      });
    }
  };



  const register = () => {
    const valueString = value.value.join("");
    const encryptedValue = valueString+"MyEncryptedValue";
    console.log(encryptedValue);

    createUserWithEmailAndPassword(auth, email.value, encryptedValue)
      .then((data) => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Email verification sent!");
            signOut(auth).then(() => {
              localStorage.setItem("email", email.value);
              console.log("User signed out after registration.");
              router.push("/login");
            });
          })
          .catch((error) => {
            console.log("Error sending email verification:", error);
            toast({
              title: "Error",
              description: "No se puedo verificar!",
            });
          });
      })
      .catch((err) => {
        console.log("Failed to register: ", err.code);
        toast({
          title: "Error",
          description: "No se puedo registrar!", 
        });
      });
  };
</script>
<template>
  <Register title="Registrarse" description="Ingresa los datos y continua para poder registrarte 💪" v-if="validateNext">
    <Toaster />
    <div class="grid gap-5 mt-10">
      <div class="grid grid-cols-2 gap-4 ">
        <div class="grid gap-2">
          <Label for="first-name">First name</Label>
          <Input
            v-model="firstName"
            id="first-name"
            class="text-foreground"
            placeholder="Max"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="last-name">Last name</Label>
          <Input
            v-model="lastName"
            id="last-name"
            class="text-foreground"
            placeholder="Robinson"
            required
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="first-name">Sexo</Label>
          <Select v-model="sex">
            <SelectTrigger>
              <SelectValue class="text-foreground" placeholder="Tu Sexo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sexo</SelectLabel>
                <SelectItem value="M"> Masculino </SelectItem>
                <SelectItem value="F"> Femenino </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label for="edad">Edad</Label>
          <Input
            v-model="age"
            id="edad"
            class="text-foreground"
            type="number"
            placeholder="0"
          />
        </div>
      </div>

      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input
          v-model="email"
          id="email"
          type="email"
          class="text-foreground"
          placeholder="m@example.com"
          required
        />
      </div>
      <div>
        <Button
          type="submit"
          @click="handleNext"
          class="w-full bg-foreground mt-8"
        >
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
  <Register title="Registrarse" description="Ingresa los datos y continua para poder registrarte 💪" v-if="!validateNext">
    <Toaster />
    <div class="grid gap-5 mt-10">
      <div class="grid gap-2 text-center">
        <Label class="mb-10" for="email"
          >Agrega un patron para registrarte!</Label
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
          @click="register"
          type="submit"
          class="w-full bg-foreground mt-20"
        >
          Registrarse
        </Button>
      </div>
    </div>
  </Register>
</template>
<style></style>
