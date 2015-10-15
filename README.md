Memento
=========================

Memento is a Meteor package implementation of the Delete-Undo pattern.
This package provides you with 2 simple methods that will do all the work for you.


## Installation

```
$ meteor add milant:memento
```

## How to use

Memento provides you with two Methods you need to implement into your code.
Calling either of the methods requires the client(user) to be logged in to your Meteor app.

1. Memento.remember(col, doc)
Call this in your remove Method before removing an object.
```js
Meteor.methods({
  postsRemove: function(postId) {

    ...

    var post = Posts.findOne(postId);

    /* This is the Memento implementation! First argument is the NAME of the documents collection.
     * You need the mementoId to restore the object! */
    var mementoId = Memento.remember('posts', post);
    Posts.remove(postId, function(err) {
      if (!err) {
        /* Doc deleted, should now pass the mementoId to some sort of GUI.
         * There are many ways to do this, it's up to you. */
        Session.set('memento', mementoId);
      }
    });

    ...

  }
});
```

2. Meteor.call('mementoRestore', mementoId)
Call this to restore the document. Must be called from the user that deleted the document.
You could attach this to a restore button that's visible as long as a Session variable exists, for example.
```js
var mementoId = Session.get('memento');
Meteor.call('mementoRestore', mementoId, function(err, res) {
  if (!err) {
    Session.set('memento', undefined);
  }
});
```

## Live Demo

[memento-demo.meteor.com](http://memento-demo.meteor.com/).
