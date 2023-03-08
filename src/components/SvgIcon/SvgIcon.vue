<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    v-bind="$attrs"
    class="svg-external-icon svg-icon"
  />
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script setup lang="ts">
import { isExternal as external } from '@/utils/validate'
import { toRefs, computed } from 'vue'

const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
})

const { iconClass, className } = toRefs(props)

const isExternal = computed(() => {
  return external(iconClass.value)
})

const iconName = computed(() => {
  return `#icon-${iconClass.value}`
})

const svgClass = computed(() => {
  if (className.value) {
    return 'svg-icon ' + className.value
  } else {
    return 'svg-icon'
  }
})

const styleExternalIcon = computed(() => {
  return {
    mask: `url(${iconClass.value}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${iconClass.value}) no-repeat 50% 50%`,
  }
})
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em; // 继承父元素的font-size大小
  height: 1em;
  overflow: hidden;
  vertical-align: -0.1rem;
  fill: currentcolor;

  &:focus {
    outline: none;
  }

  &:hover {
    color: $bg_m_v !important;
  }

  &.icon-active {
    color: $bg_m_v !important;
  }

  &.icon-16 {
    width: 16px;
    height: 16px;
  }

  &.icon-default-color {
    @include textColor('fc_i_i_v');
  }
}

.svg-external-icon {
  display: inline-block;
  background-color: currentcolor;
  mask-size: cover !important;
}
</style>
