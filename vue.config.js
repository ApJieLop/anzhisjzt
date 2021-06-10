module.exports = {
  configureWebpack: config => {
    config.externals = {
      vue: "Vue",
      "element-ui": "ELEMENT",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      Aliplayer: "Aliplayer",
      moment: "moment"
    };
  }
};
