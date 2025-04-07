const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const path = require("path");

module.exports = async function (env, argv) {
  // Cấu hình cho chế độ development
  const isEnvDevelopment = env.mode === "development";
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Customize the config before returning it
  if (!config.resolve.alias) {
    config.resolve.alias = {};
  }

  // Fix for NativeBase with React Native Web
  try {
    // Use our custom polyfill for createCompileableStyle
    config.resolve.alias[
      "react-native-web/dist/exports/StyleSheet/createCompileableStyle"
    ] = path.resolve(__dirname, "src/patches/createCompileableStyle.js");
  } catch (error) {
    console.warn("Could not apply StyleSheet compiler fix:", error);
  }

  // Add fallbacks for other potential issues
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "react-native-web": path.resolve(
      __dirname,
      "node_modules/react-native-web"
    ),
  };

  // Ensure we're using the correct version of react-native-web
  config.resolve.alias["react-native"] = "react-native-web";

  // Cấu hình thêm cho chế độ development
  if (isEnvDevelopment) {
    // Bật source maps
    config.devtool = "eval-source-map";

    // Cấu hình DevServer
    config.devServer = {
      ...config.devServer,
      hot: true,
      liveReload: true,
      watchFiles: ["src/**/*"],
    };
  }

  // Tắt minify cho cả development và production
  if (config.optimization) {
    config.optimization.minimize = false;
  }

  return config;
};
