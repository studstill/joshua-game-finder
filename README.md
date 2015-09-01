#TESTING VERSION

#"Would you like to play a game?"
##Purpose of this app:

Unlike traditional meetups, our "game finder" app allows users to host or join
games _in real time_!

Is it Tuesday night and you are itching to throw down on some Settlers of
Catan, but all your friends are busy?  No problem!  Boot up Joshua and see
if anyone in your area is available for a game!

With this app, getting people together to play a game is easier than ever!

If there are no instances of the game you want to play running, host one
yourself!  Simply find a location suitable for your game and your group (like
your local coffee house or neighborhood bar), bring the game your want to play, then use
this app to invite people to join you!  It's that easy!

When the enough people have indicated that they would like to play, then the
game is listed as "full".  When everyone arrives, the game begins and the listing is either
marked as "in progress," or is removed from the list of available games.

##Primary Features:

Ulimately, the purpose of this app is to provide real-time listings of _open_
games that are looking for players.

Each listing will include:

- What game (or games) will be played
- Number of players required and/or desired
(Including how many seats are left open and unclaimed)
- Estimated play time
- Location
- Host's Name
- Names of participants


#####Routes

######/api/users

GET- responds with array of all users

POST- Adds a user returns the token for the new user

######/api/users/:username

GET- responds with a specific user

DELETE- Deletes a specific user

PUT-When passed a JSON updates the contained fields in DB and responds with an updated user

######/api/instances

GET- Gets an array of instances

POST- Adds an instance

######/api/instances/:instanceID

GET- responds with a specific instance

DELETE- Deletes a specific instance

PUT- When passed a JSON updates the contained fields in DB and responds with an updated instance

######/auth/login

POST- when passed a valid username and password responds with a token
