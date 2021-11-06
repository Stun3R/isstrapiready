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
      dark:bg-purple-900
      rounded-lg
      plugin-shadow
      group
      hover:bg-purple-500
      dark:hover:bg-purple-600
      transition-colors
      select-none
      min-h-[7rem]
    "
  >
    <div class="flex justify-between">
      <h3
        class="font-semibold text-purple-900 transition-colors  dark:text-white group-hover:text-white"
      >
        {{ name }}
      </h3>
      <LinkIcon
        class="w-5 h-5 my-auto -mt-px text-gray-600 transition-colors cursor-pointer  dark:text-gray-400 group-hover:text-white dark:group-hover:text-gray-400"
      />
    </div>
    <div class="flex justify-between mt-auto">
      <p
        class="my-auto text-gray-700 transition-colors  dark:text-gray-400 group-hover:text-white dark:group-hover:text-gray-400"
      >
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
.dark .plugin-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.plugin-shadow {
  box-shadow: 0px 2px 10px rgba(117, 141, 166, 0.214161);
}
</style>
