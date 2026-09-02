import categories from "../data/categories.json";
import products from "../data/products.json";

export const getCategories = () => categories;

export const getCategory = (slug) => categories.find((c) => c.slug === slug);

export const getCategoryCount = (slug) =>
  products.filter((p) => p.category === slug).length;

export const getProducts = () => products;

export const getProduct = (slug) => products.find((p) => p.slug === slug);

export const getProductsByCategory = (slug) =>
  products.filter((p) => p.category === slug);

export const getFeatured = (count = 4) =>
  products.filter((p) => p.featured).slice(0, count);

export const getRelated = (product, count = 4) => {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  );
  if (sameCategory.length >= count) return sameCategory.slice(0, count);
  const sameSeries = products.filter(
    (p) =>
      p.series === product.series &&
      p.slug !== product.slug &&
      !sameCategory.includes(p)
  );
  return [...sameCategory, ...sameSeries].slice(0, count);
};

export const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
