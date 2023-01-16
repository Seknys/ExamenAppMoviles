import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import MainPage from "./pages/MainPage/MainPage";
import { useEffect, useState } from "react";
import { getCurrentUser, getUserByUid } from "./service/auth";
import { IUser } from "./interface/user";
import { UserContextProvider } from "./context/userContext";
import DisplayUsers from "./pages/DisplayUsers/DisplayUsers";
import RegisterUserAuth from "./pages/Login/authRegister";

setupIonicReact();

const App: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getUserByUidSnapshot = (snapshot: any) => {
      const user = snapshot.data();
      // console.log("UserRole: ", user.role);
      console.log("USER: ", user);

      setUser(user);
    };
    const getCurrentUserSnapshot = (snapshot: any) => {
      if (snapshot) {
        const userUid = snapshot.uid;
        getUserByUid(userUid, getUserByUidSnapshot);
      } else {
        setUser(null);
      }
    };
    getCurrentUser(getCurrentUserSnapshot);
  }, []);
  return (
    <IonApp>
      <UserContextProvider value={{ user, setUser }}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login" component={Login} />

            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/main-page" component={MainPage} />
            <Route exact path="/register-user-censo" component={Register} />
            <Route
              exact
              path="/register-newUser"
              component={RegisterUserAuth}
            />

            <Route exact path="/view-users">
              <DisplayUsers />
            </Route>
            <Route exact path="/edit-user/:valueId" component={Register} />
          </IonRouterOutlet>
        </IonReactRouter>
      </UserContextProvider>
    </IonApp>
  );
};

export default App;
