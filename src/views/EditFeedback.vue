<script setup lang="ts">
    import { RouterLink,useRoute,useRouter } from 'vue-router'
    import { ref,computed,onMounted } from 'vue';
    import navDown from '../assets/icon-arrow-down.svg'
    import navUp from '../assets/icon-arrow-up.svg'
    import tick from '../assets/option-tick.svg'
    import { useFeedbackStore } from '../store'


    const store = useFeedbackStore()
    const router = useRouter()
    const route = useRoute()

    onMounted(() => {
        store.initializeData()
    })

    const suggestions = computed(() => store.suggestions ) 
    const feedback = computed(() => { 
        return suggestions.value.find((item) => String(item.id) === String(route.params.id))
    })


    const category = ref<string | undefined >(feedback.value?.category)
    const status = ref<string | undefined >(feedback.value?.status)
    const isValid = ref<boolean>(false)
    const isCateVisible = ref<boolean>(false)
    const isStateVisible = ref<boolean>(false)
    const cateOptions = (option: string) =>{ 
        category.value = option
    }
    const stateOptions = (option: string) =>{ 
        status.value = option
    }
      

    
    const deleteFeedback = () => {
        const feedbackId = parseInt(String(route.params.id), 10);
        store.deleteFeedback(feedbackId) 
        router.push('/')
    }

    const updateFeedback = () => {
        const feedbackId = parseInt(String(route.params.id), 10);
        store.updateFeedback(feedbackId, {
            title: feedback.value?.title,
            category: feedback.value?.category,
            status: feedback.value?.status,
            description: feedback.value?.description
        })
        router.push({ name: 'feedback-detail', params: { id: feedbackId} })
    }
    
    const cancelFeedback = () => {
        const feedbackId = parseInt(String(route.params.id), 10);
        if (feedback.value) {
            category.value = feedback.value.category;
            status.value = feedback.value.status;
            router.push({ name: 'feedback-detail', params: { id: feedbackId} })                      
        }
    }
    
</script>

