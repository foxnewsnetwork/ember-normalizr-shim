/* jshint node: true */
'use strict';
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const Webpack = require('broccoli-webpack');
const normalizr = new Funnel('node_modules/normalizr/dist', {
  destDir: 'normalizr',
  files: ['normalizr.js']
});

const PackOpts = {
  entry: 'normalizr/dist/normalizr.js',
  output: {
    filename: 'normalizr/normalizr.js',
    library: 'normalizr',
    libraryTarget: 'umd'
  }
};

const packedNormalizr = new Webpack([normalizr], PackOpts);

const transformAMD = (name) => ({
  using: [{ transformation: 'amd', as: name }]
});

module.exports = {
  name: 'ember-normalizr-shim',

  included(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;

    const vendor = this.treePaths.vendor;
    // requires ember-cli 2.9+
    // https://github.com/ember-cli/ember-cli/pull/5976
    app.import(vendor + '/normalizr/normalizr.js', transformAMD('normalizr'));

    return app;
  },

  treeForVendor(vendorTree) {
    const trees = [packedNormalizr];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    return mergeTrees(trees);
  }
};
