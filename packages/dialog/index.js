import XmDialog from './src/component';

/* istanbul ignore next */
XmDialog.install = function(Vue) {
  Vue.component(XmDialog.name, XmDialog);
};
export default XmDialog;
