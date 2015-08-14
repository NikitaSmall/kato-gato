Messages = new Meteor.Collection("messages");

Meteor.methods({
  submitMessage: function(messageAttributes) {
    check(Meteor.userId(), String);
    check(messageAttributes, {
      content: String,
      roomId: String
    });

    if (/^\s*$/.test(messageAttributes.content))
      return ;

    var user = Meteor.user();

    var message = _.extend(messageAttributes, {
      userId: user._id,
      author: user.username,
      createdAt: new Date()
    });

    return Messages.insert(message);
  }
});
