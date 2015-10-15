Package.describe({
  name: 'milant:memento',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'Memento pattern implementation to undo document deletions.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('ecmascript');
  api.use('mongo');
  api.use('dburles:mongo-collection-instances');
  api.use('accounts-base');
  api.addFiles('lib/collection/mementoStore.js');
  api.addFiles('lib/module/memento.js');
  api.addFiles('lib/publish.js', ['server']);
  api.addFiles('lib/subscribe.js', ['client']);
  api.export('MementoStore');
  api.export('Memento');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('accounts-password');
  api.use('milant:memento');
  api.addFiles('tests/methods.js');
  api.addFiles('tests/remember.js', ['client']);
});
