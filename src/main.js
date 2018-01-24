// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'normalize.css/normalize.css';
import VueResource from 'vue-resource';
import 'bootstrap/dist/css/bootstrap.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Jquery from 'jquery';
window.$ = Jquery;
Vue.use(ElementUI);
Vue.use(iView);
Vue.use(VueResource);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
