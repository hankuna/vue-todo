import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'
import Router from 'vue-router'
import Todo from '@/components/todo/Todoo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Todo',
      component: Todo
    }
  ]
})
