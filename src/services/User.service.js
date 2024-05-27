import { db } from "../firebase.js";
import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

const currentYear = new Date().getFullYear();

const addUser = async (uuid, data) => {
  try {
    console.log(uuid);
    const currentYearString = currentYear.toString();
    console.log(currentYearString);
    const docRef = doc(db, "users", uuid);
    await setDoc(docRef, data);

    console.log("Documento añadido con ID: ", uuid);
  } catch (err) {
    console.error("Error añadiendo documento: ", err);
  }
};

const getUser = async (uuid) => {
  const userCollection = collection(db, "users");
  const q = query(userCollection, where("uuid", "==", uuid));
  try {
    const querySnapshot = await getDocs(q);
    let userData = null;
    querySnapshot.forEach((doc) => {
      userData = doc.data();
    });
    console.log(userData);

    return userData;
  } catch (e) {
    console.error("Error getting documents: ", e);
    return null;
  }
};

async function updateUser(uuid, data) {
  console.log(uuid, data);
  const docRef = doc(db, "users", uuid);

  try {
    await updateDoc(docRef, data);
    console.log("Documento actualizado con ID: ", uuid);
  } catch (err) {
    console.error("Error actualizando el documento: ", err);
  }
}

const plans = [
  {
    bmi: "Bajo peso",
    gym: {
      "Dia 1": {
        titulo: "Piernas",
        ejercicios: [
          "Sentadillas",
          "Peso muerto",
          "Prensa de pierna",
          "Extensiones de cuádriceps",
          "Curl de pierna",
        ],
      },
      "Dia 2": {
        titulo: "Pecho",
        ejercicios: [
          "Press de banca",
          "Aperturas con mancuernas",
          "Press inclinado",
          "Fondos",
          "Pull-over",
        ],
      },
      "Dia 3": {
        titulo: "Espalda",
        ejercicios: [
          "Dominadas",
          "Remo con barra",
          "Peso muerto",
          "Jalones al pecho",
          "Remo en máquina",
        ],
      },
      "Dia 4": {
        titulo: "Hombros",
        ejercicios: [
          "Press militar",
          "Elevaciones laterales",
          "Elevaciones frontales",
          "Face pulls",
          "Encogimientos de hombros",
        ],
      },
      "Dia 5": {
        titulo: "Brazos",
        ejercicios: [
          "Curl de bíceps",
          "Extensiones de tríceps",
          "Curl martillo",
          "Patadas de tríceps",
          "Curl en predicador",
        ],
      },
      "Dia 6": {
        titulo: "Cardio",
        ejercicios: [
          "Correr",
          "Bicicleta",
          "Elíptica",
          "Remo",
          "Saltos de tijera",
        ],
      },
    },
    comida: {
      "Dia 1": [
        "Desayuno: Avena",
        "Almuerzo: Ensalada de pollo",
        "Cena: Pescado con vegetales",
      ],
      "Dia 2": [
        "Desayuno: Yogur con frutas",
        "Almuerzo: Sándwich de pavo",
        "Cena: Pollo al horno",
      ],
      "Dia 3": [
        "Desayuno: Smoothie de frutas",
        "Almuerzo: Quinoa con verduras",
        "Cena: Tofu con arroz",
      ],
      "Dia 4": [
        "Desayuno: Tostadas con aguacate",
        "Almuerzo: Ensalada de atún",
        "Cena: Lentejas con arroz",
      ],
      "Dia 5": [
        "Desayuno: Huevos revueltos",
        "Almuerzo: Sopa de vegetales",
        "Cena: Salmón con espinacas",
      ],
      "Dia 6": [
        "Desayuno: Batido de proteínas",
        "Almuerzo: Ensalada de garbanzos",
        "Cena: Pollo con brócoli",
      ],
    },
  },
  {
    bmi: "Peso normal",
    gym: {
      "Dia 1": {
        titulo: "Piernas",
        ejercicios: [
          "Sentadillas",
          "Prensa de pierna",
          "Peso muerto",
          "Curl de pierna",
          "Extensiones de cuádriceps",
        ],
      },
      "Dia 2": {
        titulo: "Pecho",
        ejercicios: [
          "Press de banca",
          "Aperturas con mancuernas",
          "Press inclinado",
          "Pull-over",
          "Fondos",
        ],
      },
      "Dia 3": {
        titulo: "Espalda",
        ejercicios: [
          "Peso muerto",
          "Dominadas",
          "Remo con barra",
          "Jalones al pecho",
          "Remo en máquina",
        ],
      },
      "Dia 4": {
        titulo: "Hombros",
        ejercicios: [
          "Press militar",
          "Elevaciones laterales",
          "Elevaciones frontales",
          "Encogimientos de hombros",
          "Face pulls",
        ],
      },
      "Dia 5": {
        titulo: "Brazos",
        ejercicios: [
          "Curl de bíceps",
          "Extensiones de tríceps",
          "Curl martillo",
          "Patadas de tríceps",
          "Curl en predicador",
        ],
      },
      "Dia 6": {
        titulo: "Cardio",
        ejercicios: ["HIIT", "Natación", "Correr", "Ciclismo", "Elíptica"],
      },
    },
    comida: {
      "Dia 1": [
        "Desayuno: Tostadas integrales",
        "Almuerzo: Pollo a la plancha",
        "Cena: Ensalada de quinoa",
      ],
      "Dia 2": [
        "Desayuno: Yogur con granola",
        "Almuerzo: Wrap de pavo",
        "Cena: Salmón con ensalada",
      ],
      "Dia 3": [
        "Desayuno: Smoothie verde",
        "Almuerzo: Ensalada de pollo",
        "Cena: Pavo al horno",
      ],
      "Dia 4": [
        "Desayuno: Avena con frutas",
        "Almuerzo: Tacos de pescado",
        "Cena: Pollo con vegetales",
      ],
      "Dia 5": [
        "Desayuno: Tortilla de espinacas",
        "Almuerzo: Sopa de lentejas",
        "Cena: Bacalao con brócoli",
      ],
      "Dia 6": [
        "Desayuno: Pan integral con aguacate",
        "Almuerzo: Ensalada de garbanzos",
        "Cena: Pollo con batata",
      ],
    },
  },
  {
    bmi: "Sobrepeso",
    gym: {
      "Dia 1": {
        titulo: "Piernas",
        ejercicios: [
          "Sentadillas",
          "Peso muerto",
          "Prensa de pierna",
          "Extensiones de cuádriceps",
          "Curl de pierna",
        ],
      },
      "Dia 2": {
        titulo: "Pecho",
        ejercicios: [
          "Press de banca",
          "Aperturas con mancuernas",
          "Press inclinado",
          "Fondos",
          "Pull-over",
        ],
      },
      "Dia 3": {
        titulo: "Espalda",
        ejercicios: [
          "Dominadas",
          "Remo con barra",
          "Peso muerto",
          "Jalones al pecho",
          "Remo en máquina",
        ],
      },
      "Dia 4": {
        titulo: "Hombros",
        ejercicios: [
          "Press militar",
          "Elevaciones laterales",
          "Elevaciones frontales",
          "Face pulls",
          "Encogimientos de hombros",
        ],
      },
      "Dia 5": {
        titulo: "Brazos",
        ejercicios: [
          "Curl de bíceps",
          "Extensiones de tríceps",
          "Curl martillo",
          "Patadas de tríceps",
          "Curl en predicador",
        ],
      },
      "Dia 6": {
        titulo: "Cardio",
        ejercicios: [
          "Correr",
          "Ciclismo",
          "Elíptica",
          "Remo",
          "Saltos de tijera",
        ],
      },
    },
    comida: {
      "Dia 1": [
        "Desayuno: Avena",
        "Almuerzo: Ensalada de pollo",
        "Cena: Pescado con vegetales",
      ],
      "Dia 2": [
        "Desayuno: Yogur con frutas",
        "Almuerzo: Sándwich de pavo",
        "Cena: Pollo al horno",
      ],
      "Dia 3": [
        "Desayuno: Smoothie de frutas",
        "Almuerzo: Quinoa con verduras",
        "Cena: Tofu con arroz",
      ],
      "Dia 4": [
        "Desayuno: Tostadas con aguacate",
        "Almuerzo: Ensalada de atún",
        "Cena: Lentejas con arroz",
      ],
      "Dia 5": [
        "Desayuno: Huevos revueltos",
        "Almuerzo: Sopa de vegetales",
        "Cena: Salmón con espinacas",
      ],
      "Dia 6": [
        "Desayuno: Batido de proteínas",
        "Almuerzo: Ensalada de garbanzos",
        "Cena: Pollo con brócoli",
      ],
    },
  },
  {
    bmi: "Obesidad",
    gym: {
      "Dia 1": {
        titulo: "Piernas",
        ejercicios: [
          "Sentadillas",
          "Prensa de pierna",
          "Peso muerto",
          "Curl de pierna",
          "Extensiones de cuádriceps",
        ],
      },
      "Dia 2": {
        titulo: "Pecho",
        ejercicios: [
          "Press de banca",
          "Aperturas con mancuernas",
          "Press inclinado",
          "Pull-over",
          "Fondos",
        ],
      },
      "Dia 3": {
        titulo: "Espalda",
        ejercicios: [
          "Peso muerto",
          "Dominadas",
          "Remo con barra",
          "Jalones al pecho",
          "Remo en máquina",
        ],
      },
      "Dia 4": {
        titulo: "Hombros",
        ejercicios: [
          "Press militar",
          "Elevaciones laterales",
          "Elevaciones frontales",
          "Encogimientos de hombros",
          "Face pulls",
        ],
      },
      "Dia 5": {
        titulo: "Brazos",
        ejercicios: [
          "Curl de bíceps",
          "Extensiones de tríceps",
          "Curl martillo",
          "Patadas de tríceps",
          "Curl en predicador",
        ],
      },
      "Dia 6": {
        titulo: "Cardio",
        ejercicios: ["HIIT", "Natación", "Correr", "Ciclismo", "Elíptica"],
      },
    },
    comida: {
      "Dia 1": [
        "Desayuno: Tostadas integrales",
        "Almuerzo: Pollo a la plancha",
        "Cena: Ensalada de quinoa",
      ],
      "Dia 2": [
        "Desayuno: Yogur con granola",
        "Almuerzo: Wrap de pavo",
        "Cena: Salmón con ensalada",
      ],
      "Dia 3": [
        "Desayuno: Smoothie verde",
        "Almuerzo: Ensalada de pollo",
        "Cena: Pavo al horno",
      ],
      "Dia 4": [
        "Desayuno: Avena con frutas",
        "Almuerzo: Tacos de pescado",
        "Cena: Pollo con vegetales",
      ],
      "Dia 5": [
        "Desayuno: Tortilla de espinacas",
        "Almuerzo: Sopa de lentejas",
        "Cena: Bacalao con brócoli",
      ],
      "Dia 6": [
        "Desayuno: Pan integral con aguacate",
        "Almuerzo: Ensalada de garbanzos",
        "Cena: Pollo con batata",
      ],
    },
  },
];

