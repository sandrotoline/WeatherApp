import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CityView from '../views/CityView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        title:"Home",
      }
    },
    {
      path: '/weather/:state/:city/:country',
      name: 'cityView',
      component: CityView,
      meta:{
        title:"Weather",
      }
    },
  ]
});

router.beforeEach((to, from, next) =>{
  document.title = `${to.params.state ? `${to.params.city}, ${to.params.country}` : to.meta.title} - Weather App`;
  next();
});

export default router
