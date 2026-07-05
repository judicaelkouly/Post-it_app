import { createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailsPost from '@/components/DetailsPost.vue'
import AddPost from '@/components/AddPost.vue'
import UpdateNote from '@/components/UpdateNote.vue'


const router = createRouter({
  
    history: createWebHistory(import.meta.env.BASE_URL), 

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/details/:_id',
      name: 'details',
      component: DetailsPost,
    },
     {
      path: '/ajouter',
      name: 'ajouter',
      component: AddPost,
    },
    {
      path: '/edit/:_id',
      name: 'modifier',
      component: UpdateNote,
    },
    // {
    //   path: '/delete',
    //   name: 'Supprimer',
    //   component: DeleteNote,
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DetailsView.vue'),
    },
  ],
})

export default router
