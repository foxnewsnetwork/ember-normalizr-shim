/*jshint node:true*/
module.exports = {
  description: 'Installation blueprint for normalizr',

  normalizeEntityName() {},

  afterInstall() {
    return this.addPackagesToProject([
      {name: 'normalizr', target: '^3.1.0'}
    ]);
  }
};
