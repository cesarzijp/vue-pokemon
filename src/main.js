import './assets/main.css'

import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { firebaseApp } from '/firebase'

const app = createApp(App)

app.use(VueFire, {
  firebaseApp,
  modules: [
    // ... other modules
    VueFireAuth()
  ]
})

app.use(createPinia())
app.use(router)

app.mount('#app')
