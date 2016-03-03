Package.describe({
  name: 'verso:archive-collection',
  summary: 'Collection with all archived documents filtered out by default',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.use([
    'underscore@1.0.0',
    'mongo@1.0.6',
    'minimongo',
    'ecmascript'
  ]);
  api.add_files('verso:archive-collection.js', ['client', 'server']);
  api.export('ArchiveCollection');
});
