Template.inviteUser.events({
  "submit form#invite": function(event, template){
    event.preventDefault();

    var $username = $(event.target).find('[name=username]');

    var invitation = {
      username: $username.val(),
      roomId: Router.current().params._id
    };

    Meteor.call('inviteUser', invitation, function(error, result) {
      if (error) alert(error.reason);

      if (result.noRoom) alert('Нет такой комнаты! (что-то пошло не так...)');
      if (result.noUser) alert('Нет такого пользователя! (ищите лучше!)');
      if (result.userAlreadyIn) alert('Такой пользователь уже есть в этой комнате!');

      if (result.success)
        $username.val('');
    });
  }
});
