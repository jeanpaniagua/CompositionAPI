<template>
  <component
    :is="componentTag"
    :type="componentType"
    :role="ariaConfig.role"
    :class="classes"
    @click="attemptToggle"
  >
    <slot>{{ anchor }}</slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { uiButtonThemeConfigDefaults } from "../assets/theme";
import { ButtonSizeVariant } from "../assets/size-variant";
import { uiButtonAriaDefaults } from "../assets/aria";

export default defineComponent({
  name: "uiButton",
  props: {
    anchor: { type: Boolean, default: false },
    toggle: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    variant: { type: String, required: true },
    size: { type: String as PropType<ButtonSizeVariant>, default: null },
    active: { type: Boolean, default: false },
    ["aria:role"]: { type: String, default: null },
  },
  data() {
    return {
      activeState: this.active,
      theme: uiButtonThemeConfigDefaults,
      ariaConfig: uiButtonAriaDefaults,
    };
  },
  computed: {
    componentTag(): "button" | "a" {
      return this.anchor ? "a" : "button";
    },
    componentType(): "button" | null {
      return this.anchor ? null : "button";
    },
    componentRole(): string | null {
      return this.anchor ? this.ariaConfig.role : null;
    },
    classes(): string[] {
      const sizeClass = this.theme.cssClass.sizes[this.size];
      let variantClass = this.theme.cssClass.variants[this.variant];

      if (this.outline) {
        variantClass = this.theme.cssClass.outlineVariants[this.variant];
      }

      return [
        this.theme.cssClass.main,
        ...(this.variant ? [variantClass] : []),
        ...(this.size ? [sizeClass] : []),
        ...(this.outline ? [this.theme.cssClass.outline] : []),
        ...(this.activeState ? [this.theme.cssClass.active] : []),
      ];
    },
  },
  methods: {
    attemptToggle(): void {
      if (this.toggle) {
        this.activeState = !this.activeState;
        this.$emit("toggle", this.activeState);
        console.log("toggle", this.activeState);
      }
    },
  },
});

//   TAG_NAME,
</script>
