# Who Are You

## The game

Who Are You is a popular game where players can try to guess who a certain football player is based on a blurry photo and attributes such as the player's nationality, league, team, playing position, age and shirt number.

This is one of its popular implementations: https://playfootball.games/who-are-ya/premier-league/

Players start with a blurry photo of a player and type the name of the player they think it could be. Only valid players can be guessed, so it is useful to provide valid names as the user starts typing a player's name.

If the user has not guessed correctly, then the game should display the nationality, team, position, age and shirt number of the player the user has guessed, showing a green background if the value matches the one of the mystery player, or grey if the value doesn't match it. In the case of numeric values (age and shirt number), if the values do not match, an arrow up or down should show to indicate respectively whether the age of the mystery player is higher or lower than the one displayed.

If the user has guessed correctly then the non-blurry photo of the player is revealed.

The game presents the same player to everyone, which is the player of that day, and every 24h a new player is selected.

## The task

Your task is to implement the backend API that allows the game as described above to be played using the data provided.

There's a MongoDB dumpfile provided (`initial-data/staging.agz`) including a database called `staging` with two collections: `teams` and `players`. If you have Docker installed, there's an npm script called `mongodb` that initialises the database from this file. A `mongodb:stop` script has also been provided that destroys the container.

Players have a `team` property with the `_id` of the team in the `teams` collection, and they also have information about the players such as nationality, date of birth and playing position. For this exercise, we will ignore the shirt number. Players also have an `imagePath` field with the URL of their photo when available.

Please note that nationality and playing position are numeric in the database, please just make up a few constants with example nationalities and playing positions based on these numbers for the purpose of this exercise.

The backend API should be implemented in NodeJS using Typescript and Express. How to organise the project will be left to you. Please don't spent more than 6 hours on this exercise, the idea is not to have a perfect API but to have a feel for how you code and how you think about implementing backend solutions.
