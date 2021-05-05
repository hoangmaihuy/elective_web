// https://umijs.org/config/
import { defineConfig } from 'umi';
export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  webpack5: {},
  define: {
    "APP_ENV": "development",
    "TUIKE_API_HOST" : "http://localhost:8000",
    "TUIKE_WEB_HOST" : "http://localhost:3000",
  }
});
