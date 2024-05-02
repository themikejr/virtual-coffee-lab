import { useEffect, useState } from "react";
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
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Greens.css";
import supabase from "../utils/supabase";
import { fetchGreens } from "../db";

const Greens: React.FC = () => {
  const [greens, setGreens] = useState([]);

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
            <IonTitle size="large">Greens</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed={true}>
          <IonRow>
            <IonText>
              <h1>Current Inventory</h1>
            </IonText>
          </IonRow>
          <IonRow>
            <IonCol style={{ fontWeight: "bold" }}>Name</IonCol>
            <IonCol style={{ fontWeight: "bold" }}>Country</IonCol>
            <IonCol style={{ fontWeight: "bold" }}>Cultivar</IonCol>
            <IonCol style={{ fontWeight: "bold" }}>Remaining</IonCol>
          </IonRow>

          {greens.length &&
            greens.map((green: any) => {
              return (
                <IonRow key={green.name}>
                  <IonCol>{green.name}</IonCol>
                  <IonCol>{green.country}</IonCol>
                  <IonCol>{green.cultivar}</IonCol>
                  <IonCol>{green.initial_quantity}</IonCol>
                </IonRow>
              );
            })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Greens;
