import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'o393hd',
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  env: {'password': '11337700', 'email': 'kazu06851@gmail.com', "tsukekuEmail": "yixiqiaoben011@gmail.com", "tsukekuPassword": "11337700"},
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
