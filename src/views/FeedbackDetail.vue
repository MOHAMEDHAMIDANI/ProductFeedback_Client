<template> 
  <main class="w-full h-full flex  justify-center ">
    <div class=" desktop:w-[45.625rem] mobile:mx-6 mobile:mt-6 mobile:mb-[5.5rem] tablet:w-full flex flex-col gap-y-6 desktop:mb-[8.5625rem] tablet:mb-[7.5rem] h-full">
      <header class="flex flex-col gap-y-6 ">
          <nav class="flex justify-between items-center">
            <div class="flex gap-2 items-center">
                <img src="../assets/icon-arrow-left.svg" alt="back-nav" class="w-2 h-2"/>
                <router-link class="text-[#647196] font-bold text-[0.875rem] hover:underline cursor-pointer" to="/">Go Back</router-link>
            </div>
            <router-link :to="{ name: 'editfeedback', params: { id: feedback?.id}}" class="text-[#f2f4fe] rounded-[0.625rem] bg-[#4661E6] hover:bg-[#7C91F9] font-bold text-[0.875rem] flex items-center justify-center w-[8.875rem] h-[2.75rem]">Edit Feedback</router-link>
          </nav>
          <section class="w-full bg-[#fff] rounded-[0.625rem]" v-if="feedback">
            <div class="flex justify-between items-center  w-full h-[9.4375rem] bg-[#fff] rounded-[0.625rem] px-8 py-[1.75rem] mobile:w-full mobile:h-full" >
              <div class="flex gap-[2.5rem] mobile:flex-col-reverse mobile:gap-y-4">
                <div class="w-[2.5rem] h-[3.3125rem] mobile:w-[4.3125rem] mobile:flex-row mobile:justify-center mobile:gap-[0.625rem] mobile:items-center mobile:h-[2rem] flex flex-col justify-center transition hover:bg-[#CFD7FF] items-center gap-y-2  rounded-[0.625rem] bg-[#f2f4fe] ">
                  <img src="../assets/icon-arrow-up.svg" alt="up-nav" class="w-2"/>
                  <h3 class="font-black text-[0.8125rem] text-[#3a4374]">{{ feedback.upvotes  }}</h3>
                </div>
                <div class="flex flex-col gap-y-[1.0625rem]">
                  <div  class="flex flex-col gap-y-1">
                    <h3 class="text-[#3a4374] text-[1.25rem] font-bold" >{{ feedback.title }}</h3>
                    <p class="text-[#647196] font-normal text-[1rem] ">{{ feedback.description }}</p>
                  </div>
                  <span class="w-[6.9375rem] h-[1.875rem] rounded-[0.625rem] bg-[#f2f4ff] text-[#4661e6] font-semibold text-[0.8125rem] flex justify-center items-center px-4 py-[0.6875rem]">{{ feedback.category }}</span>
                </div>
              </div>
              <div class="flex gap-1 items-center mobile:self-end">
                <img src="../assets/icon-comments.svg" alt="" class="w-[1.25rem] h-[1rem]"/>
                <h4 class="font-bold text-[#3a4374] text-[1rem] ">{{ feedback.comments.length }}</h4>
              </div>
            </div>
          </section>
      </header>
      <body class="bg-[#fff] px-[2.125rem] pt-6 w-full flex flex-col gap-y-7 rounded-[0.625rem]" v-if="feedback && feedback.comments">
        <h3 class="font-bold text-[#3a4374] text-[1.125rem]">{{ feedback.comments.length }} Comments</h3>
        <ul class="flex flex-col gap-y-8">
          <li v-for="(comment,index) in feedback.comments" :key="index"  class="flex flex-col gap-y-8 pb-8 border-b border-opacity-[0.25] border-[#8c92b3] w-full ">
            <div class="flex flex-col gap-y-[1.0625rem]">
              <div class="flex justify-between w-full">
                <div class="flex gap-8">
                  <img :src="comment.user.image" :alt="comment.user.name" class="w-[2.5rem] rounded-full" />
                  
                  <div>
                    <h2 class="text-[#3a4374] text-[0.875rem] font-bold">{{ comment.user.name }}</h2>
                    <p class="text-[#647196] text-[0.875rem]">{{ comment.user.username  }}</p>
                  </div>
                </div>
                <h4 class="text-[#4661e6] font-semibold text-[0.8125rem] self-end hover:underline cursor-pointer " @click="toggleReply(index)">Reply</h4>
              </div>
              <p class="text-[#647196] text-[0.9375rem] ml-[4.5rem] mobile:ml-0">{{ comment.content }}</p>
              
              <!-- Feedback comment's replies -->
              <div v-if="comment.replies" >
                <ul class="flex flex-col gap-y-8 ml-[4.8125rem] mobile:ml-0">
                  <li class="flex  flex-col w-full gap-8 " v-for="(reply,index) in comment.replies" :key="index">
                    <div class="flex  gap-[1.0625rem]">
                      <img :src="reply.user.image" class="w-[2.5rem] h-[2.5rem] rounded-full"/>
                      <div class="flex justify-between w-full">
                        <div class="flex flex-col">
                          <h3 class="text-[#3a4374] text-[0.875rem] font-bold">{{ reply.user.name }}</h3> 
                          <p class="text-[#647196] text-[0.875rem]">@{{ reply.user.username }}</p> 
                        </div>
                        <h4 class="text-[#4661e6] font-semibold text-[0.8125rem] self-end">Reply</h4>
                      </div>
                    </div>
                    <p class="text-[#647196] text-[0.9375rem] ml-[3.625rem] mobile:ml-6">
                      <span class="font-bold text-[#ad1fea]">{{ reply.replyingTo }}</span>
                      {{ reply.content }}
                    </p>
  
                  </li>
                </ul>
              </div>
            </div>                  
            <div v-if="replyVisibility[index]"  class="pl-[4.5rem] w-full justify-end flex gap-4 transition  mobile:w-[17rem] mobile:pl-[1rem]">
              <textarea class="h-[4rem] bg-[#f7f8fd] w-[28.8125rem] focus:outline-none  pl-6 pt-4 hover:border-[#4661e6] border rounded-[0.3125rem] cursor-pointer" v-model="reply"></textarea> 
              <button class="text-[#f2f4fe] rounded-[0.625rem] bg-[#AD1FEA] hover:bg-[#7C91F9] font-bold text-[0.875rem] flex items-center justify-center w-[8.875rem] h-[2.75rem]" @click="() => postReply(index)">Post Reply</button>
            </div>
          </li>
        </ul>
      </body>
      <section class="w-full bg-[#fff] rounded-[0.625rem] px-[2.125rem] flex flex-col gap-y-7 py-8">
        <div class="flex flex-col gap-y-3">
          <h3>Add Comment</h3>
          <textarea placeholder="Type your comment here" class="bg-[#f7f8fd] pl-6 pt-2 cursor-pointer hover:border-[#4661e6] border placeholder:text-[0.9375rem] w-full h-[4rem] focus:outline-none" v-model="comment" ></textarea>
          <p v-if="isValid" class="text-[#D73737]">invalid comment</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-[0.9375rem] text-[#647196]">{{ charCount }} Characters left</p>
          <button class="text-[#f2f4fe] rounded-[0.625rem] bg-[#AD1FEA] hover:bg-[#C75AF6] font-bold text-[0.875rem] flex items-center justify-center w-[8.875rem] h-[2.75rem]" @click="postComment">Post Comment</button>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { onMounted,computed,ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useFeedbackStore } from '../store'

  const route = useRoute()
  const store = useFeedbackStore()
  const comment = ref('')
  const reply = ref('')
  const isValid = ref<boolean>(false)
  const count = ref<number>(250)

  onMounted(() => {
    store.initializeData()
    count.value = 250 - comment.value.length
  })
  
  const suggestions = computed(() => store.suggestions )
  
  const feedback = computed(() => { 
    return suggestions.value.find((item) => String(item.id) === String(route.params.id))
  })

  const charCount = computed(() => {
    return  250 - comment.value.length
  })
 
  // Use an array to track the visibility of reply sections
  const replyVisibility = ref(Array(feedback.value?.comments.length).fill(false))

  const toggleReply = (index) => {
    // Toggle the visibility of the reply section at the specified index
    replyVisibility.value[index] = !replyVisibility.value[index]
  }

  const postComment = () => {
    if( comment.value.trim() !== '' || charCount.value <= 0 ){
      const productId = parseInt(route.params.id, 10)
      store.postComment(productId, comment.value);
      comment.value  =  ''
      isValid.value = false;
    }else {
      isValid.value = true;
    }
  }

  const postReply = (commentIndex) => {
    if (reply.value.trim() !== '') {
      const productId = parseInt(route.params.id, 10);
      const feedbackIndex = store.productData.findIndex((item) => item.id === productId);

      if (feedbackIndex !== -1 && commentIndex < store.productData[feedbackIndex].comments.length) {
        const commentId = store.productData[feedbackIndex].comments[commentIndex].id;
        store.postReply(productId, commentId, reply.value);

        // Reset the reply and validation state
        reply.value = '';
        isValid.value = false;
      } else {
        console.error(`Invalid commentIndex or feedback item not found.`);
      }
    } else {
      isValid.value = true;
    }
  }
</script>