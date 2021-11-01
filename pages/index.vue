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
        <h2 class="ml-2 text-2xl font-bold">Plugins compatibility</h2>
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
        <RequestPlugin />
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
  async asyncData({ payload, $config }) {
    if (payload) return { ...payload };
    else {
      const advancementsResponse = await axios.get(
        `${$config.strapiURL}/advancements`
      );

      const pluginsResponse = await axios.get(`${$config.strapiURL}/plugins`);
      return {
        advancements: advancementsResponse.data,
        plugins: pluginsResponse.data,
      };
    }
  },
  head() {
    const title = "Is Strapi v4 Ready?";
    const description =
      "Discover the advancement of Strapi for v4 and the list of compatible plugins.";

    return {
      title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:site_name", property: "og:site_name", content: title },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
        // Twitter Card
        { hid: "twitter:title", name: "twitter:title", content: title },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        { hid: "twitter:image:alt", name: "twitter:image:alt", content: title },
      ],
    };
  },
};
</script>

<style></style>
