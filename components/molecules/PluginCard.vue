<template>
  <a
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
    class="
      w-full
      px-5
      py-[18px]
      space-y-4
      bg-white
      rounded-lg
      shadow-sm
      group
      hover:bg-strapi-purple-light
      transition-colors
      select-none
    "
  >
    <div class="flex justify-between">
      <h3
        class="font-bold text-gray-500 transition-colors group-hover:text-white"
      >
        {{ name }}
      </h3>
      <LinkIcon
        class="w-5 h-5 my-auto -mt-px text-gray-400 transition-colors cursor-pointer  group-hover:text-white"
      />
    </div>
    <div class="flex justify-between">
      <p
        class="my-auto font-medium transition-colors  text-blueGray-500 group-hover:text-white"
      >
        {{ `@${author}` }}
      </p>
      <p
        :class="`p-2 text-sm font-semibold uppercase transition-colors rounded ${stateColor}`"
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
          return "bg-gray-100 text-gray-400";
        case "wip":
          return "bg-orange-50 text-orange-500";
        case "ready":
          return "group-hover:bg-white text-strapi-purple-dark bg-strapi-purple-light bg-opacity-10";
        case "unsupported":
          return "text-red-600 bg-red-100";
      }
    },
  },
};
</script>

<style></style>
