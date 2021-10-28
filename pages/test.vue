<template>
  <div class="flex flex-col items-center justify-center mx-6">
    <h2 class="text-3xl font-bold text-center mb-14">Page not found</h2>
    <div class="max-w-4xl">
      <NotFound />
    </div>
    <nuxt-link
      class="
        w-full
        py-5
        mt-40
        text-[15px]
        leading-4
        text-center text-white
        rounded-xl
        bg-strapi-purple
      "
      to="/"
    >
      Back to home
    </nuxt-link>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
