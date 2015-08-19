Meteor.publish('messages', function(roomId) {
  check(roomId, String);
  return Messages.find({ roomId: roomId });
});

Meteor.publish('rooms', function(allowedUserId) {
  check(allowedUserId, String);
  return Rooms.find({ members: allowedUserId });
});
