<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { defineProps,ref } from 'vue';
  import type { PropType } from 'vue';
  import type { ProductReqList } from '../Interface'
  import EmptySugxn from '../assets/empty-suggestion.svg'
  import navDown from '../assets/white-nav-down.svg'
  import navUp from '../assets/white-nav-up.svg'
  import tick from '../assets/option-tick.svg'
   
  
  // eslint-disable-next-line
  const { selectedSuggestions,voteOptions } = defineProps({
    selectedSuggestions: Array as PropType<ProductReqList[]>,
    voteOptions: String,
    optionsUpdater: Function
  })
  // destructuring props from SuggestionsBoard.vue

  //State/primitive variables : refs
  const optionToggle = ref(false)
  const isHovered = ref(Array(selectedSuggestions?.length).fill(false))
  const onMouseOver = (index) => {
    return isHovered.value[index] = true;
  }
  const onMouseOut = (index) => {
    return isHovered.value[index] = false;
  }
</script>

<template>
  <section class="w-full  flex  flex-col gap-y-6 ">
      <header class="bg-[#373f68] rounded-[0.625rem] h-[4.5rem] w-full flex items-center  pl-6 pr-4 justify-between mobile:rounded-none">
        <div class="flex items-center gap-[2.375rem] ">
          <div class="flex items-center gap-4 mobile:hidden">
            <img src="../assets/bulb-2.png" class=""/>
            <span class="font-bold text-[1.125rem] text-[#fff]">{{ selectedSuggestions?.length }} Suggestions</span>
          </div>
          <!-- filter: vote options block -->
          <div class="gap-1 text-[#F2F4FE] text-[0.875rem] mobile:text-[0.8125rem] flex items-center cursor-pointer">
            <h5 class="font-normal">Sort by : </h5>
            <div @click="optionToggle = !optionToggle" class="flex gap-2 items-center">
              <h3 class="font-bold text-[0.875rem]"> {{ voteOptions }}</h3>
              <img :src="navUp" alt="nav-toggle" class="py-2" v-if="optionToggle"/>
              <img :src="navDown" alt="nav-toggle" class="py-2" v-else/>
            </div>
            <div class="absolute top-[8.2375rem] justify-center flex flex-col  bg-white rounded-[0.625rem] children:h-[2.9375rem] w-[15.9375rem] h-[12.0625rem] shadow-lg" v-if="optionToggle">
              <div @click="optionsUpdater('Most Upvotes')"  class=" border-b px-6 py-[0.75rem] flex justify-between"> 
                <h3 class="text-[#647196] text-[1rem] hover:text-[#ad1fea]" >Most Upvotes</h3>
                <img :src="tick" alt="option-tick" :class="voteOptions === 'Most Upvotes' ? 'block':'hidden'"/>
              </div>
              <div @click="optionsUpdater('Least Upvotes')"  class=" border-b px-6 py-[0.75rem] flex justify-between"> 
                <h3 class="text-[#647196] text-[1rem] hover:text-[#ad1fea]" >Least Upvotes</h3>
                <img :src="tick" alt="option-tick" :class="voteOptions === 'Least Upvotes' ? 'block':'hidden'"/>
              </div>
              <div @click="optionsUpdater('Most Comments')"  class=" border-b px-6 py-[0.75rem] flex justify-between"> 
                <h3 class="text-[#647196] text-[1rem] hover:text-[#ad1fea]" >Most Comments</h3>
                <img :src="tick" alt="option-tick" :class="voteOptions === 'Most Comments' ? 'block':'hidden'"/>
              </div>
              <div @click="optionsUpdater('Least Comments')"  class="px-6 py-[0.75rem] flex justify-between"> 
                <h3 class="text-[#647196] text-[1rem] hover:text-[#ad1fea]" >Least Comments</h3>
                <img :src="tick" alt="option-tick" :class="voteOptions === 'Least Comments' ? 'block':'hidden'"/>
              </div>
            </div>
          </div>
        </div>
        <router-link  to="/createfeedback" class=" rounded-[0.625rem] h-[2.75rem] mobile:h-[2.5rem] py-3 mobile:py-[0.625rem] mobile:px-4 px-6 bg-[#AD1FEA] text-[#f2f4fe] flex cursor-pointer"  v-once>+ Add Feedback</router-link>
      </header>
       <!-- Suggestions view -->
      <main class="flex flex-col gap-y-[1.25rem] mobile:mx-6"  v-if="selectedSuggestions?.length">
        <div  @mouseover="onMouseOver(index)" @mouseout="onMouseOut(index)"  class="flex justify-between items-center cursor-pointer w-full h-[9.4375rem] bg-[#fff] rounded-[0.625rem] px-8 py-[1.75rem] mobile:w-full mobile:h-full " v-for="(item,index) in selectedSuggestions " :key="index" >
          <div class="flex gap-[2.5rem] mobile:flex-col-reverse mobile:gap-y-4">
            <div class="w-[2.5rem] h-[3.3125rem] mobile:w-[4.3125rem] mobile:flex-row mobile:justify-center mobile:gap-[0.625rem] mobile:items-center mobile:h-[2rem] flex flex-col justify-center transition hover:bg-[#CFD7FF] items-center gap-y-2  rounded-[0.625rem] bg-[#f2f4fe] ">
              <img src="../assets/icon-arrow-up.svg" alt="up-nav" class="w-2"/>
              <h3 class="font-black text-[0.8125rem] text-[#3a4374]">{{ item.upvotes }}</h3>
            </div>
            <div class="flex flex-col gap-y-[1.0625rem]">
              <routerLink :to="{ name: 'feedback-detail', params: { id: item.id}}" class="flex flex-col gap-y-1">
                <h3 :class="{'text-[#4661e6]' :  isHovered[index] , 'text-[#3a4374] text-[1.25rem] font-bold' : true}">{{ item.title }}</h3>
                <h3 class="text-[#647196] font-normal text-[1rem] ">{{ item.description }}</h3>
              </routerLink>
              <span class="w-[6.9375rem] h-[1.875rem] rounded-[0.625rem] bg-[#f2f4ff] text-[#4661e6] font-semibold text-[0.8125rem] flex justify-center items-center px-4 py-[0.6875rem]">{{ item.category }}</span>
            </div>
          </div>
          <div class="flex gap-1 items-center mobile:self-end">
            <img src="../assets/icon-comments.svg" alt="" class="w-[1.25rem] h-[1rem]"/>
            <h4 class="font-bold text-[#3a4374] text-[1rem] ">{{ item.comments?.length || 0 }}</h4>
          </div>
        </div>
      </main>
       <!-- Empty suggestions view  -->
      <section class="flex flex-col justify-center items-center gap-y-[2rem] bg-[#fff] rounded-[0.625rem] desktop:h-full mobile:mx-6 mobile:h-[28.75rem] tablet:h-[37.5rem]" v-else>
        <img :src="EmptySugxn" alt="empty-suggestion" class="w-[8.1025rem] h-[8.55rem]"/>
        <div class="flex flex-col gap-y-[3rem] w-[25.625rem] h-[11.8125rem] justify-center">
          <div class="flex flex-col gap-y-4">
            <h2 class="text-[#3A4374] font-bold text-[1.5rem] text-center">There is no feedback yet</h2>
            <p class="text-center text-[#647196] text-[1rem] mobile:mx-6">
              Got a suggestion? Found a bug that needs to be squashed? 
              We love hearing about new ideas to improve our app.
            </p>
          </div>
          <router-link  to="/createfeedback" class=" rounded-[0.625rem] h-[2.75rem] py-2 px-4 bg-[#AD1FEA] text-[#f2f4fe] flex cursor-pointer w-[9.875rem] mx-auto" >+ Add Feedback</router-link>
        </div>
      </section>
  </section>
</template>

