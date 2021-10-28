<template>
  <header class="flex flex-col mx-6 mt-8 sm:mx-8 md:mx-10 md:mt-10 sm:flex-row">
    <div>
      <h1 class="text-2xl font-bold sm:text-4xl lg:text-5xl">
        Is <span class="text-strapi-purple">Strapi V4</span> ready?
      </h1>
      <h2
        class="text-gray-400 transition-colors  sm:text-lg dark:text-gray-200 lg:text-xl md:mt-2"
      >
        Follow the latest update from Strapi
      </h2>
    </div>

    <div class="flex items-center mt-2 space-x-2 sm:mt-0 sm:ml-auto">
      <a
        class="w-6 h-6 transition-colors cursor-pointer  sm:w-7 sm:h-7 hover:text-strapi-purple-dark"
        href="http://https://github.com/Stun3R/isstrapiv4ready"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
      </a>
      <div
        class="w-8 h-8 transition-colors cursor-pointer  sm:w-8 sm:h-8 lg:w-9 lg:h-9 hover:text-strapi-purple"
        @click="toggleDark()"
      >
        <template v-if="isDark">
          <MoonIcon />
        </template>
        <template v-else>
          <SunIcon />
        </template>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    toggleDark() {
      this.$colorMode.preference =
        this.$colorMode.preference === "dark" ? "light" : "dark";
    },
  },
  computed: {
    isDark() {
      return this.$colorMode.preference === "dark";
    },
  },
};
</script>

<style></style>
