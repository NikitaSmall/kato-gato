Meteor.publish('messages', function(roomId) {
  check(roomId, String);
  return Messages.find({ roomId: roomId });
});

Meteor.publish('rooms', function() {
  return Rooms.find();
});
