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
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  webpack5: {},
  define: {
    "APP_ENV": "dev",
    //"TUIKE_API_HOST" : "/api",
    //"TUIKE_API_HOST" : "http://localhost:8000",
    //"TUIKE_API_HOST" : "https://tuike-api-test.herokuapp.com",
    "TUIKE_WEB_HOST" : "http://localhost:3000",
  }
});
