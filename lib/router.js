Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('home', {
    path: '/',
    onBeforeAction: function() {
      var firstRoom = Rooms.find({}, {limit: 1, sort: { createdAt: 1 } }).fetch()[0];
      this.redirect('/rooms/' + firstRoom._id)
    }
  });

  this.route('room', {
    path: '/rooms/:_id'
  });
});
