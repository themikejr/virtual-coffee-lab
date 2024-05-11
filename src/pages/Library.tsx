import { useEffect, useState, useRef } from "react";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonList,
  IonItem,
  IonModal,
  IonButtons,
  IonButton,
  IonLabel,
} from "@ionic/react";
import VideoSearch from "../components/VideoSearch";

const Library: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Library</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonText className="ion-text-center">
          <p>Search the VCL YouTube Library</p>
        </IonText>
        <VideoSearch />
      </IonContent>
    </IonPage>
  );
};

export default Library;
