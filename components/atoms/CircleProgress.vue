<template>
  <div class="relative inline-flex items-center justify-center">
    <svg v-bind="svgAttr">
      <circle
        class="text-white opacity-20"
        :stroke-width="borderWidth"
        stroke="currentColor"
        fill="transparent"
        :r="circleRadius()"
        :cx="size"
        :cy="size"
      />
      <circle
        class="text-white"
        style="transition: stroke-dashoffset 400ms"
        :stroke-width="borderWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        stroke-linecap="round"
        stroke="currentColor"
        fill="transparent"
        :r="circleRadius()"
        :cx="size"
        :cy="size"
      />
    </svg>
    <span class="absolute text-lg font-medium text-white">
      {{ currentPercent }}%
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPercent: 0,
      offset: 2 * Math.PI * this.circleRadius(),
      circumference: 2 * Math.PI * this.circleRadius(),
    };
  },
  props: {
    percent: {
      type: Number,
      default: 50,
    },
    size: {
      type: Number,
      default: 100,
    },
    borderWidth: {
      type: Number,
      default: 8,
    },
  },
  computed: {
    svgAttr() {
      return {
        class: "overflow-visible -rotate-90",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `${this.size / 2} ${this.size / 2} ${this.size} ${this.size}`,
      };
    },
  },
  mounted() {
    this.updatePercent();
  },
  methods: {
    circleRadius() {
      return (this.size - this.borderWidth) * 0.5;
    },
    updatePercent() {
      const circumference = 2 * Math.PI * this.circleRadius();
      this.offset = circumference - (circumference * this.percent) / 100;
      const newPercent = Math.round(100 - (100 / circumference) * this.offset);
      this.animateValue(newPercent);
    },
    animateValue(to) {
      const step = to - this.currentPercent;
      const delay = 400 / Math.abs(step);
      const counter = setInterval(() => {
        if (step > 0) {
          this.currentPercent += 1;
          if (this.currentPercent >= to) {
            clearInterval(counter);
          }
        } else {
          this.currentPercent -= 1;
          if (this.currentPercent <= to) {
            clearInterval(counter);
          }
        }
      }, delay);
    },
  },
};
</script>

<style></style>
