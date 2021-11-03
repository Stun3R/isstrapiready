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
      <AdvancementCard
        :percent="pluginAdvancement"
        type="plugins"
        title="Listed Plugins"
        class="w-full max-w-sm"
      />
    </section>
    <section class="container px-6 mt-10 sm:px-8 md:px-10">
      <div class="flex">
        <PuzzleIcon class="w-6 h-6 my-auto" />
        <h1 class="ml-2 text-2xl font-bold">Plugins compatibility</h1>
      </div>
      <div class="mb-5">
        <!-- Search -->
        <div class="flex">
          <div class="relative h-10 my-3 rounded-md dark:text-gray-600">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none "
            >
              <SearchIcon class="w-4 h-4" />
            </div>
            <input
              id="search"
              v-model="search"
              type="text"
              name="search"
              class="
                h-10
                border-[1px] border-solid border-gray-300
                px-8
                py-1
                text-sm
                rounded-md
                w-40
                sm:w-60
              "
              placeholder="Search for a plugin..."
            />
            <div
              v-show="search.length > 0"
              @click="search = ''"
              class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer "
            >
              <CloseIcon class="w-4 h-4" />
            </div>
          </div>
          <div class="relative my-auto cursor-pointer group">
            <FilterIcon
              class="w-6 h-6 mx-auto ml-2  md:my-auto group-hover:text-strapi-purple-dark dark:group-hover:text-strapi-purple-light"
            />
            <div
              class="absolute z-10 hidden px-4 text-sm bg-white rounded-md shadow  whitespace-nowrap group-hover:block"
            >
              <div
                class="my-4 cursor-pointer"
                v-for="filter in FILTERS"
                :key="filter.name"
                @click="setFilter(filter)"
              >
                <input
                  class="filter-checkbox"
                  type="checkbox"
                  name="type"
                  :checked="filterBy.indexOf(filter) !== -1"
                />
                <label
                  :class="`p-2 text-xs cursor-pointer font-semibold uppercase transition-colors rounded ${filterColor(
                    filter.value
                  )} `"
                >
                  {{ filter.name }}
                </label>
              </div>
            </div>
          </div>

          <!-- sort -->
          <div
            class="relative justify-end inline-block my-auto ml-auto cursor-pointer  group"
          >
            <span
              class="flex transition-colors  group-hover:text-strapi-purple-dark dark:group-hover:text-strapi-purple-light w-max"
              >{{ sortBy.name }}<ChevronIcon class="w-5 h-5 my-auto ml-2"
            /></span>
            <div
              class="absolute right-0 z-10 hidden py-1 text-sm bg-white rounded-md shadow  group-hover:block whitespace-nowrap dark:text-gray-600"
            >
              <p
                v-for="sort in SORTS"
                :key="sort.name"
                @click="sortBy = sort"
                class="px-6 py-2 transition-colors cursor-pointer  hover:bg-blueGray-100"
                :class="{
                  'bg-strapi-purple-light bg-opacity-10':
                    sort.name === sortBy.name,
                }"
              >
                {{ sort.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- filter -->
        <div class="flex mb-5 text-sm md:text-base">
          <div class="contents" v-if="filterBy.length > 0">
            <p class="flex-none mt-2 mb-auto sm:my-auto sm:mt-auto">
              {{ filterBy.length }}
              {{ filterBy.length > 1 ? "filters" : "filter" }}
            </p>
            <span
              class="
                h-5
                mx-4
                mb-auto
                mt-2
                sm:my-auto sm:mt-auto
                border-l-[1px] border-solid border-blueGray-400
              "
            ></span>
          </div>

          <div class="flex flex-wrap space-x-2 gap-y-2">
            <p
              v-for="(filter, index) in filterBy"
              :key="filter.name"
              :class="`flex p-2 my-auto text-sm font-semibold uppercase transition-colors rounded ${filterColor(
                filter.value
              )} `"
            >
              {{ filter.name }}
              <CloseIcon
                class="w-4 h-4 my-auto ml-2 cursor-pointer text-blueGray-600"
                @click.native="filterBy.splice(index, 1)"
              />
            </p>
          </div>
        </div>
      </div>
      <div class="grid gap-y-4 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3">
        <RequestPlugin />
        <PluginCard
          v-for="{ id, attributes } in filteredPlugins"
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
import _ from "lodash";

const FILTERS = [
  {
    name: "unknown",
    key: "state",
    value: "unknown",
  },
  {
    name: "wip",
    key: "state",
    value: "wip",
  },
  {
    name: "ready",
    key: "state",
    value: "ready",
  },
  {
    name: "unsupported",
    key: "state",
    value: "unsupported",
  },
];

const SORTS = [
  {
    name: "Most recent",
    order: "desc",
    key: "attributes.publishedAt",
  },
  {
    name: "A - Z",
    order: "asc",
    key: "attributes.name",
  },
  {
    name: "Z - A",
    order: "desc",
    key: "attributes.name",
  },
];
export default {
  async asyncData({ payload, $config }) {
    if (payload) return { ready: payload };
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
  data() {
    return {
      search: "",
      SORTS,
      sortBy: SORTS[0],
      FILTERS,
      filterBy: [],
    };
  },
  computed: {
    filteredPlugins() {
      // filter (NAME OR AUTHOR) AND (NO FILTER OR PLUGIN IN FILTER)
      let plugins = this.plugins.data.filter(
        (plugin) =>
          (plugin.attributes.name.includes(this.search.toLowerCase()) ||
            plugin.attributes.author
              .toLowerCase()
              .includes(this.search.toLowerCase())) &&
          (this.filterBy.length === 0 ||
            this.filterBy.some(
              (filter) => filter.value === plugin.attributes[filter.key]
            ))
      );
      plugins = _.orderBy(plugins, [this.sortBy.key], [this.sortBy.order]);
      return plugins;
    },
    pluginAdvancement() {
      const count = this.plugins.data.reduce(
        (count, plugin) =>
          plugin.attributes.state === "ready" ? ++count : count,
        0
      );

      return Math.round((count / this.plugins.meta.pagination.total) * 100);
    },
  },
  methods: {
    filterColor(value) {
      switch (value) {
        case "unknown":
          return "bg-gray-100 text-gray-400";
        case "wip":
          return "bg-orange-50 text-orange-500";
        case "ready":
          return "text-strapi-purple-dark bg-strapi-purple-light bg-opacity-10 dark:bg-white";
        case "unsupported":
          return "text-red-600 bg-red-100";
      }
    },
    setFilter(filter) {
      if (this.filterBy.includes(filter)) {
        const index = this.filterBy.indexOf(filter);
        this.filterBy.splice(index, 1);
      } else {
        this.filterBy.push(filter);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  &-checkbox {
    @apply w-[18px] h-[18px] border border-gray-400 rounded-md appearance-none cursor-pointer my-auto mr-3;
    &:checked {
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      border-color: transparent;
      background-color: #9a4bff;
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
    }
    &-label {
      @apply text-sm font-light cursor-pointer;
    }
  }
}
</style>
