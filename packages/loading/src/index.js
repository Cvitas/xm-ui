import Vue from 'vue';
import loadingVue from './component.vue';
import {merge} from '../../../src/util/util';

const LoadingConstructor = Vue.extend(loadingVue);
let instance;
const defaults = {
  text: "",
};
const initInstance = ()=>{
  instance = new LoadingConstructor({
    el: document.createElement('div')
  });
  document.body.appendChild(instance.$el);
};

LoadingConstructor.prototype.close = function() {
  this.visible = false;
};
const Loading = (options = {}) => {
  if (Vue.prototype.$isServer) return;
  if(!instance){
    initInstance();
  }
  options = merge({}, defaults, options);
  for (let prop in options) {
    if (options.hasOwnProperty(prop)) {
      instance[prop] = options[prop];
    }
  }
  Vue.nextTick(() => {
    instance.visible = true;
  });
  return instance;
};

export default Loading;
