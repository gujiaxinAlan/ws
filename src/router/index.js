import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import Search from '@/components/search';
import List from '@/components/list';
import Detail from '@/components/detail';
import SemanticList from '@/components/semanticList';
import SemanticDetail from '@/components/semanticDetail';
import {Message} from 'element-ui';

Vue.use(Router);
Vue.use(VueResource);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/search'
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
   /* {
      path: '/list/:keywords',
      name: 'list',
      component: List
    },*/
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/semanticList',
      name: 'semanticList',
      component: SemanticList
    },
    {
      path: '/semanticdetail/:id',
      name: 'semanticDetail',
      component: SemanticDetail
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

Vue.http.interceptors.push((req, next) => {
  next(res => {
    let status = res.status + '';
    if (status.startsWith('4')) {
      Message({
        message: '请求错误',
        type: 'error'
      });
    } else if (status.startsWith('5')) {
      Message({
        message: '服务错误',
        type: 'error'
      });
    }
    return res;
  });
});
