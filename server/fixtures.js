if (Rooms.find().count() === 0) {
  var now = new Date().getTime();

  var nikitabig = Meteor.users.insert({
    profile: { username: 'NikitaBig' }
  });

  var room = Rooms.insert({
    title: 'Первая комната',
    createdAt: now,
    userId: nikitabig._id,
    author: nikitabig.username,
    members: [nikitabig._id]
  });

  Messages.insert({
    userId: nikitabig._id,
    author: nikitabig.username,
    roomId: room._id,
    content: 'Всем привет!',
    createdAt: now
  });

  now = new Date().getTime();
  Messages.insert({
    userId: nikitabig._id,
    author: nikitabig.username,
    roomId: room._id,
    content: 'Как у всех дела?',
    createdAt: now
  });
}
