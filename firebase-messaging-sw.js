importScripts('https://www.gstatic.com/firebasejs/11.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.9.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCZ5Kmh9XjZKYGJBbEL6qUR3QsPpXY8K1o",
  authDomain: "beaverbuiltchat.firebaseapp.com",
  databaseURL: "https://beaverbuiltchat-default-rtdb.firebaseio.com",
  projectId: "beaverbuiltchat",
  storageBucket: "beaverbuiltchat.appspot.com",
  messagingSenderId: "785578451247",
  appId: "1:785578451247:web:30d2422f3b318032c9c1da",
  measurementId: "G-XT02YCCFYM"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon:  'Beaverlogo.jpg',
    badge: 'Beaverlogo.jpg',
    data:  payload.data
  });
});
