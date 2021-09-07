import Vue from 'vue'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)


Vue.config.productionTip = false

new Vue({
  vuetify: new Vuetify(
      {
        theme: {
          themes: {
            light: {
              primary: '#3f51b5',
              secondary: '#b0bec5',
              accent: '#8c9eff',
              error: '#b71c1c',
            },
          },
        },
      }
  ),

  render: h => h(App),
}).$mount('#app')

