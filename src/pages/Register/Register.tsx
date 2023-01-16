import { useContext, useEffect, useRef, useState } from "react";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonImg,
  IonButton,
  IonLoading,
  IonPage,
  IonContent,
} from "@ionic/react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../../context/userContext";
import {
  addUsersData,
  getOneUserRegistered,
  getUrlImage,
  updateUserRegistered,
  uploadImage,
} from "../../service/user";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { Capacitor } from "@capacitor/core";
import { camera, trash, close } from "ionicons/icons";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { DocumentData } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
const uidSub: any = uuidv4().substring(0, 8);

function Register({ history }: any) {
  const { valueId } = useParams<{ valueId: string }>();
  const [name, setName] = useState<any>("");
  const [lastname, setLastname] = useState<any>("");
  const [numfam, setNumfam] = useState<any>("");
  const [dir, setdir] = useState<any>();
  const [id, setId] = useState<any>("");
  const { user } = useContext(UserContext);

  const [imgUrl, setImgUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Geoposition>();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [auxUid, setAuxUid] = useState<string>("");
  const [file, setFile] = useState<any>();
  useEffect(() => {
    if (valueId && user) {
      const getOneUserSnapshot = (snapshot: DocumentData) => {
        console.log("SnapshotData 1 user: ", snapshot.data());
        const userRegistered = snapshot.data();
        setName(userRegistered.name);
        setLastname(userRegistered.lastname);
        setId(userRegistered.id);
        setNumfam(userRegistered.numfam);
        setImgUrl(userRegistered.img);
        setAuxUid(userRegistered.uid);
      };
      getOneUserRegistered(user.uid, valueId, getOneUserSnapshot);
    }
  }, [valueId]);

  const geoLocation = async () => {
    setLoading(true);
    setRedirect(true);
    try {
      const position = await Geolocation.getCurrentPosition();
      setPosition(position);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const submitRegister = () => {
    const response = uploadImage(file);
    response.then((res) => {
      getUrlImage(res.ref.fullPath).then((url) => {
        console.log("url: ", url);
        const newUserRegistered = {
          name: name,
          lastname: lastname,
          numfam: numfam,
          id: id,
          img: url,
          uid: uidSub,
        };
        if (user) {
          addUsersData(user.uid, newUserRegistered)
            .then((res) => {
              console.log("res succes: ", res);
              alert("Usuario registrado exitosamente");
            })
            .catch(() => {
              alert("ERROR INESPERADO =(");
            });
        } else {
          alert("No hay usuario");
        }
      });
    });
  };
  const submitUpload = () => {
    if (file) {
      const response = uploadImage(file);
      response.then((res) => {
        getUrlImage(res.ref.fullPath).then((url) => {
          console.log("url: ", url);
          const newUserRegistered = {
            name: name,
            lastname: lastname,
            numfam: numfam,
            id: id,
            img: url,
            uid: auxUid,
          };
          if (user) {
            updateUserRegistered(user.uid, newUserRegistered)
              .then((res) => {
                console.log("res succes: ", res);
                alert("Usuario actualizado exitosamente");
                history.push("/main-page");
              })
              .catch((e) => {
                console.log("Error", e);
                alert("ERROR INESPERADO");
              });
          } else {
            alert("no hay usuario");
          }
        });
      });
    } else {
      const newUserRegistered = {
        name: name,
        lastname: lastname,
        numfam: numfam,
        id: id,
        // img: imgUrl,
        uid: auxUid,
      };
      if (user) {
        updateUserRegistered(user.uid, newUserRegistered)
          .then((res) => {
            console.log("res succes: ", res);
            alert("Usuario actualizado exitosamente");
          })
          .catch((e) => {
            console.log("Error", e);
            alert("ERROR INESPERADO");
          });
      } else {
        alert("no hay usuario");
      }
    }
  };

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const fileName = new Date().getTime() + ".jpeg";
    const newFile = {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
    setFile(newFile);
    console.log("newFile: ", newFile);
  };

  const inputRef = useRef<any>(null);
  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Popeyes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton routerLink="/main-page" class="ion-padding-vertical">
          Menu Principal
        </IonButton>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IonTitle class="ion-text-center" style={{ marginTop: "50px" }}>
            Añadir Nuevo popeye
          </IonTitle>

          <IonItem color="tertiary" class="ion-margin">
            <IonLabel position="floating">Nombres</IonLabel>
            <IonInput
              value={name}
              type="text"
              required
              onIonChange={(e) => setName(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem color="tertiary" class="ion-margin">
            <IonLabel position="floating">Apellidos</IonLabel>
            <IonInput
              value={lastname}
              type="text"
              required
              onIonChange={(e) => setLastname(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem color="tertiary" class="ion-margin">
            <IonLabel position="floating">Número de Cargo</IonLabel>
            <IonInput
              value={numfam}
              type="text"
              required
              onIonChange={(e) => setNumfam(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem color="tertiary" class="ion-margin">
            <IonLabel position="floating">Cédula</IonLabel>
            <IonInput
              value={id}
              type="text"
              required
              onIonChange={(e) => setId(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonButton
            color="tertiary"
            size="default"
            onClick={handleClick}
            class="ion-padding-vertical"
            // onClick={() => takePhoto()}
          >
            Añadir imagen
            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e: any) => {
                const file = e.target.files[0];
                if (!file) {
                  return;
                }
                setFile(file);
              }}
            />
            {/* <input
            type="file"
            onChange={(e: any) => {
              const file = e.target.files[0];
              if (!file) {
                return;
              }
              setFile(file);
            }}
          ></input> */}
          </IonButton>
          {valueId ? (
            <IonButton
              color="success"
              size="default"
              style={{ paddingInline: "47%" }}
              class="ion-padding-vertical"
              onClick={submitUpload}
            >
              ACTUALIZAR
            </IonButton>
          ) : (
            <IonButton
              color="success"
              size="default"
              style={{ paddingInline: "47%" }}
              class="ion-padding-vertical"
              onClick={submitRegister}
            >
              GUARDAR
            </IonButton>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Register;
