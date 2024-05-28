<script setup lang="ts"> 
  import { RouterLink } from 'vue-router'
  import { onMounted,computed,ref } from 'vue';
  import { useFeedbackStore } from '../store'

  const store = useFeedbackStore()
  const navClick =  ref<string>('progress')

  onMounted(() => {
    store.initializeData()
  })

  const navSelect = (value) => {
    navClick.value = value
  }

  const live = computed(() => store.live)
  const planned = computed(() => store.planned)
  const progress = computed(() => store.progress)
  
</script>


<template>
  <section class="w-full flex flex-col gap-y-[3rem] mt-[2.5rem] mobile:mt-0 mobile:gap-y-0">
    <header class="flex pl-[2rem] pr-[2.5rem] items-center justify-between w-full bg-[#373f68] h-[7.0625rem] rounded-[0.625rem] mobile:rounded-none">   
        <div class="flex flex-col gap-1">       
            <div class="flex gap-2 items-center">
                <img src="../assets/path-2.png" alt="back-nav" class="w-2"/>
                <router-link class="text-[#fff] cursor-pointer hover:underline font-bold text-[0.875rem] mobile:text-[0.8125rem]" to="/">Go Back</router-link>
            </div>
            <h2 class="text-[1.5rem] mobile:text-[1.125rem] font-bold tracking-[-0.021rem] text-white">Roadmap</h2>
        </div>
        <router-link  to="/createfeedback" class=" rounded-[0.625rem] h-[2.75rem] mobile:h-[2.5rem] py-3 px-6 mobile:px-4 items-center bg-[#AD1FEA] text-[#f2f4fe] flex cursor-pointer" >+ Add Feedback</router-link>
    </header>
    <main class="h-full grid grid-cols-3 gap-x-[1.575rem] tablet:gap-x-[0.625rem] mobile:flex mobile:flex-col">
       <!-- Desktop & Tablet UI -->
       <!-- Planned status content -->
      <section class="flex flex-col gap-y-8 mobile:hidden">
        <div class="flex flex-col gap-y-1 tablet:text-[0.875rem]">
          <h3 class="font-bold text-[1.125rem] text-[#3a4375]">Planned ({{ planned?.length }})</h3>
          <p class="text-[#647196] text-[1rem]">Ideas prioritized for research</p>
        </div>
        <div class="flex flex-col gap-y-6">
          <div class="h-[17rem] tablet:h-[15.6875rem] bg-[#fff] rounded-[0.3125rem] border-t-[0.375rem] border-[#F49F85] flex flex-col gap-y-[0.75rem] items-start justify-center px-8 tablet:px-[1.25rem]" v-for="(item,index) in planned" :key="index" >
            <div class="flex gap-4 items-center">
              <span class="w-2 h-2 rounded-full bg-[#F49F85]"></span> <p class="text-[#647196] text-[1rem]">Planned</p>
            </div>
            <div class="">
              <h3 class="font-bold  tablet:text-[0.8125rem] text-[1.125rem] text-[#3a4375] hover:text-[#4661e6] cursor-pointer">{{ item?.title }}</h3>
              <p class="text-[#647196] text-[1rem] tablet:text-[0.8125rem]">{{ item?.description }}</p>
            </div>
            <div class="desktop:w-[6.9375rem] h-[1.875rem]   rounded-[0.625rem] bg-[#f2f4ff] text-[#4661e6] font-semibold text-[0.8125rem] flex justify-center items-center px-4 desktop:py-[0.6875rem]">{{ item?.category }}</div>
            <div class="flex w-full justify-between items-center">
              <div class="bg-[#f2f4fe] h-[2.5rem] tablet:h-[2rem] w-[4.3125rem] rounded-[0.625rem] flex items-center justify-center gap-2 hover:bg-[#CFD7FF] cursor-pointer">
                <img src="../assets/icon-arrow-up.svg" alt="up-nav" class="w-2"/>
                <h3 class="font-black text-[0.8125rem] text-[#3a4374]">{{ item.upvotes }}</h3>
              </div>
              <div class="flex gap-1 items-center">
                <img src="../assets/icon-comments.svg" alt="" class="desktop:w-[1.25rem] tablet:w-[1.125rem] h-[1rem]"/>
                <h4 class="font-bold text-[#3a4374] text-[1rem]  tablet:text-[0.8125rem]">{{ item.comments?.length || 0 }}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- In-progress status content -->
      <section class="flex flex-col gap-y-8 mobile:hidden">
        <div class="flex flex-col gap-y-1 tablet:text-[0.875rem">
          <h3 class="font-bold text-[1.125rem] text-[#3a4375]">In-Progress ({{ progress?.length }})</h3>
          <p class="text-[#647196] text-[1rem]">Currently being developed</p>
        </div>
        <div class="flex flex-col gap-y-6">
          <div class="h-[17rem] tablet:h-[15.6875rem] bg-[#fff] rounded-[0.3125rem] border-t-[0.375rem] border-[#AD1FEA] flex flex-col gap-y-[0.75rem] items-start justify-center px-8 tablet:px-[1.25rem]" v-for="(item,index) in progress" :key="index" >
            <div class="flex gap-4 items-center">
              <span class="w-2 h-2 rounded-full bg-[#AD1FEA]"></span> <p class="text-[#647196] text-[1rem]">In Progress</p>
            </div>
            <div class="">
              <h3 class="tablet:text-[0.8125rem] font-bold text-[1.125rem] text-[#3a4375] hover:text-[#4661e6] cursor-pointer">{{ item?.title }}</h3>
              <p class="text-[#647196] text-[1rem] tablet:text-[0.8125rem]">{{ item?.description }}</p>
            </div>
            <div class="desktop:w-[6.9375rem] h-[1.875rem]     rounded-[0.625rem] bg-[#f2f4ff] text-[#4661e6] font-semibold text-[0.8125rem] flex justify-center items-center px-4 desktop:py-[0.6875rem]">{{ item?.category }}</div>
            <div class="flex w-full justify-between items-center">
              <div class="bg-[#f2f4fe] h-[2.5rem] tablet:h-[2rem] w-[4.3125rem] rounded-[0.625rem] flex items-center justify-center gap-2 hover:bg-[#CFD7FF] cursor-pointer">
                <img src="../assets/icon-arrow-up.svg" alt="up-nav" class="w-2"/>
                <h3 class="font-black text-[0.8125rem] text-[#3a4374]">{{ item.upvotes }}</h3>
              </div>
              <div class="flex gap-1 items-center">
                <img src="../assets/icon-comments.svg" alt="" class="desktop:w-[1.25rem] tablet:w-[1.125rem] h-[1rem]"/>
                <h4 class="font-bold text-[#3a4374] text-[1rem] tablet:text-[0.8125rem]">{{ item.comments?.length || 0 }}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Live status content -->
      <section class="flex flex-col gap-y-8 mobile:hidden">
        <div class="flex flex-col gap-y-1 tablet:text-[0.875rem">
          <h3 class="font-bold text-[1.125rem] text-[#3a4375]">Live ({{ live?.length  }})</h3>
          <p class="text-[#647196] text-[1rem]">Released features</p>
        </div>
        <div class="flex flex-col gap-y-6">
          <div class="h-[17rem] tablet:h-[15.6875rem] bg-[#fff] rounded-[0.3125rem] border-t-[0.375rem] border-[#62bcfa] flex flex-col gap-y-[0.75rem] items-start justify-center px-8 tablet:px-[1.25rem]" v-for="(item,index) in live" :key="index" >
            <div class="flex gap-4 items-center">
              <span class="w-2 h-2 rounded-full bg-[#62bcfa]"></span> <p class="text-[#647196] text-[1rem]">Live</p>
            </div>
            <div class="">
              <h3 class="font-bold text-[1.125rem] text-[#3a4375] hover:text-[#4661e6] cursor-pointer tablet:text-[0.8125rem]">{{ item?.title }}</h3>
              <p class="text-[#647196] text-[1rem] tablet:text-[0.8125rem]">{{ item?.description }}</p>
            </div>
            <div class="desktop:w-[6.9375rem] h-[1.875rem] tablet:px-4  rounded-[0.625rem] bg-[#f2f4ff] text-[#4661e6] font-semibold text-[0.8125rem] flex justify-center items-center px-4 desktop:py-[0.6875rem]">{{ item?.category }}</div>
            <div class="flex w-full justify-between items-center">
              <div class="bg-[#f2f4fe] h-[2.5rem]  w-[4.3125rem] tablet:h-[2rem] rounded-[0.625rem] flex items-center justify-center gap-2 hover:bg-[#CFD7FF] cursor-pointer">
                <img src="../assets/icon-arrow-up.svg" alt="up-nav" class="w-2"/>
                <h3 class="font-black text-[0.8125rem] text-[#3a4374]">{{ item.upvotes }}</h3>
              </div>
              <div class="flex gap-1 items-center">
                <img src="../assets/icon-comments.svg" alt="" class="desktop:w-[1.25rem] tablet:w-[1.125rem] h-[1rem]"/>
                <h4 class="font-bold text-[#3a4374] text-[1rem] tablet:text-[0.8125rem]">{{ item.comments?.length || 0 }}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
        
      <!-- Mobile UI -->
      <section class="w-full desktop:hidden tablet:hidden  flex flex-col gap-y-6 mobile:w-full">
        <nav class="border-b flex children:mx-3 w-full gap-2">
          <div class="py-[1.03125rem] w-[7.8125rem] h-full" @click="navSelect('planned')"  :class="navClick === 'planned' ? 'border-b-4 border-[#F49F85]': ''">
            <h3 class="font-bold text-[0.8125rem] text-[#3a4374] text-center text-opacity-40" :class="navClick === 'planned' ? 'text-opacity-100': ''">Planned ({{ planned?.length }})</h3>
          </div>
          <div class="py-[1.03125rem] w-[7.8125rem] h-full" @click="navSelect('progress')"  :class="navClick === 'progress' ? 'border-b-4 border-[#AD1FEA]': ''">
            <h3 class="font-bold text-[0.8125rem] text-[#3a4374] text-center text-opacity-40" :class="navClick === 'progress' ? 'text-opacity-100': ''">In-Progress ({{ progress?.length }})</h3>
          </div>
          <div class="py-[1.03125rem] w-[7.8125rem] h-full" @click="navSelect('live')"  :class="navClick === 'live' ? 'border-b-4 border-[#62bcfa]': ''">
            <h3 class="font-bold text-[0.8125rem] text-[#3a4374] text-center text-opacity-40" :class="navClick === 'live' ? 'text-opacity-100': ''">Live ({{ live?.length }})</h3>
          </div>
        </nav>
        <!-- Planned status content -->
        <body class="flex flex-col gap-y-8 w-[20.4375rem] mx-auto" v-if="navClick === 'planned'">
          <div class="flex flex-col gap-y-1 tablet:text-[0.875rem]">
            <h3 class="font-bold text-[1.125rem] text-[#3a4375]">Planned ({{ planned?.length }})</h3>
            <p class="text-[#647196] text-[1rem]">Ideas prioritized for research</p>
          </div>
          <div class="flex flex-col gap-y-6">
            <div class="h-[17rem] tablet:h-[15.6875rem] bg-[#fff] rounded-[0.3125rem] border-t-[0.375rem] border-[#F49F85] flex flex-col gap-y-[0.75rem] items-start justify-center px-8 tablet:px-[1.25rem] " v-for="(item,index) in planned" :key="index" >
              <div class="flex gap-4 items-center">
                <span class="w-2 h-2 rounded-full bg-[#F49F85]"></span> <p class="text-[#647196] text-[1rem]">Planned</p>
              </div>
              <div class="">
                <h3 class="font-bold  tablet:text-[0.8125rem] text-[1.125rem] text-[#3a4375] hover:text-[#4661e6] cursor-pointer">{{ item?.title }}</h3>
                <p class="text-[#647196] text-[1rem] tablet:text-[0.8125rem]">{{ item?.description }}</p>
              </div>
              <div class="desktop:w-[6.9375rem] h-[1.875rem]   rounded-[0.625rem] bg-[#f2f4ff] text-[#4661e6] font-semibold text-[0.8125rem] flex justify-center items-center px-4 desktop:py-[0.6875rem]">{{ item?.category }}</div>
              <div class="flex w-full justify-between items-center">
                <div class="bg-[#f2f4fe] h-[2.5rem] tablet:h-[2rem] w-[4.3125rem] rounded-[0.625rem] flex items-center justify-center gap-2 hover:bg-[#CFD7FF] cursor-pointer">
                  <img src="../assets/icon-arrow-up.svg" alt="up-nav" class="w-2"/>
                  <h3 class="font-black text-[0.8125rem] text-[#3a4374]">{{ item.upvotes }}</h3>
                </div>
                <div class="flex gap-1 items-center">
                  <img src="../assets/icon-comments.svg" alt="" class="desktop:w-[1.25rem] tablet:w-[1.125rem] h-[1rem]"/>
                  <h4 class="font-bold text-[#3a4374] text-[1rem]  tablet:text-[0.8125rem]">{{ item.comments?.length || 0 }}</h4>
                </div>
              </div>
            </div>
          </div>
        </body>
        <!-- In-progress status content -->
        <body class="flex flex-col gap-y-8 w-[20.4375rem] mx-auto" v-if="navClick === 'progress'">
          <div class="flex flex-col gap-y-1 tablet:text-[0.875rem]">
            <h3 class="font-bold text-[1.125rem] text-[#3a4375]">In-Progress ({{ progress?.length }})</h3>
            <p class="text-[#647196] text-[1rem]">Currently being developed</p>
          </div>
          <div class="flex flex-col gap-y-6">
            <div class="h-[17rem] tablet:h-[15.6875rem] bg-[#fff] rounded-[0.3125rem] border-t-[0.375rem] border-[#AD1FEA] flex flex-col gap-y-[0.75rem] items-start justify-center px-8 tablet:px-[1.25rem] " v-for="(item,index) in progress" :key="index" >
              <div class="flex gap-4 items-center">
                <span class="w-2 h-2 rounded-full bg-[#AD1FEA]"></span> <p class="text-[#647196] text-[1rem]">Planned</p>
              </div>
              <div class="">
                <h3 class="font-bold  tablet:text-[0.8125rem] text-[1.125rem] text-[#3a4375] hover:text-[#4661e6] cursor-pointer">{{ item?.title }}</h3>
                <p class="text-[#647196] text-[1rem] tablet:text-[0.8125rem]">{{ item?.description }}</p>
              </div>
              <div class="desktop:w-[6.9375rem] h-[1.875rem]   rounded-[0.625rem] bg-[#f2f4ff] text-[#4661e6] font-semibold text-[0.8125rem] flex justify-center items-center px-4 desktop:py-[0.6875rem]">{{ item?.category }}</div>
              <div class="flex w-full justify-between items-center">
                <div class="bg-[#f2f4fe] h-[2.5rem] tablet:h-[2rem] w-[4.3125rem] rounded-[0.625rem] flex items-center justify-center gap-2 hover:bg-[#CFD7FF] cursor-pointer">
                  <img src="../assets/icon-arrow-up.svg" alt="up-nav" class="w-2"/>
                  <h3 class="font-black text-[0.8125rem] text-[#3a4374]">{{ item.upvotes }}</h3>
                </div>
                <div class="flex gap-1 items-center">
                  <img src="../assets/icon-comments.svg" alt="" class="desktop:w-[1.25rem] tablet:w-[1.125rem] h-[1rem]"/>
                  <h4 class="font-bold text-[#3a4374] text-[1rem]  tablet:text-[0.8125rem]">{{ item.comments?.length || 0 }}</h4>
                </div>
              </div>
            </div>
          </div>
        </body>
        <!-- Live status content -->
        <body class="flex flex-col gap-y-8 w-[20.4375rem] mx-auto" v-if="navClick === 'live'">
          <div class="flex flex-col gap-y-1 tablet:text-[0.875rem]">
            <h3 class="font-bold text-[1.125rem] text-[#3a4375]">Live ({{ live?.length }})</h3>
            <p class="text-[#647196] text-[1rem]">Released features</p>
          </div>
          <div class="flex flex-col gap-y-6">
            <div class="h-[17rem] tablet:h-[15.6875rem] bg-[#fff] rounded-[0.3125rem] border-t-[0.375rem] border-[#62bcfa] flex flex-col gap-y-[0.75rem] items-start justify-center px-8 tablet:px-[1.25rem] " v-for="(item,index) in live" :key="index" >
              <div class="flex gap-4 items-center">
                <span class="w-2 h-2 rounded-full bg-[#62bcfa]"></span> <p class="text-[#647196] text-[1rem]">Live</p>
              </div>
              <div class="">
                <h3 class="font-bold  tablet:text-[0.8125rem] text-[1.125rem] text-[#3a4375] hover:text-[#4661e6] cursor-pointer">{{ item?.title }}</h3>
                <p class="text-[#647196] text-[1rem] tablet:text-[0.8125rem]">{{ item?.description }}</p>
              </div>
              <div class="desktop:w-[6.9375rem] h-[1.875rem]   rounded-[0.625rem] bg-[#f2f4ff] text-[#4661e6] font-semibold text-[0.8125rem] flex justify-center items-center px-4 desktop:py-[0.6875rem]">{{ item?.category }}</div>
              <div class="flex w-full justify-between items-center">
                <div class="bg-[#f2f4fe] h-[2.5rem] tablet:h-[2rem] w-[4.3125rem] rounded-[0.625rem] flex items-center justify-center gap-2 hover:bg-[#CFD7FF] cursor-pointer">
                  <img src="../assets/icon-arrow-up.svg" alt="up-nav" class="w-2"/>
                  <h3 class="font-black text-[0.8125rem] text-[#3a4374]">{{ item.upvotes }}</h3>
                </div>
                <div class="flex gap-1 items-center">
                  <img src="../assets/icon-comments.svg" alt="" class="desktop:w-[1.25rem] tablet:w-[1.125rem] h-[1rem]"/>
                  <h4 class="font-bold text-[#3a4374] text-[1rem]  tablet:text-[0.8125rem]">{{ item.comments?.length || 0 }}</h4>
                </div>
              </div>
            </div>
          </div>
        </body>
      </section>
    </main>  
  </section>
</template>

