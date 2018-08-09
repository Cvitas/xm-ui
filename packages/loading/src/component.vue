<template>
  <transition name="xm-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="xm-loading-mask"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="xm-loading-spinner">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
        <p v-if="text" class="xm-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  import "./component.less";
  export default {
    data() {
      return {
        text: null,
        fullscreen: true,
        visible: false,
        customClass: ''
      };
    },
    methods: {
      handleAfterLeave() {
      },
      setText(text) {
        this.text = text;
      }
    }
  };
</script>
