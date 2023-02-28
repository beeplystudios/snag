import slugify from "slugify";

export const customSlugify = (value: string) =>
  slugify(value, { lower: true, remove: /[^a-zA-Z]/g });
