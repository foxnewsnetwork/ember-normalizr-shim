/*jshint node:true*/
module.exports = {
  description: 'Installation blueprint for normalizr',

  normalizeEntityName() {},

  afterInstall() {
    return this.addPackagesToProject([
      {name: 'redux-orm', target: '^0.9.0-rc.1'}
    ]);
  }
};
