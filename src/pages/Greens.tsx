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
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonButton,
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
            <IonButton
              disabled={true}
              fill="outline"
              size="small"
              style={{
                width: "100px",
                display: "inline-block",
                marginTop: "-2rem",
              }}
            >
              Add Green
            </IonButton>
          </IonToolbar>
        </IonHeader>

        {greens.length && (
          <IonList inset={true}>
            {greens.map((green: any) => {
              return (
                <IonItem
                  key={green.id}
                  button={true}
                  // onClick={() => {
                  //   setSelectedRoast(roast);
                  // }}
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
    </IonPage>
  );
};

export default Greens;
