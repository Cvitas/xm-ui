/**
 * Created by cx on 2017/10/17.
 * Include
 * description
 */
const defaults = {
    title:"温馨提示",
    message:"",
    cancelButtonText:"取消",
    confirmButtonText:"确认",
    modalFade:true,
    beforeClose:null,
};
import Vue from 'vue';
import msgboxVue from './component.vue';
import {merge,isVNode} from '../../../src/util/util';
let instance,currentMsg;
let msgQueue = [];
const MessageBoxConstructor = Vue.extend(msgboxVue);

const MessageBox = function(options, callback) {
    if (Vue.prototype.$isServer) return;
    if (typeof options === 'string') {
        options = {
            message: options
        };
        if (arguments[1]) {
            options.title = arguments[1];
        }
    }else if (options.callback && !callback) {
        callback = options.callback;
    }
    if (typeof Promise !== 'undefined') {
        return new Promise((resolve, reject) => {
            msgQueue.push({
                options: merge({}, defaults, MessageBox.defaults, options),
                callback: callback,
                resolve: resolve,
                reject: reject
            });
            showNextMsg();
        });
    }else{
        msgQueue.push({
            options: merge({}, defaults, MessageBox.defaults, options),
            callback: callback
        });

        showNextMsg();
    }
};

const initInstance = () => {
    instance = new MessageBoxConstructor({
        el: document.createElement('div')
    });

    instance.callback = defaultCallback;
};

const defaultCallback = action => {
    if (currentMsg) {
        let callback = currentMsg.callback;
        if (typeof callback === 'function') {
            callback(action);
        }
        if (currentMsg.resolve) {
            let $type = currentMsg.options.$type;
            if ($type === 'confirm') {
                if (action === 'confirm') {
                    currentMsg.resolve(action);
                } else if (action === 'cancel' && currentMsg.reject) {
                    currentMsg.reject(action);
                }
            } else {
                currentMsg.resolve(action);
            }
        }
    }
};

const showNextMsg = () => {
    if (!instance) {
        initInstance();
    }
    instance.action = '';
    if (!instance.visible) {
        if (msgQueue.length > 0) {
            currentMsg = msgQueue.shift();

            let options = currentMsg.options;
            for (let prop in options) {
                if (options.hasOwnProperty(prop)) {
                    instance[prop] = options[prop];
                }
            }
            if (options.callback === undefined) {
                instance.callback = defaultCallback;
            }

            let oldCb = instance.callback;
            instance.callback = (action, instance) => {
                oldCb(action, instance);
                showNextMsg();
            };
            if (isVNode(instance.message)) {
                instance.$slots.default = [instance.message];
                instance.message = null;
            } else {
                delete instance.$slots.default;
            }
            ['modal', 'closeOnClickModal'].forEach(prop => {
                if (instance[prop] === undefined) {
                    instance[prop] = true;
                }
            });
            document.body.appendChild(instance.$el);
            Vue.nextTick(() => {
                instance.visible = true;
            });
        }
    }
};

MessageBox.alert = (message, title, options) => {
    if (typeof title === 'object') {
        options = title;
        title = '';
    }
    return MessageBox(merge({
        title: title,
        message: message,
        $type: 'alert',
        showCancelButton: false,
        closeOnClickModal: false,
        confirmButtonClasses:"alert-confirm",
        confirmButtonText:"好的"
    }, options));
};
MessageBox.confirm = (message, title, options) => {
    if (typeof title === 'object') {
        options = title;
        title = '';
    }
    return MessageBox(merge({
        title: title,
        message: message,
        $type: 'confirm',
        showCancelButton: true
    }, options));
};

export default MessageBox;
export { MessageBox };