import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonButton,
  IonFooter,
  IonModal,
  IonButtons,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Greens.css";
import supabase from "../utils/supabase";
import { fetchGreens } from "../db";

import AddGreen from "../components/AddGreen";

const Greens: React.FC = () => {
  const [greens, setGreens] = useState([]);

  const addGreenModal = useRef<HTMLIonModalElement>(null);

  const history = useHistory();

  useEffect(() => {
    async function loadGreens() {
      const greens: any = await fetchGreens(supabase);
      setGreens(greens);
    }
    loadGreens();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Greens</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
              Greens
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        {greens.length && (
          <IonList inset={true}>
            {greens.map((green: any) => {
              return (
                <IonItem
                  key={green.id}
                  button={true}
                  onClick={() => {
                    history.push("/greens/detail", { data: green });
                  }}
                >
                  <IonLabel>
                    <h2>{`${green.name}, ${green.country}`}</h2>
                    <p>{green.cultivar}</p>
                  </IonLabel>

                  <IonNote slot="end">{`${green.initial_quantity} lbs.`}</IonNote>
                </IonItem>
              );
            })}
          </IonList>
        )}
      </IonContent>

      <IonFooter>
        <IonGrid style={{ marginBottom: "1rem" }}>
          <IonRow class="ion-justify-content-center">
            <IonCol size-md="6" size-lg="6" size-xs="12">
              <IonButton
                id="open-add-green-modal"
                fill="outline"
                expand="block"
              >
                Add Green
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>

      <IonModal
        ref={addGreenModal}
        // isOpen={showAddRoastModal}
        trigger="open-add-green-modal"
        onWillDismiss={() => {
          // setShowAddNoteModal(false);
        }}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  addGreenModal.current?.dismiss();
                  return;
                }}
              >
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle className="ion-text-center">Add Green</IonTitle>
            <IonButtons slot="end"></IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {" "}
          <AddGreen modal={addGreenModal} />{" "}
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Greens;
