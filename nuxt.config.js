import axios from "axios";
const url = "https://isstrapiv4ready.com";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  server: {
    host: "0.0.0.0",
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  loading: {
    color: "#9A4BFF",
  },

  publicRuntimeConfig: {
    strapiURL: process.env.STRAPI_URL || "http://localhost:1337/v1",
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Is Strapi v4 Ready?",
    htmlAttrs: {
      lang: "en",
    },
    bodyAttrs: {
      class: [
        "bg-gray-50 dark:bg-gray-900 text-gray-500 font-body dark:text-white transition-colors min-h-screen",
      ],
    },
    meta: [
      { hid: "charset", charset: "utf-8" },
      {
        hid: "viewport",
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      // Open Graph
      { hid: "og:type", property: "og:type", content: "website" },
      { hid: "og:url", property: "og:url", content: url },
      { hid: "og:image", property: "og:image", content: `${url}/preview.png` },
      // Twitter Card
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: `${url}/preview.png`,
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/poppins.css", "~/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    "~/components/templates",
    "~/components/atoms",
    "~/components/atoms/icons",
    "~/components/molecules",
    "~/components/organisms",
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/color-mode",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    // https://pwa.nuxtjs.org
    "@nuxtjs/pwa",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  colorMode: {
    preference: "light",
    classSuffix: "",
  },

  pwa: {
    manifest: {
      name: "Is Strapi v4 Ready?",
      description:
        "Discover the advancement of Strapi for v4 and the list of compatible plugins",
      theme_color: "#9A4BFF",
    },
  },

  generate: {
    crawler: true,
    fallback: true,
    routes: async () => {
      const advancements = await axios.get(
        `${process.env.STRAPI_URL}/advancements`
      );

      const plugins = await axios.get(`${process.env.STRAPI_URL}/plugins`);

      return [
        {
          route: "/",
          payload: {
            advancements: advancements.data,
            plugins: plugins.data,
          },
        },
      ];
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
