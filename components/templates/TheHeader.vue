<template>
  <header
    class="container flex flex-col px-6 pt-8  sm:px-8 md:px-10 md:pt-10 sm:flex-row"
  >
    <div>
      <nuxt-link to="/">
        <h1 class="text-3xl font-bold sm:text-4xl lg:text-[2.5rem]">
          Is <span class="text-strapi-purple">Strapi v4</span> ready?
        </h1>
      </nuxt-link>
      <h2
        class="text-gray-400 transition-colors  sm:text-lg dark:text-gray-200 md:mt-1"
      >
        Follow the latest update from Strapi
      </h2>
    </div>

    <div class="flex items-center mt-2 space-x-2 sm:mt-0 sm:ml-auto">
      <a
        class="w-6 h-6 transition-colors cursor-pointer  hover:text-strapi-purple-dark"
        href="https://github.com/Stun3R/isstrapiv4ready"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
      </a>
      <div
        class="w-8 h-8 transition-colors cursor-pointer  hover:text-strapi-purple"
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
