import firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCvF9WluzdQyTOqKLWpEUhJNFeage4n30A',
  authDomain: 'siskamling-eef79.firebaseapp.com',
  projectId: 'siskamling-eef79',
  storageBucket: 'siskamling-eef79.appspot.com',
  messagingSenderId: '809230780894',
  appId: '1:809230780894:web:c2c1d8dc7d3aa21a43754f',
  measurementId: 'G-CDZVBZV6MB',
};

const Fire = firebase.initializeApp(firebaseConfig);
export default Fire;
