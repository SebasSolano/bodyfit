<script setup>
  import { ref, onMounted } from "vue";
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
  import { Button } from "@/components/ui/button";
  import FooterMenu from "@/components/FooterMenu.vue";
  import { useRouter } from "vue-router";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import {
    getUser,
    updateUser,
    addHistoryEntry,
    getUserHistory,
  } from "@/services/User.service";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  // User data
  const user = ref({
    username: "Null",
    email: "NUll",
    gender: "NAn",
    age: 0,
    height: 0,
    weight: 0,
  });

  const uuid = ref(localStorage.getItem("uuid"));

  // New height and weight
  const newHeight = ref(user.value.height);
  const newWeight = ref(user.value.weight);

  // BMI and history
  const bmi = ref(null);
  const bmiStatus = ref("");
  const bmiHistory = ref([]);

  const router = useRouter();
  const auth = getAuth();
  const percentile = ref(0);
  const status = ref("");

  // Calculate BMI
  const calculateBMI = (height, weight) => {
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    return bmi;
  };

  // Get BMI status
  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) return "Bajo peso";
    if (bmi >= 18.5 && bmi <= 24.9) return "Peso normal";
    if (bmi >= 25 && bmi <= 29.9) return "Sobrepeso";
    if (bmi >= 30) return "Obesidad";
  };

  // Update user metrics
  const updateUserMetrics = async () => {
    user.value.height = newHeight.value;
    user.value.weight = newWeight.value;
    bmi.value = calculateBMI(newHeight.value, newWeight.value);
    bmiStatus.value = getBMIStatus(bmi.value);
    const updatedAt = new Date().toISOString();
    updateUser(uuid.value, {
      height: newHeight.value,
      weight: newWeight.value,
      bmi: {
        percentile: bmi.value,
        status: bmiStatus.value,
        statusValue: false,
      },
      updatedAt: updatedAt,
    });
    await addHistoryEntry(uuid.value, newWeight.value, bmi.value);
    percentile.value = bmi.value;

    bmiHistory.value.push({
      weight: newWeight.value,
      bmi: bmi.value,
      date: new Date().toISOString(),
    });
    newHeight.value = user.value.height;
    newWeight.value = user.value.weight;
  };

  onMounted(async () => {
    const userData = await getUser(uuid.value);
    user.value = userData;
    percentile.value = user.value.bmi.percentile;
    status.value = user.value.bmi.status;
    console.log(user.value);

    // Obtener el historial del usuario
    const history = await getUserHistory(uuid.value);
    bmiHistory.value = history;
  });

  const logout = () => {
    signOut(auth).then(() => {
      localStorage.setItem("email", user.email);
      localStorage.removeItem("uuid");
      localStorage.removeItem("checkOne");
      localStorage.removeItem("checkTwo");
      router.push("/");
    });
  };
</script>

<template>
  <div id="app" class="flex flex-col min-h-screen bg-foreground text-accent">
    <header
      class="bg-primary text-accent text-center p-6 md:p-10 fixed top-0 left-0 right-0 z-10"
    >
      <h1 class="text-5xl md:text-8xl font-bold">Profile</h1>
    </header>
    <main class="flex-1 overflow-auto p-4 md:p-10 space-y-8 mt-20 mb-16">
      <div class="flex flex-col items-center p-4 space-y-8">
        <!-- User Information Card -->
        <Card class="bg-primary text-accent">
          <CardHeader>
            <CardTitle>Información del Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Nombre:</strong> {{ user.username }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p>
              <strong>Sexo:</strong>
              {{
                user.sex === "M"
                  ? "Masculino"
                  : user.sex === "F"
                  ? "Femenino"
                  : "No especificado"
              }}
            </p>
            <p><strong>Edad:</strong> {{ user.age }} años</p>
            <p><strong>Altura:</strong> {{ user.height }} cm</p>
            <p><strong>Peso:</strong> {{ user.weight }} kg</p>
            <p><strong>IMC:</strong> {{ percentile }}</p>
            <p><strong>Tipo:</strong> {{ status === "" ? "" : status }}</p>
          </CardContent>
          <CardFooter class="justify-center">
            <Button @click="logout" class="bg-foreground p-4 rounded-full"
              >Logout</Button
            >
          </CardFooter>
        </Card>

        <!-- Form to update height and weight -->
        <Card v-if="percentile === 0" class="bg-primary text-accent">
          <CardHeader>
            <CardTitle>Actualizar Altura y Peso</CardTitle>
          </CardHeader>
          <CardContent class="text-accent">
            <form class="text-accent" @submit.prevent="updateUserMetrics">
              <div class="mb-4">
                <label
                  for="height"
                  class="block text-sm font-medium text-accent"
                  >Altura (cm)</label
                >
                <Input
                  type="number"
                  id="height"
                  v-model="newHeight"
                  class="mt-1 block text-accent w-full border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
              <div class="mb-4 text-accent">
                <label for="weight" class="block text-sm font-medium"
                  >Peso (kg)</label
                >
                <Input
                  type="number"
                  id="weight"
                  v-model="newWeight"
                  class="col-span-3 p-1 mt-1 block text-accent w-full border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                class="w-full bg-foreground text-accent py-2 px-4 rounded-md"
              >
                Actualizar
              </button>
            </form>
            <div v-if="bmi" class="mt-4">
              <p><strong>IMC Actualizado:</strong> {{ bmi }}</p>
              <p><strong>Estado:</strong> {{ bmiStatus }}</p>
            </div>
          </CardContent>
        </Card>

        <!-- BMI History Card -->
        <Card v-if="percentile > 0" class="bg-primary text-accent">
          <CardHeader>
            <CardTitle class="text-center">Historial de IMC</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li v-for="(record, index) in bmiHistory" :key="index">
                <div class="border border-gray-300 p-2 rounded mt-2">
                  <p><strong>Peso:</strong> {{ record.weight }} kg</p>
                  <p><strong>IMC:</strong> {{ record.bmi }}</p>
                  <p><strong>Dia:</strong> {{ record.date }}</p>
                </div>
              </li>
            </ul>
          </CardContent>
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
</style>
