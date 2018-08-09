<template>
    <transition name="msgbox-fade">
        <div class="xm-messgae-box__wrapper" v-show="visible">
            <div class="xm-pr" @click.self="handleWrapperClick">
                <div class="xm-messgae-box">
                    <div class="xm-message-box__header">
                        <div class="xm-message-box__title">{{ title }}</div>
                    </div>
                    <div class="xm-message-box__content" v-if="message !== ''">
                        <div class="xm-message-box__message">
                            <slot><p v-html="message"></p></slot>
                        </div>
                    </div>
                    <div class="xm-message-box__btns">
                        <xm-button
                                :loading="cancelButtonLoading"
                                :class="[ cancelButtonClasses ]"
                                v-show="showCancelButton"
                                @click.native="handleAction('cancel')">
                            {{ cancelButtonText}}
                        </xm-button>
                        <xm-button
                                :type="'confirm'"
                                :loading="confirmButtonLoading"
                                ref="confirm"
                                :class="[ confirmButtonClasses ]"
                                v-show="showConfirmButton"
                                @click.native="handleAction('confirm')">
                            {{ confirmButtonText}}
                        </xm-button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
  import "./component.less";
  export default {
    data() {
      return {
        title:"温馨提示",
        message:"您还不是这家餐厅的会员，<br/>需要成为会员么？",
        cancelButtonText:"取消",
        confirmButtonText:"确认",
        confirmButtonClasses:"",
        cancelButtonClasses:"",
        cancelButtonLoading:"",
        confirmButtonLoading:true,
        showCancelButton:true,
        showConfirmButton:true,
        callback:null,
        visible:false,
      }
    },
    props: {
        modal: {
            default: true
        },
        lockScroll: {
            default: true
        },
        showClose: {
            type: Boolean,
            default: true
        },
        closeOnClickModal: {
            default: true
        },
    },
    watch: {
    },
    computed: {
    },
    methods: {
        doClose() {
            if (!this.visible) return;
            this.visible = false;
            if (this.action) this.callback(this.action, this);
        },
        handleAction(action) {
            this.action = action;
            this.doClose();
        },
        handleWrapperClick(){
            if(this.closeOnClickModal){
                this.handleAction('cancel');
            }
        }
    },
    mounted() {
    }
  };

</script>
