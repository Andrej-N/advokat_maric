/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {
      stage: 2,
      features: {
        "cascade-layers": true,
      },
      browsers: ["Chrome >= 80", "Firefox >= 80", "Safari >= 13", "Edge >= 80"],
    },
  },
};

export default config;
