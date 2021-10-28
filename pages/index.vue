<template>
  <div>
    <TheHeader />
    <section
      class="grid grid-cols-1 mx-6 mt-10  md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 justify-items-center"
    >
      <AdvancementCard
        v-for="{ attributes } in advancements.data"
        :key="attributes.id"
        :percent="attributes.percent"
        :type="attributes.type"
        :title="attributes.title"
        class="w-full max-w-sm"
      />
    </section>
    <section class="mx-6 mt-10"></section>
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
      return { advancements: advancementsResponse.data };
    }
  },
};
</script>

<style></style>
