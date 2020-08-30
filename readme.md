# ChatBot - Dialogflow, firebase, nodejs

## Before run this app you have to follow this steps:

- create a firebase project in https://console.firebase.google.com/

- go to https://dialogflow.cloud.google.com/ and create a new agent with your GOOGLE PROJECT which you created in firebase.
- add intents in your dialogflow agent.
- add your "serviceAccountKey.json file in this project. you can find this in firebase project > project settings > service accounts > Generate new private key. then a file will be downloaded. just add this file in this project.

- in admin.initializeApp function you need to add your credential and databaseURL. which you find in service accounts page.

- now in this line: "const session = sessionClient.sessionPath("asif-s-bot", sessionId);" you need to replace "asif-s-bot" with your project id, which you find in project settings page.

after this steps, you can run:

> node index.js or nodemon
