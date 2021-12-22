import axios from "axios";
const url = "https://isstrapiready.com";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  server: {
    host: "0.0.0.0",
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  loading: {
    color: "#1f1d80",
  },

  publicRuntimeConfig: {
    strapiURL: process.env.STRAPI_URL || "http://localhost:1337/v1",
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Is Strapi Ready?",
    htmlAttrs: {
      lang: "en",
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
  plugins: ["~/plugins/strapi"],

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
    // https://github.com/nuxt-community/netlify-files-module
    "@nuxtjs/netlify-files",
    // https://github.com/nuxt-community/robots-module
    "@nuxtjs/robots",
    // https://sitemap.nuxtjs.org/fr
    "@nuxtjs/sitemap",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  colorMode: {
    preference: "light",
    classSuffix: "",
  },

  pwa: {
    manifest: {
      name: "Is Strapi Ready?",
      description:
        "Discover the advancement of Strapi for v4 and the list of compatible plugins",
      theme_color: "#1f1d80",
    },
  },

  generate: {
    crawler: true,
    fallback: true,
    routes: async () => {
      const advancements = await app.$strapi.find("advancements");

      const versions = await app.$strapi.find("versions");

      const plugins = await app.$strapi.find("plugins", {
        pagination: {
          limit: -1,
        },
      });

      return [
        {
          route: "/",
          payload: {
            advancements,
            plugins,
            version: versions.data[0],
          },
        },
      ];
    },
  },

  // robots.txt generation
  robots: () => {
    if (process.env.CONTEXT !== "production") return { Disallow: "/" };
    return {
      Sitemap: "https://isstrapiready.com/sitemap.xml",
    };
  },

  // Sitemap generation
  sitemap: () => {
    if (process.env.CONTEXT !== "production") return false;
    return {
      path: "/sitemap.xml",
      hostname: "https://isstrapiready.com",
      cacheTime: 1000 * 60 * 15,
      trailingSlash: true,
      gzip: true,
      defaults: {
        lastmod: new Date(),
      },
    };
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
