import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'

// Import Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'jquery/dist/jquery'

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faCheck, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import Global CSS
import './assets/css/global.css'

Vue.use(BootstrapVue)

library.add(faStar, faCheck, faHeart)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.prototype.$api = axios


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
