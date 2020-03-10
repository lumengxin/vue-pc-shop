<template>
  <section class="toast-container">
    <div class="toast" :class="[visible ? 'fade-in': 'fade-out']">
      <span>{{message}}</span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      visible: false
    }
  }
}
</script>

<style lang="scss">
@keyframe fade-in {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframe fade-out {
  0% {
    opacity: 1;
    transform: scale(0.7);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
.toast-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  .toast {
    width: 180px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: pink;
    border-radius: 10px;
    opacity: 0.7;
  }
  .fade-in {
    animation-name: fade-in;
    animation-duration: 0.3s;
    animation-fill-mode: both;
  }
  .fade-out {
    animation-name: fade-out;
    animation-duration: 0.3s;
    animation-fill-mode: both;
  }
}
</style>
