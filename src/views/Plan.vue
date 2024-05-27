<script setup>
  import FooterMenu from "@/components/FooterMenu.vue";
  import { ref, onMounted } from "vue";
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import {
    getPlan,
    getUser,
    updateUser,
    addHistoryEntry,
  } from "@/services/User.service";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Switch } from "@/components/ui/switch";
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Toaster } from "@/components/ui/toast";
  import { useToast } from "@/components/ui/toast/use-toast";
  import { useRouter } from "vue-router";
  import { Button } from "@/components/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

  const defaultValue = "gym-item-1";

  const gymPlan = ref([]);
  const foodPlan = ref([]);
  const bmi = ref(null);
  const bmiStatus = ref("");

  const newWeight = ref(0);

  const checkOne = ref(
    localStorage.getItem("checkOne") ? localStorage.getItem("checkOne") : false
  );
  const checkTwo = ref(
    localStorage.getItem("checkTwo") ? localStorage.getItem("checkTwo") : false
  );
  const uuid = ref(localStorage.getItem("uuid"));
  const { toast } = useToast();
  const router = useRouter();

  // User data
  const user = ref({
    username: "Null",
    email: "NUll",
    gender: "NAn",
    age: 0,
    height: 0,
    weight: 0,
  });

  const statusValue = ref(false);

  // Calculate BMI
  const calculateBMI = (height, weight) => {
    //console.log(height, weight);
    const heightInMeters = height / 100;
    //console.log(height, weight);
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

  const handleChange = (checked) => {
    if (checked === "checkOne") {
      checkOne.value = true;
      localStorage.setItem("checkOne", checkOne.value);
    } else {
      checkTwo.value = true;
      localStorage.setItem("checkTwo", checkTwo.value);
    }
  };

  onMounted(async () => {
    const userData = await getUser(uuid.value);
    user.value = userData;

    statusValue.value = user.value.bmi.statusValue;

    const planData = await getPlan(user.value.bmi.status);
    if (planData) {
      bmi.value = planData.bmi;

      gymPlan.value = planData.gym.map(([day, details], index) => ({
        value: `gym-item-${index + 1}`,
        title: `${day}: ${details.titulo}`,
        content: details.ejercicios.join(", "),
      }));

      foodPlan.value = planData.comida.map(([day, meals], index) => ({
        value: `food-item-${index + 1}`,
        title: `${day}`,
        content: meals.join(", "),
      }));
    }
  });

  const addNewPlan = () => {
    const updatedAt = new Date().toISOString();
    if (user.value.bmi.status === null || user.value.bmi.percentile === 0) {
      toast({
        title: "Error",
        description: "Debes actualizar tus datos primero en Profile!",
      });
      setTimeout(() => {
        router.push("/profile");
      }, 5500);
    } else {
      updateUser(uuid.value, {
        bmi: {
          percentile: user.value.bmi.percentile,
          status: user.value.bmi.status,
          statusValue: true,
        },
        updatedAt: updatedAt,
      });
      router.go("/plan");
    }
  };

  const validate = async () => {
    //console.log(newWeight.value)
    const updatedAt = new Date().toISOString();
    bmi.value = calculateBMI(user.value.height, newWeight.value);
    //console.log(bmi.value);
    bmiStatus.value = getBMIStatus(bmi.value);
    //console.log(bmiStatus.value)
   await updateUser(uuid.value, {
      weight: newWeight.value,
      bmi: {
        percentile: bmi.value,
        status: bmiStatus.value,
        statusValue: false,
      },
      updatedAt: updatedAt,
    });
    await addHistoryEntry(uuid.value, newWeight.value, bmi.value);
    localStorage.removeItem("checkOne");
    localStorage.removeItem("checkTwo");
    router.push("/profile");
  };
</script>

<template>
  <div id="app" class="flex flex-col min-h-screen bg-foreground">
    <header
      class="bg-primary text-accent text-center p-6 md:p-10 fixed top-0 left-0 right-0 z-10"
    >
      <h1 class="text-5xl md:text-8xl font-bold">Plan</h1>
    </header>
    <main
      class="flex-1 overflow-auto p-10 md:p-10 space-y-8 mt-20 mb-16 relative text-accent"
    >
      <Toaster />
      <div
        v-if="statusValue"
        class="flex items-center gap-x-2 bg-primary p-3 border-solid border-2 border-green-500 rounded-lg"
      >
        <h1>Planes completados:</h1>
        <h1>
          {{
            checkOne && checkTwo ? "2/2" : checkOne || checkTwo ? "1/2" : "0/2"
          }}
        </h1>
        <Dialog>
          <DialogTrigger as-child>
            <Button
              v-if="checkOne && checkTwo"
              class="bg-foreground p-2 rounded-full ml-16"
              
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-circle-check"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#7bc62d"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nuevo peso</DialogTitle>
              <DialogDescription>
                Aqui podras guardar tu nuevo peso, para poder visualizar tu
                progreso en Profile.
              </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="newWeight" class="text-right"> Nuevo Peso: </Label>
                <Input
                  v-model="newWeight"
                  id="newWeight"
                  name="newWeight"
                  type="number"
                  :placeholder="newWeight"
                  class="col-span-3 p-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" @click="validate"> Guardar </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div v-if="statusValue">
        <Card class="bg-primary text-accent">
          <CardHeader>
            <CardTitle>Plan de Gimnasio</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion
              type="single"
              class="w-full"
              collapsible
              :default-value="defaultValue"
            >
              <AccordionItem
                v-for="item in gymPlan"
                :key="item.value"
                :value="item.value"
              >
                <AccordionTrigger>{{ item.title }}</AccordionTrigger>
                <AccordionContent>
                  {{ item.content }}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <div class="flex items-center space-x-2">
              <AlertDialog>
                <AlertDialogTrigger as-child>
                  <Switch
                    :checked="checkOne"
                    :disabled="checkOne"
                    id="airplane-mode"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle
                      >Terminaste tu rutina del gym?</AlertDialogTitle
                    >
                    <AlertDialogDescription>
                      Si ya terminaste puedes darle al boton de continue, si no
                      a cancelar. Recuerda al darle continue no podras cambiar
                      mas este valor!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction @click="handleChange('checkOne')"
                      >Continue</AlertDialogAction
                    >
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Label for="airplane-mode"
                ><svg
                  v-if="checkOne"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-circle-check"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#7bc62d"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>

                <svg
                  v-if="!checkOne"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-alert-hexagon"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#ff4500"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"
                  />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" /></svg
              ></Label>
            </div>
          </CardFooter>
        </Card>

        <Card class="bg-primary text-accent mt-5">
          <CardHeader>
            <CardTitle> Plan de Comida </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion
              type="single"
              class="w-full"
              collapsible
              :default-value="defaultValue"
            >
              <AccordionItem
                v-for="item in foodPlan"
                :key="item.value"
                :value="item.value"
              >
                <AccordionTrigger>{{ item.title }}</AccordionTrigger>
                <AccordionContent>
                  {{ item.content }}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <div class="flex items-center space-x-2">
              <AlertDialog>
                <AlertDialogTrigger as-child>
                  <Switch
                    :checked="checkTwo"
                    :disabled="checkTwo"
                    id="airplane-mode"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle
                      >Terminaste tu rutina de comida?</AlertDialogTitle
                    >
                    <AlertDialogDescription>
                      Si ya terminaste puedes darle al boton de continue, si no
                      a cancelar. Recuerda al darle continue no podras cambiar
                      mas este valor!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction @click="handleChange('checkTwo')"
                      >Continue</AlertDialogAction
                    >
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Label for="airplane-mode"
                ><svg
                  v-if="checkTwo"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-circle-check"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#7bc62d"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>

                <svg
                  v-if="!checkTwo"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-alert-hexagon"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#ff4500"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"
                  />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" /></svg
              ></Label>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div
        v-if="!statusValue"
        class="fixed inset-0 flex items-center justify-center pointer-events-none"
      >
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <button
              class="bg-green-500 text-white rounded-full p-4 shadow-lg pointer-events-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Agregar rutina general</AlertDialogTitle>
              <AlertDialogDescription>
                Si deseas agregar una rutina dale al boton de Continue! Recuerda
                que debes haber actualziaod tus datos en Profile.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction @click="addNewPlan"
                >Continue</AlertDialogAction
              >
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
