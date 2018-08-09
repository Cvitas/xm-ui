/* xm  */
import Dialog from '../packages/dialog/index.js';
import MessageBox from '../packages/message-box/index.js';
import Button from '../packages/button/index.js';
import Loading from '../packages/loading/index.js';
import Message from '../packages/message/index.js';
var components = [
  Dialog,
  MessageBox,
  Button,
  Message
];
const install = function(Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;
  components.map(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$loading = Loading;
  Vue.prototype.$message = Message;
};

module.exports = {
  version: '0.0.0.1',
  install,
  Dialog,
  MessageBox,
  Button,
  Message
};
