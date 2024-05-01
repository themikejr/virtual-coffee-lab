import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Roasts.css";

const Roasts: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Roasts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Roasts</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Roasts" />
      </IonContent>
    </IonPage>
  );
};

export default Roasts;
