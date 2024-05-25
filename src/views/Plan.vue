<script setup>
  import FooterMenu from "@/components/FooterMenu.vue";
  import { ref, onMounted } from "vue";
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { getPlan } from "@/services/User.service";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Label } from "@/components/ui/label";
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

  const defaultValue = "gym-item-1";
  const bmiType = "Sobrepeso"; // Cambia esto según el plan que necesites

  const gymPlan = ref([]);
  const foodPlan = ref([]);
  const bmi = ref("");

  const checkOne = ref(false);
  const checkTwo = ref(false);

  const handleChange = (checked) => {
    if (checked === "checkOne") {
      checkOne.value = true;
    } else {
      checkTwo.value = true;
    }
  };

  onMounted(async () => {
    const planData = await getPlan(bmiType);
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
  const validate = () => {
    // Lógica de validación
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
      <div
        class="flex items-center gap-x-2 bg-primary p-3 border-solid border-2 border-green-500 rounded-lg"
      >
        <h1>Planes completados:</h1>
        <h1>
          {{
            checkOne && checkTwo
              ? "2 / 2"
              : checkOne || checkTwo
              ? "1 / 2"
              : "0 / 2"
          }}
        </h1>
        <Button
          class="bg-foreground p-2 rounded-full ml-16"
          if="checkOne && checkTwo"
          @click="validate"
          ><svg
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
            <path d="M9 12l2 2l4 -4" /></svg
        ></Button>
      </div>
      <div>
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
        class="fixed inset-0 flex items-center justify-center pointer-events-none"
      >
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
