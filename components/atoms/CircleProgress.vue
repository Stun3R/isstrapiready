<template>
  <div class="relative inline-flex items-center justify-center">
    <svg class="w-24 h-24 -rotate-90">
      <circle
        class="text-white opacity-20"
        stroke-width="8"
        stroke="currentColor"
        fill="transparent"
        :r="circleRadius()"
        cx="50%"
        cy="50%"
      />
      <circle
        class="text-white"
        style="transition: stroke-dashoffset 400ms"
        stroke-width="8"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        stroke-linecap="round"
        stroke="currentColor"
        fill="transparent"
        :r="circleRadius()"
        cx="50%"
        cy="50%"
      />
    </svg>
    <span class="absolute text-lg font-medium text-white">
      {{ currentPercent }}%
    </span>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      currentPercent: 0,
      circumference: 2 * Math.PI * this.circleRadius(),
      offset: 2 * Math.PI * this.circleRadius(),
    };
  },
  mounted() {
    this.updatePercent();
  },
  methods: {
    circleRadius() {
      return 40;
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
        }
      }, delay);
    },
  },
};
</script>

<style></style>
