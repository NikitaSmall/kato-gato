if (Rooms.find().count() === 0) {
  var now = new Date().getTime();

  var room = Rooms.insert({
    title: 'Первая комната',
    createdAt: now,
    creator: null
  });

  var nikitabig = Meteor.users.insert({
    profile: { name: 'NikitaBig' }
  });

  Messages.insert({
    userId: nikitabig._id,
    author: nikitabig.name,
    roomId: room._id,
    content: 'Всем привет!',
    createdAt: now
  });

  now = new Date().getTime();
  Messages.insert({
    userId: nikitabig._id,
    author: nikitabig.name,
    roomId: room._id,
    content: 'Как у всех дела?',
    createdAt: now
  });
}
