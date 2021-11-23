<template>
  <div class="bg-purple-500 rounded-[10px]">
    <div class="px-3 py-3 mx-auto max-w-7xl sm:px-4">
      <div class="flex flex-wrap items-center justify-between">
        <div class="flex items-center">
          <span class="flex p-2 bg-purple-400 rounded-lg">
            <AlertIcon class="w-6 h-6 text-white" aria-hidden="true" />
          </span>
          <p class="ml-3 font-medium text-white truncate">
            <span class="lg:hidden"> Strapi {{ name }} is released!</span>
            <span class="hidden lg:inline">
              Big news! We're excited to announce you that Strapi
              {{ name }} is released.
            </span>
          </p>
        </div>
        <div class="flex-shrink-0 w-full mt-2 sm:mt-0 sm:w-auto">
          <a
            href="#"
            class="flex items-center justify-center px-4 py-2 text-sm font-medium text-purple-500 bg-white border border-transparent rounded-md shadow-sm  hover:bg-gray-100"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>