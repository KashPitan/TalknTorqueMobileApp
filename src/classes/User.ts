import {
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

//create as service and move to helper folder
export default class User {
  id: string;
  email: string;
  name: string;
  car: string;
  isApproved: boolean;
  pushNotificationToken?: string;

  constructor(
    id: string,
    email: string,
    name: string,
    car: string,
    isApproved: boolean,
    pushNotificationToken?: string
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.car = car;
    this.isApproved = isApproved;
    this.pushNotificationToken = pushNotificationToken;
  }

  // add to database
  create = async () => {
    const data = {
      id: this.id,
      email: this.email,
      name: this.name,
      car: this.car,
      isApproved: this.isApproved,
      pushNotificationToken: this.pushNotificationToken,
    };
    const newUserReference = doc(db, "users", this.id);
    await setDoc(newUserReference, JSON.parse(JSON.stringify(data)));
  };

  static isApproved = async (id: string) => {
    const userDocRef = doc(db, "users", id);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userDocData = userDocSnapshot.data();
      return userDocData.isApproved;
    }

    // return false by default to avoid random approvals if above checks fail
    return false;
  };

  static updatePushNotificationToken = async (id: string, token: string) => {
    const userDocRef = doc(db, "users", id);
    if (userDocRef) {
      await updateDoc(userDocRef, { pushNotificationToken: token });
    }
  };
}
