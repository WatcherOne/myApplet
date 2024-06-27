import { defineConfig } from '@tarojs/cli'
import path from 'path'

import devConfig from './dev'
import prodConfig from './prod'

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
// (merge, { command, mode }) => {}
export default defineConfig(async (merge) => {
  const baseConfig = {
    projectName: 'myApplet',
    date: '2024-6-27',
    designWidth: 750, // 设计稿尺寸
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    // 配置Taro插件
    plugins: [],
    // 定义一些全局变量供业务使用
    defineConstants: {
    },
    // 配置目录别名
		// 为了让我们编辑器识得别名需要在 jsconfig/tsconfig 配置自动补全如下
		/**
		 * complerOptions: {
		 *    baseUrl: '.',
		 *    paths: {
		 *      '@/components/*': ['./src/components/*']    
		 *    }
		 * }
		 */
    alias: {
      '@/components': path.resolve(__dirname, '..', 'src/components'),
      '@/config': path.resolve(__dirname, '..', 'src/config'),
      '@/utils': path.resolve(__dirname, '..', 'src/utils')
    },
    // 用于把文件从源目录直接拷贝到编译后的生成目录
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: 'vue3',
    compiler: 'webpack5',
    cache: {
      // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
      enable: false 
    },
    // 专属小程序的配置
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {

          }
        },
        url: {
          enable: true,
          config: {
            limit: 1024 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    // 专属H5配置
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
