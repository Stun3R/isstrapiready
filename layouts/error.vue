<template>
  <div class="flex flex-col">
    <TheHeader class="mb-24" />
    <div class="container flex flex-col items-center justify-center px-6">
      <h1
        v-if="error.statusCode === 404"
        class="text-3xl md:text-[40px] font-bold text-center mb-14 md:mb-16"
      >
        Page not found
      </h1>
      <h1
        v-else
        class="text-3xl md:text-[40px] font-bold text-center mb-14 md:mb-16"
      >
        Something went wrong...
      </h1>
      <div class="md:max-w-[620px] sm:max-w-md">
        <NotFound />
      </div>
      <nuxt-link
        class="
          w-full
          py-5
          mt-24
          md:w-44
          text-[15px]
          leading-4
          text-center text-white
          rounded-xl
          bg-strapi-purple
          hover:scale-105 hover:bg-strapi-purple-dark
          transform
          transition-all
        "
        to="/"
      >
        Back to home
      </nuxt-link>
    </div>
    <TheFooter />
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>
