import { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
  IonBackButton,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Greens.css";
import supabase from "../utils/supabase";
import { fetchGreens } from "../db";

import AddGreen from "../components/AddGreen";
import GreenDetail from "../components/GreenDetail";

const GreensDetail: React.FC = () => {
  const [greens, setGreens] = useState([]);

  // const addGreenModal = useRef<HTMLIonModalElement>(null);

  const history = useHistory();
  const location = useLocation();

  // useEffect(() => {
  //   async function loadGreens() {
  //     const greens: any = await fetchGreens(supabase);
  //     setGreens(greens);
  //   }
  //   loadGreens();
  // }, []);

  return (
    <IonPage className="ion-padding">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Greens Detail</IonTitle>
        </IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/greens" />
        </IonButtons>
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
              Greens Detail
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <GreenDetail green={location.state?.data} />
        </IonContent>
      </IonContent>

      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default GreensDetail;
