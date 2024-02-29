import { resolve } from 'path'

export default {
    // config options
    base : '/',
    build: {
      rollupOptions : {
        input: {
          main : resolve(__dirname, 'index.html'), 
          page1 : resolve(__dirname, 'pages/page1.html'),
          page2 : resolve(__dirname, 'pages/page2.html'),
          page3 : resolve(__dirname, 'pages/page3.html'),
          page4 : resolve(__dirname, 'pages/page4.html'),
          multi : resolve(__dirname, 'pages/multi.html')
        }
      }, 
      outDir: 'dist',
    },
    // Configuration for handling static assets
  // Define the directories containing static assets to be copied
  assetsInclude: ['images'],
  };

// // THIS FROM CHATGPT
// import { resolve } from 'path';

// export default {
//   // Base URL for the application
//   base: '/',

//   build: {
//     // Specify the directory where the built files will be outputted
//     outDir: 'dist',

//     // Rollup options to customize the build
//     rollupOptions: {
//       // Specify entry points for your application
//       input: {
//         main: resolve(__dirname, 'index.html'),
//         page1: resolve(__dirname, 'pages/page1.html'),
//         page2: resolve(__dirname, 'pages/page2.html'),
//         page3: resolve(__dirname, 'pages/page3.html'),
//         page4: resolve(__dirname, 'pages/page4.html'),
//         multi: resolve(__dirname, 'pages/multi.html'),
//       },
//     },
//   },

//   // Configuration for handling static assets
//   // Define the directories containing static assets to be copied
//   assetsInclude: ['images'],

//   // Alternatively, you can specify individual file extensions
//   // assetsInclude: ['**/*.png', '**/*.jpg', '**/*.gif'],

//   // You can also specify the maximum size of files to include (optional)
//   // assetsInlineLimit: 4096, // Adjust as needed
// };