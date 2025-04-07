// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Cấu hình để xử lý SVG
const { transformer, resolver } = config;

// Cấu hình transformer
config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
  assetPlugins: ["expo-asset/tools/hashAssetFiles"],
  minifierConfig: {
    keep_classnames: true,
    keep_fnames: true,
    mangle: {
      keep_classnames: true,
      keep_fnames: true,
    },
  },
  // Cấu hình Fast Refresh
  experimentalImportSupport: false,
  inlineRequires: true,
};

// Cấu hình resolver
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg", "jsx", "js", "ts", "tsx", "json"],
};

// Cấu hình thêm cho Metro bundler
config.watchFolders = [__dirname]; // Theo dõi thư mục gốc

// Cấu hình server
config.server = {
  ...config.server,
  port: 8081,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Thêm header cho phép CORS
      res.setHeader("Access-Control-Allow-Origin", "*");
      return middleware(req, res, next);
    };
  },
};

// Cấu hình cho Android
config.server.port = Number(process.env.RCT_METRO_PORT) || 8081; // Sử dụng cổng tùy chỉnh hoặc mặc định 8081

// Cấu hình Hot Module Replacement và Fast Refresh
config.resetCache = false; // Tránh reset cache khi không cần thiết
config.maxWorkers = 4; // Giới hạn số lượng worker để giảm tải CPU
config.cacheStores = []; // Sử dụng cache mặc định

// Cấu hình để tăng tốc độ hot reload
config.cacheVersion = process.env.NODE_ENV || "development";

module.exports = config;
