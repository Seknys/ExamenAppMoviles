import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { deleteuserData, getUsersRegisteredByUser } from "../../service/user";
import "./style.css";
import { Virtuoso } from "react-virtuoso";
import { Link } from "react-router-dom";

export default function DisplayUsers({ history }: any) {
  const [usersRegistered, setUsersRegistered] = useState<any>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("USer.uid: ", user?.uid);
    const usersRegisteredFunction = (snapshot: any) => {
      console.log("snapshot: ", snapshot);
      if (snapshot) {
        setUsersRegistered(snapshot);
      }
    };

    if (user) {
      getUsersRegisteredByUser(user.uid, usersRegisteredFunction);
    }
  }, [user]);

  const handleDelete = (userRegistered: any) => {
    if (user) {
      deleteuserData(user.uid, userRegistered.uid);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PErsonas registradas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* <Virtuoso className="ion-content-scroll-host"> */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            width: "80%",
          }}
        >
          {usersRegistered.map((user: any, index: number) => {
            console.log("USER: ", user);
            return (
              <div
                key={index}
                style={{
                  background: "#fff",
                  width: "300px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  marginBottom: "25px",
                }}
              >
                <IonCard key={index} className="user-deleteBttn">
                  <IonButton
                    color="danger"
                    size="small"
                    className="deleteBtn"
                    onClick={() => handleDelete(user)}
                  >
                    X
                  </IonButton>
                  <Link
                    to={`/edit-user/${user.uid}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      alt={user.name}
                      src={user.img}
                      width="280"
                      height="220"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                    <IonCardHeader>
                      <IonCardTitle>
                        <b>{user.name}</b> {user.lastname}
                      </IonCardTitle>
                      <IonCardSubtitle>{user.id}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      Numero de Cargo:{user.numfam}
                      <br />
                    </IonCardContent>
                  </Link>
                </IonCard>
              </div>
            );
          })}
        </div>
        {/* </Virtuoso> */}
      </IonContent>
    </IonPage>
  );
}
