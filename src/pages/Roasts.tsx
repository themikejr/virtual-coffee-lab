import { useEffect, useState, useRef } from "react";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonModal,
  IonButtons,
  IonButton,
  IonLabel,
} from "@ionic/react";
// import ExploreContainer from "../components/ExploreContainer";
import RoastDetail from "../components/RoastDetail";
import "./Roasts.css";
import supabase from "../utils/supabase";
import { fetchRoasts } from "../db";

const Roasts: React.FC = () => {
  const [roasts, setRoasts] = useState([]);
  const [selectedRoast, setSelectedRoast] = useState(null);
  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    async function loadRoasts() {
      const roasts: any = await fetchRoasts(supabase);
      setRoasts(roasts);
    }
    loadRoasts();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Roasts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {roasts.length && (
          <IonList inset={true}>
            {roasts.map((roast: any) => {
              return (
                <IonItem
                  key={roast.id}
                  button={true}
                  onClick={() => {
                    setSelectedRoast(roast);
                  }}
                >
                  <IonLabel>
                    <h2>{`${roast.green.name}, ${roast.green.country}`}</h2>
                    <p>{roast.roast_date}</p>
                  </IonLabel>
                </IonItem>
              );
            })}

            {/* <ExploreContainer name="Roasts" /> */}
          </IonList>
        )}
      </IonContent>

      <IonModal
        ref={modal}
        isOpen={Boolean(selectedRoast)}
        onWillDismiss={() => {
          setSelectedRoast(null);
        }}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  modal.current?.dismiss();
                  return;
                }}
              >
                Close
              </IonButton>
            </IonButtons>
            <IonTitle className="ion-text-center">Roast Detail</IonTitle>
            <IonButtons slot="end"></IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {selectedRoast && <RoastDetail roast={selectedRoast} />}
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Roasts;
