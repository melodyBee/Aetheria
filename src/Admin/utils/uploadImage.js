import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./FirebaseConfig";

// uploads a file to Firebase Storage and returns its public URL
export async function uploadImage(file) {
  const storageRef = ref(storage, `image/${Date.now()}-${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}
