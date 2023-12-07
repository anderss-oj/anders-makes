import { resolve } from 'path'

export default {
    // config options
    base : '/',
    build: {
      rollupOptions : {
        input: {
          main : resolve(__dirname, 'index.html'), 
          page1 : resolve(__dirname, 'pages/page1.html')
        }
      }, 
      outDir: 'dist',
    },
  };