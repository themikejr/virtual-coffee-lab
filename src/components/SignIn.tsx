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
  IonImg,
} from "@ionic/react";
import supabase from "../utils/supabase";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) console.error("Error logging in:", error.message);
    else console.log("User logged in", user);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="">
        <IonImg
          src="/vcl.png"
          alt=""
          className="ion-text-center"
          style={{
            maxWidth: "250px",
            margin: "auto",
            marginTop: "3rem",
            marginBottom: "3rem",
          }}
        ></IonImg>

        <IonGrid fixed={true} justify-content-center>
          <IonRow class="ion-justify-content-center">
            <IonCol size-md="6" size-lg="6" size-xs="12">
              <IonText>
                <p>
                  You must sign in with your Virtual Coffee Lab ID to continue.
                </p>
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow class="ion-justify-content-center">
            <IonCol size-md="6" size-lg="6" size-xs="12">
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  onKeyPress={handleKeyPress}
                  clearInput
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  onKeyPress={handleKeyPress}
                  clearInput
                ></IonInput>
              </IonItem>
              <IonButton
                expand="block"
                onClick={handleLogin}
                style={{ marginTop: "2rem" }}
              >
                Login
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
