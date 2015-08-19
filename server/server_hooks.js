
Accounts.onCreateUser(function(options, user) {
    // set color
    var ownColor = getRandomColor();
    user.color = ownColor;

    // add user to firstRoom
    var firstRoom = Rooms.find({title: 'Первая комната'});

    if (firstRoom.members === undefined) {
      firstRoom.members = [];
    }
    firstRoom.members.push(user._id);

    Rooms.update({ _id: firstRoom._id }, { $set: { members: firstRoom.members } });

    if (options.profile)
      user.profile = options.profile;
    return user;
});
