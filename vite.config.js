import { resolve } from 'path';

export default {
  // Configuration options
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        profile: resolve(__dirname, 'pages/profile.html'),
        contact: resolve(__dirname, 'pages/contact.html'),
        directory: resolve(__dirname, 'pages/work/directory.html'),
        multi: resolve(__dirname, 'pages/multi.html'),
        slowing: resolve(__dirname, 'slowing.html'),
        archive: resolve(__dirname, 'slowing/archive.html'),
        filingCabinet: resolve(__dirname, 'filingCabinet.html'),
        manNmachine: resolve(__dirname, 'pages/work/machineNman.html'),
        bitRot: resolve(__dirname, 'pages/work/bitRot.html'),
        terms: resolve(__dirname, 'pages/work/terms.html'),
        beluchaga: resolve(__dirname, 'pages/work/beluchaga.html'),
        mashUp: resolve(__dirname, 'pages/work/mashUp.html'),
        radio: resolve(__dirname, 'pages/work/radio.html'),
        twoThousandFiveFordTaurus: resolve(__dirname, 'pages/work/2005fordTaurus.html'),
        fern: resolve(__dirname, 'pages/work/fern.html'),
        autoVirtual: resolve(__dirname, 'pages/work/autoVirtual.html'),
        folder: resolve(__dirname, 'fileCabinet/folder.html'),
        files: resolve(__dirname, 'fileCabinet/files.html'),
        fileData: resolve(__dirname, 'fileCabinet/fileData.html'),
        dataPoint: resolve(__dirname, 'fileCabinet/dataPoint.html'),
      },
      // output: {
      //   assetFileNames: 'assets/[name]-[hash][ext]'
      // }
    },
    outDir: 'dist',
    assetsDir: 'static', // Specify the directory for static assets
  },
  // Configuration for handling static assets
  // Define the directories containing static assets to be copied
  assetsInclude: ['images', 'images/documentationPics'],
};