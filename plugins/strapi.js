import Strapi from "strapi-sdk-js";

export default ({ app }, inject) => {
  const strapi = new Strapi({
    url: process.env.STRAPI_URL,
    prefix: "v1",
  });

  inject("strapi", strapi);
};
