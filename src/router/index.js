import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import rank from '@/components/rank'
import bookDetails from '@/components/common/bookDetails'
import read from '@/components/common/read'
import clist from '@/components/common/chapterList'
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/rank',
      component: rank,
      children:[
        {
          path:'/rank/:classify',
          component: rank,


        }
      ]
    },

    {
      path:'/bookDetails/:id',
      component:bookDetails,

      /* children:[
       {
         path:'/bookDetails/:id'
       }
     ]*/
    },
    {
      path:'/read/:link',
      component:read,

      /* children:[
       {
         path:'/bookDetails/:id'
       }
     ]*/
    },
    {
      path:'/chapterList',
      component:clist
    }

  ]
})
