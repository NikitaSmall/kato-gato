Template.changeColor.events({
  "click #change-color": function(event, template){
    event.preventDefault();
    event.stopPropagation();
    
    Meteor.call('changeColor', function(error) {
      if (error) alert(error.reason);
    });
  }
});
