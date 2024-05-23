import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonContent,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { server, speedometer, person, home, library } from "ionicons/icons";
import Home from "./pages/Home";
import Greens from "./pages/Greens";
import GreensDetail from "./pages/GreensDetail";
import Roasts from "./pages/Roasts";
import Library from "./pages/Library";
import Account from "./pages/Account";
import SignIn from "./components/SignIn";
import supabase from "./utils/supabase";

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const [session, setSession] = useState(null);
  console.log("SESSION", session);

  useEffect(() => {
    async function getSession() {
      const session: any = await supabase.auth.getSession();
      setSession(session.data.session);
    }

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session: any) => {
        setSession(session);
      },
    );

    getSession();

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return (
    <IonApp>
      {session && (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/greens">
                <Greens />
              </Route>
              <Route exact path="/greens/detail">
                <GreensDetail />
              </Route>

              <Route path="/roasts">
                <Roasts />
              </Route>
              <Route path="/library">
                <Library />
              </Route>

              <Route path="/account">
                <Account />
              </Route>

              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon aria-hidden="true" icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="greens" href="/greens">
                <IonIcon aria-hidden="true" icon={server} />
                <IonLabel>Greens</IonLabel>
              </IonTabButton>
              <IonTabButton tab="roasts" href="/roasts">
                <IonIcon aria-hidden="true" icon={speedometer} />
                <IonLabel>Roasts</IonLabel>
              </IonTabButton>
              <IonTabButton tab="library" href="/library">
                <IonIcon aria-hidden="true" icon={library} />
                <IonLabel>Library</IonLabel>
              </IonTabButton>
              <IonTabButton tab="account" href="/account">
                <IonIcon aria-hidden="true" icon={person} />
                <IonLabel>Account</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      )}

      {!session && (
        <IonContent fullscreen>
          <SignIn />
        </IonContent>
      )}
    </IonApp>
  );
};

export default App;
