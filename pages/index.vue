<template>
  <div class="flex flex-col">
    <TheHeader />
    <section
      class="container grid grid-cols-1 px-6 mt-10  sm:px-8 md:px-10 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 justify-items-center"
    >
      <AdvancementCard
        v-for="{ id, attributes } in advancements.data"
        :key="id"
        :percent="attributes.percent"
        :type="attributes.type"
        :title="attributes.title"
        class="w-full max-w-sm"
      />
    </section>
    <section class="container px-6 mt-10 sm:px-8 md:px-10">
      <div class="flex">
        <PuzzleIcon class="w-6 h-6 my-auto" />
        <h1 class="ml-2 text-2xl font-bold">Plugins compatibility</h1>
      </div>
      <input
        type="text"
        placeholder="Search for a plugin..."
        class="
          px-2
          py-1
          mt-3
          mb-5
          text-sm
          font-normal
          border-solid
          rounded-lg
          border-[1px]
          text-blueGray-600
          w-60
          h-10
          border-gray-300
          lg:w-72
        "
      />
      <div class="grid gap-y-4 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3">
        <PluginCard
          v-for="{ id, attributes } in plugins.data"
          :key="id"
          :name="attributes.name"
          :author="attributes.author"
          :link="attributes.link"
          :state="attributes.state"
        />
      </div>
    </section>
    <TheFooter />
  </div>
</template>

<script>
import axios from "axios";
export default {
  async asyncData({ payload, app }) {
    if (payload) return { ready: payload };
    else {
      const advancementsResponse = await axios.get(
        `${process.env.STRAPI_URL}/advancements`
      );

      const pluginsResponse = await axios.get(
        `${process.env.STRAPI_URL}/plugins`
      );
      return {
        advancements: advancementsResponse.data,
        plugins: pluginsResponse.data,
      };
    }
  },
};
</script>

<style></style>