async function addPlans() {
  const collectionRef = collection(db, "plan");
  for (const plan of plans) {
    try {
      await addDoc(collectionRef, plan);
      console.log(`Document for ${plan.bmi} added successfully`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

async function getPlan(bmi) {
  const planCollection = collection(db, "plan");
  const q = query(planCollection, where("bmi", "==", bmi));

  try {
    const querySnapshot = await getDocs(q);
    let planData = null;
    querySnapshot.forEach((doc) => {
      planData = doc.data();
    });

    // Ensure gym and food plans are sorted by day
    if (planData) {
      planData.gym = Object.entries(planData.gym).sort(([a], [b]) =>
        a.localeCompare(b)
      );
      planData.comida = Object.entries(planData.comida).sort(([a], [b]) =>
        a.localeCompare(b)
      );
    }

    return planData;
  } catch (e) {
    console.error("Error getting documents: ", e);
    return null;
  }
}

async function addHistoryEntry(uuid, weight, bmi) {
  const userHistoryCollection = collection(db, `history/${uuid}/entries`);
  const lastEntryQuery = query(
    userHistoryCollection,
    orderBy("id", "desc"),
    limit(1)
  );

  try {
    const querySnapshot = await getDocs(lastEntryQuery);
    let newId = 1;

    if (!querySnapshot.empty) {
      const lastEntry = querySnapshot.docs[0].data();
      newId = lastEntry.id + 1;
    }

    const newEntry = {
      id: newId,
      weight,
      bmi,
      date: new Date().toISOString(),
    };

    const newDocRef = doc(userHistoryCollection, newId.toString());
    await setDoc(newDocRef, newEntry);

    console.log(`History entry added with ID ${newId} for user ${uuid}`);
  } catch (e) {
    console.error("Error adding history entry: ", e);
  }
}

async function getUserHistory(uuid) {
  const userHistoryCollection = collection(db, `history/${uuid}/entries`);
  const historyQuery = query(userHistoryCollection, orderBy('id', 'desc'));

  try {
    const querySnapshot = await getDocs(historyQuery);
    const entries = [];

    querySnapshot.forEach(doc => {
      entries.push(doc.data());
    });

    return entries;
  } catch (e) {
    console.error("Error getting history entries: ", e);
    return [];
  }
}

export {
  addUser,
  getUser,
  updateUser,
  addPlans,
  getPlan,
  addHistoryEntry,
  getUserHistory,
};
