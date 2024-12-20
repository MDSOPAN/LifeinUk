// // Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');

// // module.exports = getDefaultConfig(__dirname);

// module.exports = (async () => {
//     const {
//       resolver: { sourceExts, assetExts },
//     } = await getDefaultConfig(__dirname);
//     return {
//       transformer: {
//         babelTransformerPath: require.resolve('react-native-svg-transformer'),
//       },
//       resolver: {
//         assetExts: assetExts.filter((ext) => ext !== 'svg'),
//         sourceExts: [...sourceExts, 'svg'],
//       },
//     };
//   })();

const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
};

module.exports = config;
