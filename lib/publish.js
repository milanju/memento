// publish mementoStore, needed for latency compensation
Meteor.publish('mementoStore', function() {
  return MementoStore.find({userId: this.userId});
});
