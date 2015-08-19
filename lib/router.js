Router.configure({
  layoutTemplate: 'layout',
  loadingTemlate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    if (Meteor.userId())
      return Meteor.subscribe('rooms', Meteor.userId());
  }
});

Router.map(function() {
  this.route('home', {
    path: '/',
    onBeforeAction: function() {
      var firstRoom = Rooms.find({}, {limit: 1, sort: { createdAt: 1 } }).fetch()[0];
      this.redirect('/rooms/' + firstRoom._id)
    }
  });

  this.route('messageRoom', {
    path: '/rooms/:_id',
    data: function() {
      return Rooms.findOne(this.params._id);
    },
    waitOn: function() {
      return Meteor.subscribe('messages', this.params._id);
    }
  });
});

var requireLogin = function() {
  if(Meteor.user()) {
    this.next();
  } else {
    if(Meteor.loggingIn()) {
      this.render(this.loadingTemlate);
    } else {
      this.render('restricted');
    }
  }
};

Router.onBeforeAction(requireLogin);
Router.onBeforeAction('dataNotFound', { only: 'messageRoom' });
