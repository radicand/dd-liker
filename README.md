This is a container which will "like" every post in a DoubleDutch app event feed.

Why
===

Some conferences I attend have a swag shop with nice things, but require you to earn a large number of points by doing stuff in the event app. I'd rather listen to the sessions and engage with people than stare at my app and be "disconnected" with everyone around me. This code does the dirty work for me so I can still get stuff at the swag shop and be present.

Using
===
Populate an .env file with the following:

```bash
APP_ID=
AUTH_ID=
FEED_SIZE=200
FIRST_NAME=Your name in the app here
LAST_NAME=Your name in the app here
ACCESS_TOKEN=
REFRESH_TOKEN=
```

You can get all the values by logging into the HTML5 version of the app and extracting them from LocalStorage:
- authentication/... key for tokens
- bundle/config for the AUTH_ID
- bundle/events for the APP_ID

There are also Kubernetes and Docker deployment files present if you'd like to use them. The Docker image referenced in both of them is arm64 architecture so you may need to build your own version until I'm able to get multiarch support (not a priority here).
