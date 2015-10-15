Meteor.methods({
  mementoRemember: function(col, doc) {
    return Memento.remember(col, doc);
  }
});
