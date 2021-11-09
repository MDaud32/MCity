import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// import { cityDb } from './temp/m-city-export';

const firebaseConfig = {
  apiKey: 'AIzaSyDKcPTRFoj-EADosvhkHczoJiT1pSJnIuc',
  authDomain: 'mcity-f667d.firebaseapp.com',
  projectId: 'mcity-f667d',
  storageBucket: 'mcity-f667d.appspot.com',
  messagingSenderId: '212977714006',
  appId: '1:212977714006:web:67777f0c383771c12accf7',
  measurementId: 'G-M50M49Q699',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig); 
const DB = firebase.firestore();
const matchesCollection = DB.collection('matches');
const playersCollection = DB.collection('players');
const positionsCollection = DB.collection('positions');
const promotionsCollection = DB.collection('promotions');
const teamsCollection = DB.collection('teams');

// cityDb.matches.forEach((item) => {
//   matchesCollection.add(item);
// });

// cityDb.players.forEach((item) => {
//   playersCollection.add(item);
// });

// cityDb.positions.forEach((item) => {
//   positionsCollection.add(item);
// });

// cityDb.promotions.forEach((item) => {
//   promotionsCollection.add(item);
// });

// cityDb.teams.forEach((item) => {
//   teamsCollection.add(item);
// });

export {
  firebase,
  matchesCollection,
  playersCollection,
  positionsCollection,
  promotionsCollection,
  teamsCollection,
};
