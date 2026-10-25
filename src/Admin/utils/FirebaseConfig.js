import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAb0xbmG1JY2BiLBW_WL8_PZaM5JyNxX7s",
  authDomain: "zephyr-api-9c2da.firebaseapp.com",
  projectId: "zephyr-api-9c2da",
  storageBucket: "zephyr-api-9c2da.appspot.com",
  messagingSenderId: "6652436984",
  appId: "1:6652436984:web:ab7c2a71c04939495bb60d",
  measurementId: "G-GHT4ZMQQ06",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
