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
          page4 : resolve(__dirname, 'pages/page4.html')
        }
      }, 
      outDir: 'dist',
    },
  };