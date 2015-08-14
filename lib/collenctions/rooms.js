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
      author: user.username
    });

    return Rooms.insert(room);
  }
});
