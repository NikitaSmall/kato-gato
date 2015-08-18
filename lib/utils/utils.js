// check for links or pictures at messages
checkMessageForIncludes = function(message) {
    var wordsArray = message.split(' ');
    var length = wordsArray.length;

    for(var i = 0; i < length; i++) {
        if( // search for links at word
          (wordsArray[i].indexOf('http://') > -1 || wordsArray[i].indexOf('https://') > -1) &&
          wordsArray[i].length > 8
        ) {
          if( // search for pictures at link
            wordsArray[i].indexOf('.jpg') > -1 || wordsArray[i].indexOf('.jpeg') > -1 ||
            wordsArray[i].indexOf('.bmp') > -1 || wordsArray[i].indexOf('.png') > -1
          ) { // if picture is found
            wordsArray[i] = '<a target="_blank" href="' + wordsArray[i].replace(RegExp('[.|,|:|;|?|!|)|()]*$'), '') + '"><img src="' + wordsArray[i].replace(RegExp('[.|,|:|;|?|!|)|()]*$'), '') + '"></a>';
          } else { // if it is a ordinary link
            wordsArray[i] = '<a target="_blank" href="' + wordsArray[i].replace(RegExp('[.|,|:|;|?|!|)|()]*$'), '') + '">' + wordsArray[i] + '</a>';
          }
        }
    }

    return wordsArray.join(' ');
};

getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// change color for all user's messages
Meteor.methods({
  changeColor: function() {
    check(Meteor.userId(), String);

    var user = Meteor.user();
    var newColor = getRandomColor();
    Meteor.users.update({ _id: Meteor.userId() }, {$set: { color: newColor }});

    Messages.update({ userId: Meteor.userId() }, {$set: { userColor: newColor }}, {multi: true});
    return;
  }
});