<template>
    <section class="flex justify-center items-center desktop:w-full tablet:w-full mobile:w-full">
        <div class="flex flex-col gap-y-[0.85rem] mobile:mt-[2.125rem] mobile:mb-[4.8125rem] mobile:mx-auto">
            <header class="flex gap-2 items-center" v-once>
                <img src="../assets/icon-arrow-left.svg" alt="back-nav" class="w-2 "/>
                <router-link :to="{ name: 'feedback-detail', params: { id: feedback?.id}}" class="text-[#647196] font-bold text-[0.875rem]" >Go Back</router-link>
            </header>
            <main class=" desktop:w-[33.75rem] tablet:w-[33.75rem] mobile:w-[20.4375rem]">
                <img src="../assets/icon-edit-feedback.svg" alt="" class="relative -bottom-[1.6rem] left-[3.5rem] mobile:w-[2.5rem] mobile:left-[1.7rem]"/>
                <div class="px-[2.625rem] mobile:px-6 py-[2.8125rem] bg-[#fff] w-full rounded-[0.625rem] h-full flex flex-col gap-y-[2.5rem] mobile:gap-y-10">
                    <h2 class="text-[#3a4374] text-[1.5rem] font-bold mobile:text-[1.125rem]">Editing '{{ feedback?.title }}'</h2>
                    <div class="flex flex-col gap-y-6" v-if="feedback">
                        <div class="flex flex-col gap-y-4">
                            <h4 class="text-[#3a4374] text-[0.875rem] font-bold">Feedback Title</h4>
                            <p class="text-[#647196] text-[0.875rem] ">Add a short, descriptive headline</p>
                            <input type="text" class="rounded-[0.3125rem] bg-[#f7f8fd] h-[3rem] focus:outline-none px-6 hover:border hover:border-[#4661e6]  w-full text-[#3a4374] text-[0.9375rem]" :class="isValid ? 'border border-[#D73737]' : ''" v-model="feedback.title">
                        </div>    
                        <div class="flex flex-col gap-y-4" id="choose-category">
                            <div>
                                <h4 class="text-[#3a4374] text-[0.875rem] font-bold">Category</h4>
                                <p class="text-[#647196] text-[0.875rem] ">Choose a category for your feedback</p>
                            </div>
                            <div class="flex flex-col gap-y-4">
                                <div class="w-[28.5rem] mobile:w-full h-[3rem] bg-[#f7f8fd] flex items-center hover:border hover:border-[#4661e6] rounded-[0.3125rem] px-6 cursor-pointer justify-between" @click=" isCateVisible = !isCateVisible">
                                    <span class="text-[#3a4374] text-[0.9375rem]">  {{ category }} </span>
                                    <img :src="navUp" alt="arrow-up"  v-if="isCateVisible"/>
                                    <img :src="navDown" alt="arrow-down"  v-else />
                                </div>
                                <div class="bg-[#fff] absolute top-[33.7rem] w-[28.5rem] mobile:w-full  shadow-[0_10px_40px_-7px_rgba(55,63,104,0.35)] h-[15rem] children:h-[2.9375rem] rounded-[0.625rem] " v-if="isCateVisible">
                                    <div class="flex px-6 items-center justify-between border-b  cursor-pointer" @click="cateOptions('Feature')">
                                        <h3 class="text-[1rem] text-[#647196]">Feature</h3>
                                        <img :src="tick" alt="tick" :class=" category === 'Feature' ? 'block': 'hidden' "/>
                                    </div>
                                    <div class="flex px-6 items-center justify-between border-b cursor-pointer" @click="cateOptions('UI')">
                                        <h3 class="text-[1rem] text-[#647196]">UI</h3>
                                        <img :src="tick" alt="tick" :class=" category === 'UI' ? 'block': 'hidden' "/>
                                    </div>
                                    <div class="flex px-6 items-center justify-between border-b cursor-pointer" @click="cateOptions('UX')">
                                        <h3 class="text-[1rem] text-[#647196]">UX</h3>
                                        <img :src="tick" alt="tick" :class=" category === 'UX' ? 'block': 'hidden' "/>
                                    </div>
                                    <div class="flex px-6 items-center justify-between cursor-pointer border-b " @click="cateOptions('Enhancement')">
                                        <h3 class="text-[1rem] text-[#647196]">Enhancement</h3>
                                        <img :src="tick" alt="tick" :class=" category === 'Enhancement' ? 'block': 'hidden' "/>
                                    </div>
                                    <div class="flex px-6 items-center justify-between cursor-pointer" @click="cateOptions('Bug')">
                                        <h3 class="text-[1rem] text-[#647196]">Bug</h3>
                                        <img :src="tick" alt="tick" :class=" category === 'Bug' ? 'block': 'hidden' "/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-y-4" id="choose-status">
                            <div>
                                <h4 class="text-[#3a4374] text-[0.875rem] font-bold">Update Status</h4>
                                <p class="text-[#647196] text-[0.875rem] ">Change a feature state </p>
                            </div>
                            <div class="flex flex-col gap-y-4">
                                <div class="w-[28.5rem] h-[3rem] mobile:w-full bg-[#f7f8fd] flex items-center hover:border hover:border-[#4661e6] rounded-[0.3125rem] px-6 cursor-pointer justify-between" @click=" isStateVisible = !isStateVisible">
                                    <span class="text-[#3a4374] text-[0.9375rem]">  {{ status }} </span>
                                    <img :src="navUp" alt="arrow-up"  v-if="isStateVisible"/>
                                    <img :src="navDown" alt="arrow-down"  v-else />
                                </div>
                                <div class="bg-[#fff] absolute top-[42rem] w-[28.5rem]  shadow-[0_10px_40px_-7px_rgba(55,63,104,0.35)] children:h-[2.9375rem] rounded-[0.625rem] " v-if="isStateVisible">
                                    <div class="flex px-6 items-center justify-between border-b cursor-pointer" @click="stateOptions('Suggestions')">
                                        <h3 class="text-[1rem] text-[#647196]">Suggestions</h3>
                                        <img :src="tick" alt="tick" :class=" status === 'Suggestions' ? 'block': 'hidden' "/>
                                    </div>
                                    <div class="flex px-6 items-center justify-between border-b  cursor-pointer" @click="stateOptions('planned')">
                                        <h3 class="text-[1rem] text-[#647196]">Planned</h3>
                                        <img :src="tick" alt="tick" :class=" status === 'Planned' ? 'block': 'hidden' "/>
                                    </div>
                                    <div class="flex px-6 items-center justify-between cursor-pointer border-b " @click="stateOptions('in-progress')">
                                        <h3 class="text-[1rem] text-[#647196]">In-progress</h3>
                                        <img :src="tick" alt="tick" :class=" status === 'In-progress' ? 'block': 'hidden' "/>
                                    </div>
                                    <div class="flex px-6 items-center justify-between cursor-pointer" @click="stateOptions('live')">
                                        <h3 class="text-[1rem] text-[#647196] ">Live</h3>
                                        <img :src="tick" alt="tick" :class=" status === 'Live' ? 'block': 'hidden' "/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-y-4">
                            <div>
                                <h4 class="text-[#3a4374] text-[0.875rem] font-bold">Feedback Detail</h4>
                                <p class="text-[#647196] text-[0.875rem] ">Include any specific comments on what should be improved, added, etc.</p>
                            </div>
                            <textarea v-model="feedback.description" :class="isValid ? 'border border-[#D73737]' : ''"   class="h-[6rem] mobile:h-[7.5rem] rounded-[0.3125rem] bg-[#f7f8fd] focus:outline-none px-6 py-2 text-[#3a4374] text-[0.9375rem]" rows="4" ></textarea>
                            <p class="text-[#D73737]" v-if="isValid">Can't be empty</p>
                        </div>
                    </div>
                    <div class="flex gap-4 justify-between mobile:flex-col-reverse" v-once>
                        <button class="h-[2.75rem] px-6 bg-[#D73737] rounded-[0.625rem] flex items-center justify-center text-[#f2f4fe] font-bold" @click="deleteFeedback">Delete</button>
                        <div class="flex justify-between mobile:flex-col-reverse gap-4 mobile:gap-y-4">
                            <button class="h-[2.75rem] px-6 bg-[#3a4374] rounded-[0.625rem] flex items-center justify-center text-[#f2f4fe] font-bold" @click="cancelFeedback">cancel</button>
                            <button class="h-[2.75rem] px-6 bg-[#AD1FEA] rounded-[0.625rem] flex items-center justify-center text-[#f2f4fe] font-bold" @click="updateFeedback">Save changes</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </section>
</template>


