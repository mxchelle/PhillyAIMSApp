Package.describe({
  summary: 'Bulk upload users',
  version: '0.1.0',
  name: 'mitogi:bulk-upload'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  api.use(["telescope:core",
    "telescope:email",
    "harrison:papa-parse"]);

  // ---------------------------------- 2. Files to include ----------------------------------

  // client & server


  // client

  api.addFiles([
    'lib/client/templates/bulkUsers.html',
    'lib/client/templates/bulkUsers.js',
  ], ['client']);


api.addFiles([
    'lib/config.js',
  ], ['server', 'client']);

 api.addAssets([
    'lib/server/templates/emailAdd.handlebars',
  ], ['server']);


  api.addFiles([
    'lib/server/methods.js',
    'lib/server/templates.js'
  ], ['server']);


});
