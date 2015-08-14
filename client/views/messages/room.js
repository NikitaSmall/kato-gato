Template.room.helpers({
  messages: function() {
    return Messages.find({ roomId: this._id }, {sort: {createAt: 1}});
  }
});

Template.room.events({
  "submit form": function(event, template){
    event.preventDefault();

    var $content = $(event.target).find('[name=content]');

    var message = {
      content: $content.val(),
      roomId: template.data._id
    };

    Meteor.call('submitMessage', message, function(error) {
      if (error) alert(error.reason);
      $content.val('');
    });
  }
});

Template.messageItem.rendered = function () {
  $('#chat_front').scrollTop($('#chat_front')[0].scrollHeight);
};
