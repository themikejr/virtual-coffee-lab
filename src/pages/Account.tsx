import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import supabase from "../utils/supabase";

const Account: React.FC = () => {
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");

  const handleLogout = async () => {
    supabase.auth.signOut();
  };
  // const handleLogin = async () => {
  //   const {
  //     data: { user },
  //     error,
  //   } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) console.error("Error logging in:", error.message);
  //   else console.log("User logged in", user);
  // };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol size-md="6" size-lg="6" size-xs="12">
              <IonText>
                <p>You are currently signed in.</p>
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow class="ion-justify-content-center">
            <IonCol size-md="6" size-lg="6" size-xs="12">
              <IonButton expand="block" onClick={handleLogout}>
                Logout
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Account;
