<template>
  <div :class="containerClass" role="separator">
    <div class="p-divider-content" v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'Divider',
  props: {
    align: {
      type: String,
      default: null
    },
    layout: {
      type: String,
      default: 'horizontal'
    },
    type: {
      type: String,
      default: 'solid'
    }
  },
  setup(props) {
    const containerClass = computed(() => [
      'p-divider p-component', 'p-divider-' + props.layout, 'p-divider-' + props.type,
      {'p-divider-left': props.layout === 'horizontal' && (!props.align || props.align === 'left')},
      {'p-divider-center': props.layout === 'horizontal' && props.align === 'center'},
      {'p-divider-right': props.layout === 'horizontal' && props.align === 'right'},
      {'p-divider-top': props.layout === 'vertical' && (props.align === 'top')},
      {'p-divider-center': props.layout === 'vertical' && (!props.align || props.align === 'center')},
      {'p-divider-bottom': props.layout === 'vertical' && props.align === 'bottom'}
    ])
    return {
      containerClass
    }
  }
})
</script>

<style>
.p-divider.p-divider-horizontal:before {
  border-top: 1px gainsboro;
}
.p-divider.p-divider-horizontal .p-divider-content {
  padding: 0 0.5rem;
}
.p-divider.p-divider-vertical:before {
  border-left: 1px #304562;
}
.p-divider.p-divider-vertical .p-divider-content {
  padding: 0.5rem 0;
}
.p-divider-horizontal {
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
}

.p-divider-horizontal:before {
  position: absolute;
  display: block;
  top: 50%;
  left: 0;
  width: 100%;
  content: "";
}

.p-divider-horizontal.p-divider-left {
  justify-content: flex-start;
}

.p-divider-horizontal.p-divider-right {
  justify-content: flex-end;
}

.p-divider-horizontal.p-divider-center {
  justify-content: center;
}

.p-divider-content {
  z-index: 1;
  border: 1px solid gainsboro;
  background: gainsboro;
  border-radius: 10px;
}

.p-divider-vertical {
  min-height: 100%;
  margin: 0 1rem;
  display: flex;
  position: relative;
  justify-content: center;
}

.p-divider-vertical:before {
  position: absolute;
  display: block;
  top: 0;
  left: 50%;
  height: 100%;
  content: "";
}

.p-divider-vertical.p-divider-top {
  align-items: flex-start;
}

.p-divider-vertical.p-divider-center {
  align-items: center;
}

.p-divider-vertical.p-divider-bottom {
  align-items: flex-end;
}

.p-divider-solid.p-divider-horizontal:before {
  border-top-style: solid;
}

.p-divider-solid.p-divider-vertical:before {
  border-left-style: solid;
}

.p-divider-dashed.p-divider-horizontal:before {
  border-top-style: dashed;
}

.p-divider-dashed.p-divider-vertical:before {
  border-left-style: dashed;
}

.p-divider-dotted.p-divider-horizontal:before {
  border-top-style: dotted;
}

.p-divider-dotted.p-divider-horizontal:before {
  border-left-style: dotted;
}
</style>
