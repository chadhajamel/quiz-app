import { createMemoryHistory, createRouter } from 'vue-router'
import HomeView from '../src/components/HomeView.vue'
import QuizView from '../src/components/QuizView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/quiz', component: QuizView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router  