import './public-path'
import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import { store as commonStore } from './common'
import store from './store'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
let instance = null

function render (props = {}) {
  const { container, routerBase } = props
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: 'history',
    routes
  })

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  // This is an environment for sub-applications to run independently and implement the login logic of sub-applications

  // When run independently, it also registers a Store Module called Global
  commonStore.globalRegister(store)
  // After the simulated login, the user information is stored in the Global Module
  const userInfo = { name: 'I am independent running when the name is Kitty' } // Assume that the user information is obtained after login
  store.commit('global/setGlobalState', { user: userInfo })

  render()
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props) {
  console.log('[vue] props from main framework', props)

  commonStore.globalRegister(store, props)

  render(props)
}

export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
