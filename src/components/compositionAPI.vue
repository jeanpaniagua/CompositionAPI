<template>
  <component
    :is="componentTag"
    :type="componentType"
    :role="aria.role"
    :class="classes"
    @click="attemptToggle"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  watchEffect,
  ref,
  toRefs,
  PropType,
} from "vue";
import { uiButtonThemeConfigDefaults } from "../assets/theme";
import { ButtonSizeVariant } from "../assets/size-variant";
import { uiButtonAriaDefaults } from "../assets/aria";

const TAG_NAME = "uiButton";

export default defineComponent({
  TAG_NAME,
  props: {
    anchor: { type: Boolean, default: false },
    toggle: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    variant: { type: String, required: true },
    size: { type: String as PropType<ButtonSizeVariant>, default: null },
    active: { type: Boolean, default: false },
    ["aria:role"]: { type: String, default: null },
  },
  emits: ["toggle"],
  setup(props, { emit, attrs }) {
    const { anchor, toggle, outline, variant, size, active } = toRefs(props);
    const activeState = ref(active.value);

    const theme = uiButtonThemeConfigDefaults;

    const ariaConfig = uiButtonAriaDefaults;

    const componentTag = computed((): "button" | "a" => {
      return anchor.value ? "a" : "button";
    });

    const componentType = computed((): "button" | null => {
      return anchor.value ? null : "button";
    });

    const componentRole = computed((): string | null => {
      return anchor.value ? ariaConfig.role : null;
    });

    const classes = computed((): string[] => {
      const sizeClass = theme.cssClass.sizes[size.value];
      let variantClass = theme.cssClass.variants[variant.value];

      console.log(variantClass);

      if (outline.value) {
        variantClass = theme.cssClass.outlineVariants[variant.value];
      }

      return [
        theme.cssClass.main,
        ...(variant.value ? [variantClass] : []),
        ...(size.value ? [sizeClass] : []),
        ...(outline.value ? [theme.cssClass.outline] : []),
        ...(activeState.value ? [theme.cssClass.active] : []),
      ];
    });

    const attemptToggle = (): void => {
      if (toggle.value) {
        activeState.value = !activeState.value;
        emit("toggle", activeState.value);
      }
    };

    watchEffect(() => {
      activeState.value = active.value;
    });

    return {
      activeState,
      componentTag,
      componentType,
      componentRole,
      classes,
      aria: ariaConfig,
      attemptToggle,
    };
  },
});
</script>
