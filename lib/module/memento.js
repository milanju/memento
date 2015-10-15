Memento = {
  // Call before deleting document. The document will be inserted into MementoStore
  // Call with to be deleted document and its origin collection
  remember: function (col, doc) {
    return MementoStore.insert({
      userId: Meteor.user()._id,
      col: col,
      doc: doc
    });
  },
  // Call to restore deleted document
  // Call with documents id within MementoStore (obtained by remember() function)
  restore: function (mementoId) {
    var userId = Meteor.userId();
    if (userId) {
      var memento = MementoStore.findOne(mementoId);
      if (userId === memento.userId) {
        var col = memento.col;
        var doc = memento.doc;
        // Get collection by name, using dburles:mongo-collection-instances
        Mongo.Collection.get(col).insert(doc, function(err, res) {
          // If document was restored successfully, remove from Memento
          if (res) {
            MementoStore.remove(mementoId);
          }
        });
      } else {
        throw new Meteor.Error(500, 'May only restore documents deleted by self');
      }
    } else {
      throw new Meteor.Error(500, 'Must be logged in');
    }
  }
}


Meteor.methods({
  // Call mementoRestore to restore deleted document
  mementoRestore: function(mementoId) {
    Memento.restore(mementoId);
  }
});
