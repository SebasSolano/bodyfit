<script setup></script>

<template>
  <div class="bg-primary text-white flex justify-around p-4">
    <router-link to="/" class="flex flex-col items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-home-2"
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
        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
        <path d="M10 12h4v4h-4z" />
      </svg>
      <span class="text-xs mt-1">Home</span>
    </router-link>
    <router-link to="/plan" class="flex flex-col items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-chef-hat"
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
        <path
          d="M12 3c1.918 0 3.52 1.35 3.91 3.151a4 4 0 0 1 2.09 7.723l0 7.126h-12v-7.126a4 4 0 1 1 2.092 -7.723a4 4 0 0 1 3.908 -3.151z"
        />
        <path d="M6.161 17.009l11.839 -.009" />
      </svg>
      <span class="text-xs mt-1">Plan</span>
    </router-link>
    <router-link to="/profile" class="flex flex-col items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-user-circle"
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
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path
          d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"
        />
      </svg>
      <span class="text-xs mt-1">Profile</span>
    </router-link>
  </div>
</template>

<style scoped>
  /* Puedes ajustar los estilos según tus necesidades */
</style>
