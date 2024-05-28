<template>
  <v-app class="flex justify-center w-full min-h-screen p-0 m-0 border-box !bg-[#F7F8FD] font-jost">
    <div class="my-[2.5rem] mobile:m-0 desktop:w-[69.375rem] tablet:w-[43.0625rem] tablet:mx-auto desktop:mx-auto  flex mobile:w-full ">
      <v-fade-transition>
        <router-view ></router-view>
      </v-fade-transition>
    </div>
  </v-app>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
   
</script>
