Template.room.helpers({
  messages: function() {
    var messageCount = Messages.find({ roomId: this._id }).count();
    if (messageCount > 50) {
      return Messages.find({ roomId: this._id }, {sort: {createdAt: 1}, limit: 50, skip: messageCount - 50});
    } else {
      return Messages.find({ roomId: this._id }, {sort: {createdAt: 1}, limit: 50});
    }

  }
});

Template.room.events({
  "submit form#messages": function(event, template){
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
  $('<audio id="chatAudio"><source src="/music/notify.ogg" type="audio/ogg"><source src="/music/notify.mp3" type="audio/mpeg"><source src="/music/notify.wav" type="audio/wav"></audio>').appendTo('body');
  $('#chatAudio')[0].play();
};
