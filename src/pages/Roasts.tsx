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
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
// import ExploreContainer from "../components/ExploreContainer";
import RoastDetail from "../components/RoastDetail";
import AddRoast from "../components/AddRoast";
import "./Roasts.css";
import supabase from "../utils/supabase";
import { fetchRoasts } from "../db";

const Roasts: React.FC = () => {
  const [roasts, setRoasts] = useState([]);
  const [selectedRoast, setSelectedRoast] = useState(null);
  const modal = useRef<HTMLIonModalElement>(null);

  const [showAddRoastModal, setShowAddRoastModal] = useState(false);
  const addRoastModal = useRef<HTMLIonModalElement>(null);

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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle
              size="large"
              style={{
                width: "max-content",
                minWidth: "0",
                display: "inline-block",
              }}
            >
              Roasts
            </IonTitle>
          </IonToolbar>
        </IonHeader>

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
      <IonFooter>
        <IonGrid style={{ marginBottom: "1rem" }}>
          <IonRow class="ion-justify-content-center">
            <IonCol size-md="6" size-lg="6" size-xs="12">
              <IonButton
                id="open-add-roast-modal"
                fill="outline"
                expand="block"
              >
                Add Roast
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>

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

      <IonModal
        ref={addRoastModal}
        // isOpen={showAddRoastModal}
        trigger="open-add-roast-modal"
        onWillDismiss={() => {
          // setShowAddNoteModal(false);
        }}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  addRoastModal.current?.dismiss();
                  return;
                }}
              >
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle className="ion-text-center">Add Roast</IonTitle>
            <IonButtons slot="end"></IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <AddRoast modal={addRoastModal} />
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Roasts;
