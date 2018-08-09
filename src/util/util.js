/**
 * Created by cx on 2017/10/18.
 * Include
 * description
 */
export function merge(target){
    for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }
    return target;
};
export function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
};
export function isVNode(node) {
    return typeof node === 'object' && hasOwn(node, 'componentOptions');
};
export function getFirstComponentChild(children) {
    return children && children.filter(c => c && c.tag)[0];
};
