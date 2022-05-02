import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default class User {
  id: string;
  email: string;
  name: string;
  car: string;
  isApproved: boolean;

  constructor(
    id: string,
    email: string,
    name: string,
    car: string,
    isApproved: boolean
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.car = car;
    this.isApproved = isApproved;
  }

  // add to database
  create = async () => {
    const data = {
      id: this.id,
      email: this.email,
      name: this.name,
      car: this.car,
      isApproved: this.isApproved,
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

    // return false by default
    return false;
  };
}
