import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { userLogin } from "../../service/auth";
import { set } from "@firebase/database";
import { people } from "ionicons/icons";
import { Link } from "react-router-dom";

function Login({ history }: any) {
  const [email, setEmail] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const onSubmit = () => {
    setIsLoad(true);
    console.log("Submited?");
    userLogin(email, password)
      .then((res) => {
        console.log("login ", res);
        setTimeout(() => {
          setIsLoad(false);
          history.push("/main-page");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoad(false);
  };

  const defaultAcount = () => {
    userLogin("s@s.com", "123456")
      .then((res) => {
        console.log("login ", res);
        setTimeout(() => {
          setIsLoad(false);
          history.push("/main-page");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-containter">
      <IonHeader>
        <IonToolbar>
          <IonTitle>LOGIN</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonTitle class="ion-text-center" style={{ margin: "50px 0px" }}>
        LOGIN
      </IonTitle>
      <IonItem
        color="tertiary"
        class="ion-margin"
        style={{ paddingInline: "30%" }}
      >
        <IonLabel position="floating">Email</IonLabel>
        <IonInput
          type="text"
          required
          onIonChange={(e) => setEmail(e.target.value)}
        ></IonInput>
      </IonItem>

      <IonItem
        color="tertiary"
        class="ion-margin"
        style={{ paddingInline: "30%" }}
      >
        <IonLabel position="floating">Password</IonLabel>
        <IonInput
          type="password"
          required
          onIonChange={(e) => setPassword(e.target.value)}
        ></IonInput>
      </IonItem>

      <IonButton
        disabled={isLoad}
        color={isLoad ? "dark" : "tertiary"}
        size="default"
        style={{ paddingInline: "47%" }}
        class="ion-padding-vertical"
        onClick={onSubmit}
      >
        ENTER
      </IonButton>
      <Link to="/register-newUser" style={{ textDecoration: "none" }}>
        <IonButton
          size="default"
          style={{ paddingInline: "47%" }}
          class="ion-padding-vertical"
          onClick={onSubmit}
        >
          REGISTRATE
        </IonButton>
      </Link>

      {/* <IonFab>
        <IonFabButton>
          <IonIcon icon={people}></IonIcon>
        </IonFabButton>
      </IonFab> */}
      <IonTitle class="ion-text-center" style={{ margin: "50px 0px" }}>
        O inicia con una cuentra predefinida
      </IonTitle>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "space-around",
          width: "100%",
        }}
      >
        <IonButton
          disabled={isLoad}
          color={isLoad ? "dark" : "tertiary"}
          size="default"
          style={{ paddingInline: "47%" }}
          class="ion-padding-vertical"
          onClick={defaultAcount}
        >
          <IonIcon icon={people}></IonIcon>
        </IonButton>
        <IonButton
          disabled={isLoad}
          color={isLoad ? "dark" : "tertiary"}
          size="default"
          style={{ paddingInline: "47%" }}
          class="ion-padding-vertical"
          onClick={defaultAcount}
        >
          <IonIcon icon={people}></IonIcon>
        </IonButton>
        <IonButton
          disabled={isLoad}
          color={isLoad ? "dark" : "tertiary"}
          size="default"
          style={{ paddingInline: "47%" }}
          class="ion-padding-vertical"
          onClick={defaultAcount}
        >
          <IonIcon icon={people}></IonIcon>
        </IonButton>
      </div>
    </div>
  );
}

export default Login;
