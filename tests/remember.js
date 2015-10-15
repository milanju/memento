Tinytest.addAsync('test if Memento.remember(col, doc) works as intended', function (test, next) {
  Accounts.createUser({username: 'dummy', password: 'dummy'});
  var post = {title: 'Hello', content: 'World'}
  Meteor.call('mementoRemember', 'posts', post, function(err, res) {
    if (res) {
      var mementoId = res;
      var mementoDoc = MementoStore.findOne(mementoId);
      test.equal(mementoDoc.doc, post);
      next();
    }
  });
});
