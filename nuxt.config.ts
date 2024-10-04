export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      link: [
        // Standard favicon
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        // iPhone icons
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        // Other devices
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        // Web App Manifest
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      // Meta tags for Apple devices
      meta: [
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black" },
        { name: "apple-mobile-web-app-title", content: "Todo App" },
        // Theme color for browsers that support it
        { name: "theme-color", content: "#ffffff" },
      ],
    },
  },
});
