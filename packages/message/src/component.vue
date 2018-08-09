<template>
  <transition name="xm-message-fade">
    <div
      class="xm-message"
      :class="[customClass,typeImg]"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
        <!--<img class="xm-message__img" :src="typeImg" alt="" v-if="!iconClass">-->
      <div class="xm-message__group" :class="{ 'is-with-icon': iconClass }">
        <p><i class="xm-message__icon" :class="iconClass" v-if="iconClass"></i>{{ message }}</p>
        <div v-if="showClose" class="xm-message__closeBtn xm-icon-close" @click="close"></div>
      </div>
    </div>
  </transition>
</template>
<style></style>
<script type="text/babel">
  import "./component.less";
  export default {
    data() {
      return {
        visible: false,
        message: '',
        duration: 3000,
        type: 'info',
        iconClass: '',
        customClass: '',
        onClose: null,
        showClose: false,
        closed: false,
        timer: null
      };
    },

    computed: {
      typeImg() {
        return this.type;
      }
    },

    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
          this.$el.addEventListener('transitionend', this.destroyElement);
        }
      }
    },

    methods: {
      destroyElement() {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      },

      clearTimer() {
        clearTimeout(this.timer);
      },

      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
      }
    },

    mounted() {
      this.startTimer();
    }
  };
</script>
