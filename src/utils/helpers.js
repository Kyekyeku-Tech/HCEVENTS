/* ===============================
   STRING HELPERS
================================ */

/**
 * Convert text to URL-friendly slug
 * @example "Wedding Design" → "wedding-design"
 */
export const slugify = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Capitalize first letter
 */
export const capitalize = (text = "") =>
  text.charAt(0).toUpperCase() + text.slice(1);

/* ===============================
   DATE HELPERS
================================ */

/**
 * Format Firestore timestamp or date string
 */
export const formatDate = (date) => {
  if (!date) return "";

  const d =
    typeof date === "string"
      ? new Date(date)
      : date.toDate
      ? date.toDate()
      : new Date(date);

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/* ===============================
   ARRAY HELPERS
================================ */

/**
 * Group array by key
 */
export const groupBy = (array = [], key) =>
  array.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

/* ===============================
   SAFETY HELPERS
================================ */

/**
 * Check if value is empty
 */
export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  value === "" ||
  (Array.isArray(value) && value.length === 0);
