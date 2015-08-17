// set color
Accounts.onCreateUser(function(options, user) {
    var ownColor = getRandomColor();
    user.color = ownColor;

    if (options.profile)
      user.profile = options.profile;
    return user;
});
