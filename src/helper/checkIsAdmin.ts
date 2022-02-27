import { db } from "../../firebase";
import { auth } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

//could probably use this in firebase.js and export value
export const checkIsAdmin = async () => {
  const currentUserEmail = auth.currentUser?.email;

  const adminDocRef = doc(db, "admins", "adminList");
  const adminDocSnapshot = await getDoc(adminDocRef);

  if (adminDocSnapshot.exists()) {
    console.log(adminDocSnapshot.data());
    console.log(currentUserEmail);
    const adminDocData = adminDocSnapshot.data();
    const adminEmailsList = adminDocData.adminEmails;
    if (adminEmailsList.includes(currentUserEmail)) return true;
  }
  return false;
};
