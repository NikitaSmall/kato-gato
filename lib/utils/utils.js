getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

Meteor.methods({
  changeColor: function() {
    check(Meteor.userId(), String);

    var user = Meteor.user();
    var newColor = getRandomColor();
    Meteor.users.update({ _id: user._id }, {$set: { color: newColor }});

    Messages.update({ userId: user._id }, {$set: { userColor: newColor }});
    return;
  }
});
