// Get an Array of Past Seven Days
const pastWeek = [...Array(7).keys()].map(
  (days) => new Date(Date.now() - 86400000 * days)
);

// Remove Duplicateds in an Array
const removeDuplicates = (arr) => [...new Set(arr)];

// Get the Average of an Array of Number
const average = (arr) => arr.reduce((a, b) => a + b) / arr.length;

// Round Decimals to a Certain Number of Decimal Places
const round = (n, d) => Number(Math.round(n + "e" + d) + "e-" + d);

// Generate a Random ID
/**
 * This simple function generates a random ID using Math.random().
 * Since Math.random() doesn’t guarantee that all the generated numbers are unique,
 * this method is not 100% secure to use in production.
 * But there’s no harm in using it during development to quickly get an ID to complete the implementation and test the app.
 */
const randomID = (length = 36, sub = 2) =>
  Math.random().toString(length).substring(sub);

// Check If the User has Scrolled to the Bottom of the Page
// const scrolledToBottom = () =>
//   document.documentElement.clientHeight + window.scrollY >=
//   document.documentElement.scrollHeight;

// // Scroll to the Top of the Page
// const toTop = () => window.scrollTo(0, 0);

// Generate a Random Hex Color
const hexColor = () =>
  "#" +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0");

// Strip HTML From Text
const stripHtml = (html) =>
  new DOMParser().parseFromString(html, "text/html").body.textContent || "";

// Detect Dark Mode
// const isDarkMode =
//   window.matchMedia &&
//   window.matchMedia("(prefers-color-scheme: dark)").matches;

// Clear All Cookies
// const clearCookies = document.cookie
//   .split(";")
//   .forEach(
//     (cookie) =>
//       (document.cookie = cookie
//         .replace(/^ +/, "")
//         .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
//   );

// // convert picel to viewport width
// const convertPXToVW = (px) => px * (100 / document.documentElement.clientWidth);
// const convertPXToVH = (px) =>
//   px * (100 / document.documentElement.clientHeight);

export const util = {
  randomID,
};
