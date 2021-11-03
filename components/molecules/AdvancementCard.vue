<template>
  <article
    :class="`
      p-6
      bg-gradient-to-br
      ${gradient}
      rounded-[10px]
      flex`"
  >
    <div>
      <div :class="`flex p-3.5 text-white rounded-full w-14 h-14 ${color}`">
        <BookIcon v-if="type === 'documentation'" class="m-auto" />
        <CodeIcon v-if="type === 'codebase'" class="m-auto" />
        <PuzzleIcon
          v-if="type === 'plugins'"
          class="-mt-0.5 -ml-0.5 w-full h-full"
        />
      </div>
      <p class="mt-3 text-xl font-medium text-white">{{ title }}</p>
    </div>
    <CircleProgress :percent="percent" class="w-24 h-24 my-auto ml-auto" />
  </article>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "documentation",
    },
    percent: {
      type: Number,
      default: 50,
    },
    title: {
      type: String,
      default: "Documentation",
    },
  },
  data() {
    return {
      advancement: {},
    };
  },
  computed: {
    gradient() {
      switch (this.type) {
        case "documentation":
          return "from-strapi-purple-light to-strapi-purple";
        case "codebase":
          return "from-strapi-green-light to-strapi-green";
        case "plugins":
          return "from-strapi-blue-light to-strapi-blue";
      }
    },
    color() {
      switch (this.type) {
        case "documentation":
          return "bg-strapi-purple-dark";
        case "codebase":
          return "bg-strapi-green-dark";
        case "plugins":
          return "bg-strapi-blue-dark";
      }
    },
  },
};
</script>

<style scoped></style>
