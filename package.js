Package.describe({
  name: 'verso:archive-collection',
  summary: 'Collection with all archived documents automatically filtered out from query result',
  version: '0.0.1',
  git: 'https://github.com/versolearning/meteor-archive-collection'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use([
    'underscore',
    'mongo',
    'minimongo',
    'ecmascript@0.1.6'
  ]);

  api.add_files('archive-collection.js', ['client', 'server']);

  api.export('ArchiveCollection');
});
