import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/pages/register'
import Login from '@/pages/login'
import Main from '@/pages/main'

Vue.use(Router)

export default new Router({
  routes: [
		{
			path: '/',
			name: 'login',
			component: Login
		},
    {
      path: '/main',
      name: 'main',
      component: Main
    },
		{
			path: '/register',
			name: 'register',
			component: Register
		}
  ]
})
