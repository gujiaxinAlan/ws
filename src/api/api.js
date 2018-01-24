/**
 * Created by peter on 2017-09-14.
 */
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
export const get = function (url, params) {
  return new Promise((resolve, reject) => {
    Vue.http.get(url, {params: params})
      .then(res => {
        if (res.data.code === 100) {
          resolve(res);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getWithNoParams = function (url) {
  return new Promise((resolve, reject) => {
    Vue.http.get(url)
      .then(res => {
        if (res.data.code === 100) {
          resolve(res);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};


export const post = function (url, data) {
  return new Promise((resolve, reject) => {
    Vue.http.post(url, data, {
      emulateJSON: false
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};



