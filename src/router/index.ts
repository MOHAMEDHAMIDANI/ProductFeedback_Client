import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import  RoadmapBoard     from '../views/RoadmapBoard.vue'
import  FeedbackDetail   from '../views/FeedbackDetail.vue'
import  SuggestionsBoard from '../views/SuggestionsBoard.vue'
import  CreateFeedback   from '../views/CreateFeedback.vue'
import  EditFeedback   from '../views/EditFeedback.vue'


const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'home', component: SuggestionsBoard},
    { path: '/roadmap', name: 'roadmap', component: RoadmapBoard},
    { path: '/createfeedback', name: 'createfeedback', component: CreateFeedback},
    { path: '/feedbackdetail/:id', name: 'feedback-detail', component: FeedbackDetail, props:true },
    { path: '/editfeedback/:id', name: 'editfeedback', component: EditFeedback, props:true}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})    

export default router