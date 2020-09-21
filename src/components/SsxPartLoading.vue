<!--
 * @name: SsxPartLoading.vue
 * @author: SunSeekerX
 * @time: 2020-03-17 17:32:31
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-03-17 18:17:45
 -->

<template>
  <section class="load__content">
    <!-- 插入内容 -->
    <slot></slot>
    <!-- loading -->
    <transition name="el-fade-in-linear">
      <div v-if="loading" class="load__content__mask">
        <div class="mask__spinner">
          <svg viewBox="25 25 50 50" class="circular">
            <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
          </svg>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'SsxPartLoading',
  props: {
    loading: {
      default: true,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.load__content {
  width: 100%;
  height: 100%;
  position: relative;
  .load__content__mask {
    position: absolute;
    z-index: 2000;
    background-color: hsla(0, 0%, 100%, 0.9);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity 0.3s;
    .mask__spinner {
      top: 50%;
      margin-top: -21px;
      width: 100%;
      text-align: center;
      position: absolute;
      .circular {
        height: 42px;
        width: 42px;
        animation: loading-rotate 2s linear infinite;
        .path {
          animation: loading-dash 1.5s ease-in-out infinite;
          stroke-dasharray: 90, 150;
          stroke-dashoffset: 0;
          stroke-width: 2;
          stroke: #409eff;
          stroke-linecap: round;
        }
      }
    }
  }
}

@keyframes loading-rotate {
  100% {
    transform: rotate(1turn);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
