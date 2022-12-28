const admin = require("firebase-admin");

const serviceAccount = require("./db/proyectoalvia-firebase-adminsdk-7lix9-e6f591d564.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

console.log(query.get())