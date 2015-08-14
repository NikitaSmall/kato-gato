Template.addRoom.events({
  "submit Form": function(event, template){
    event.preventDefault();

    var $title = $(event.target).find('[name=title]');

    var room = {
      title: $title.val()
    };

    Meteor.call('addRoom', room, function(error, result) {
      if (error) alert(error.reason);
      if (result.roomExists) alert('Комната с таким именем уже существует!');
      
      $title.val('');
    });
  }
});
