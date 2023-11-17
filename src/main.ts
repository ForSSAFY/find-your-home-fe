import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vue Query
import { VueQueryPlugin } from 'vue-query'

// Vuetify
import 'vuetify/styles'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, md } from 'vuetify/iconsets/md'

// Main css
import '@/assets/pretendardvariable.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md
    }
  }
})

const app = createApp(App)

app.use(VueQueryPlugin)
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
