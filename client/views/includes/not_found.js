Template.notFound.helpers({
  firstRoom: function(){
    return Rooms.findOne();
  }
});
