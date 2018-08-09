<template>
  <button :disabled="disabled" class="xm-button"
    @click="handleClick"
    :type="nativeType"
    :class="[
      type ? 'xm-button--' + type : '',
      size ? 'xm-button--' + size : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
      }
    ]"
  >
    <i class="xm-icon-loading" v-if="loading"></i>
    <i :class="'xm-icon-' + icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
  import "./component.less";
  export default {
    name: 'xm-button',

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
    },

    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
