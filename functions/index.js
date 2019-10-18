// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const constants = require('./FirebaseConstants');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// "Hello World" function
// 
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


// Descirption: async function that takes candidate params as input and 
// inserts into the path at 'constants.FIREBASE_DATABASE_CANDIDATE_PATH'
// in firebase realtime database.
//
// Call function with url: https://us-central1-hukm-891f5.cloudfunctions.net/addCandidate?
// Append parameters to url as such: cnic=35207, name=Ganju, password=qwerty, key=qwertyui
exports.addCandidate = functions.https.onRequest(async (request, response) => {
    
    // get info encoded in url
    let cnic = request.query.cnic;
    let name = request.query.name;
    let key = request.query.key;
    let password = request.query.password;

    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database().ref(constants.FIREBASE_DATABASE_CANDIDATE_PATH).push({
        cnic: cnic,
        name: name,
        key: key,
        password: password,
    });
    response.end("Write Successful");
});


// Descirption: async function that takes voter params as input and 
// inserts into the path at 'constants.FIREBASE_DATABASE_VOTER_PATH'
// in firebase realtime database.
//
// Call function with url: https://us-central1-hukm-891f5.cloudfunctions.net/addVoters?
// Append parameters to url as such: cnic=35207, name=Ganju, password=qwerty, key=qwertyui

exports.addVoters = functions.https.onRequest(async (request, response) => {
    
    // get info encoded in url
    let cnic = request.query.cnic;
    let name = request.query.name;
    let key = request.query.key;
    let password = request.query.password;
    let constituency = request.query.constituency;

    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database().ref(constants.FIREBASE_DATABASE_VOTER_PATH).push({
        cnic: cnic,
        name: name,
        key: key,
        password: password,
        constituency: constituency,
    });
    response.end("Write Successful");
});