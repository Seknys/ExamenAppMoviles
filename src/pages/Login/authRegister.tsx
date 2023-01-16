import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { RegisterWithEmail } from "../../service/auth";

function RegisterUserAuth({ history }: any) {
  const [email, setEmail] = useState<any>();
  const [pass, setPass] = useState<any>();
  const [name, setName] = useState<any>();

  const handleRegister = () => {
    RegisterWithEmail(email, pass, name)
      .then(() => {
        console.log("INREGISTER");
        alert("Usuario registrado");
        history.push("/main-page");
      })
      .catch((e) => {
        alert(`Error ${e.message}`);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Regiostrar un nuevo usuario </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonTitle class="ion-text-center" style={{ margin: "50px 0px" }}>
          Registrar
        </IonTitle>
        <IonItem
          color="tertiary"
          class="ion-margin"
          style={{ paddingInline: "30%" }}
        >
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput
            type="text"
            required
            onIonChange={(e) => setName(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem
          color="tertiary"
          class="ion-margin"
          style={{ paddingInline: "30%" }}
        >
          <IonLabel position="floating">Correo electronico</IonLabel>
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
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type="password"
            required
            onIonChange={(e) => setPass(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonButton
          size="default"
          style={{ paddingInline: "47%" }}
          class="ion-padding-vertical"
          onClick={handleRegister}
        >
          Registrar
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default RegisterUserAuth;
