import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "@firebase/storage";
import { DocumentData, onSnapshot, query } from "firebase/firestore";
import { db, storage } from "../firebase/config";

export const addUsersData = (uid: string, userRegister: any) => {
  // return addDoc(collection(db, "users", uid, "usersRegistered"), userRegister);
  return setDoc(doc(db, "users", uid, "usersRegistered", userRegister.uid), {
    ...userRegister,
  });
};

export const deleteuserData = (uid: string, userDeleteUid: string) => {
  return deleteDoc(doc(db, "users", uid, "usersRegistered", userDeleteUid));
};
export const uploadImage = (file: any) => {
  const storageRef = ref(storage, `images/${file.name}`);

  return uploadBytes(storageRef, file);
};

export const getUsersRegisteredByUser = async (
  uid: string,
  fSnapshot: (usersReg: any) => void
) => {
  await onSnapshot(
    query(collection(db, "users", uid, "usersRegistered")),
    (snapshot) => {
      const usersReg: any = [];
      snapshot.forEach((doc) => {
        // console.log("DOC", doc.data());
        usersReg.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      console.log("USersReg:: ", usersReg);
      fSnapshot(usersReg);
    }
  );
};
export const getOneUserRegistered = async (
  uid: string,
  registerUId: string,
  fSnapshot: (snapshot: DocumentData) => void
) => {
  console.log("Uid: ", uid, " Registered: ", registerUId);
  await onSnapshot(
    doc(db, "users", uid, "usersRegistered", registerUId),
    fSnapshot
  );
};

export const getUrlImage = async (pathImage: string) => {
  return getDownloadURL(ref(storage, pathImage));
};

export const updateUserRegistered = (uid: string, userRegistered: any) => {
  return updateDoc(
    doc(db, "users", uid, "usersRegistered", userRegistered.uid),
    {
      ...userRegistered,
    }
  );
};
