<template>
  <a
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
    class="
      flex flex-col
      w-full
      px-5
      py-[18px]
      bg-white
      rounded-lg
      plugin-shadow
      group
      hover:bg-purple-500
      transition-colors
      select-none
      min-h-[7rem]
    "
  >
    <div class="flex justify-between">
      <h3
        class="font-semibold text-purple-900 transition-colors  group-hover:text-white"
      >
        {{ name }}
      </h3>
      <LinkIcon
        class="w-5 h-5 my-auto -mt-px text-gray-600 transition-colors cursor-pointer  group-hover:text-white"
      />
    </div>
    <div class="flex justify-between mt-auto">
      <p class="my-auto text-gray-700 transition-colors group-hover:text-white">
        {{ `@${author}` }}
      </p>
      <p
        :class="`px-2 py-1 text-sm font-semibold uppercase transition-colors rounded tracking-widest ${stateColor}`"
      >
        {{ state }}
      </p>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "unknown",
    },
  },
  computed: {
    stateColor() {
      switch (this.state) {
        case "unknown":
          return "bg-gray-200 text-gray-700";
        case "wip":
          return "bg-orange-100 text-orange-500";
        case "ready":
          return "text-green-500 bg-green-100";
        case "unsupported":
          return "text-red-500 bg-red-100";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.plugin-shadow {
  box-shadow: 0px 2px 10px rgba(117, 141, 166, 0.214161);
}
</style>
