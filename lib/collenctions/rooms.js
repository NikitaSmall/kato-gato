Rooms = new Meteor.Collection("rooms");

Meteor.methods({
  addRoom: function(roomAttributes) {
    check(Meteor.userId(), String);
    check(roomAttributes, {
       title: String
    });

    var sameTitleRoom = Rooms.findOne({title: roomAttributes.title});

    if(sameTitleRoom) return {
      roomExists: true,
      _id: sameTitleRoom._id
    };

    var user = Meteor.user();

    var room = _.extend(roomAttributes, {
      createAt: new Date(),
      userId: user._id,
      author: user.username,
      members: [Meteor.userId()]
    });

    return Rooms.insert(room);
  },

  inviteUser: function(invitation) {
    check(invitation, {
      username: String,
      roomId: String
    });

    var room = Rooms.findOne({ _id: invitation.roomId });
    if (!room) {
      return {
        noRoom: true
      };
    }

    var user = Meteor.users.findOne({ username: invitation.username });
    if (!user) {
      return {
        noUser: true
      };
    }

    room.members.push(user._id);
    Rooms.update({ _id: room._id }, { $set: { members: room.members } });

    return {
      success: true
    };
  }
});
