const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const { SessionsClient } = require("dialogflow");

const { WebhookClient } = require("dialogflow-fulfillment");

const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://asif-s-bot.firebaseio.com",
});

app.post("/dialogflowGateway", async (req, res) => {
  const { queryInput, sessionId } = req.body;

  const sessionClient = new SessionsClient({ credentials: serviceAccount });
  const session = sessionClient.sessionPath("asif-s-bot", sessionId);

  const responses = await sessionClient.detectIntent({ session, queryInput });

  const result = responses[0].queryResult;

  res.send(result);
});

app.post("/dialogflowWebhook", async (req, res) => {
  const agent = new WebhookClient({ req, res });

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  async function userOnboardingHandler(agent) {
    const db = admin.firestore();
    const { name } = req.params;

    await db.collection("users").add({
      name,
    });
  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("userOnboardingHandler", userOnboardingHandler);
});

exports.app = functions.https.onRequest(app);
