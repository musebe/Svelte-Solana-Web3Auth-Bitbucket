// rollup.config.js
export default {
  // ... other options
  output: {
    manualChunks(id) {
      if (id.includes('node_modules')) {
        // return the directory name within node_modules as the chunk name
        return id.split('node_modules/')[1].split('/')[0];
      }
    },
  },
};
