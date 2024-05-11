import { useEffect, useState, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonImg,
  IonButton,
} from "@ionic/react";
import VideoSearch from "../components/VideoSearch";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import supabase from "../utils/supabase";
import { searchVideos } from "../db";

//const { data, error } = await supabase.from('books').select().textSearch('fts', `'little' & 'big'`)

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function queryVideos() {
      const results: any = await searchVideos(supabase, "bullet");
      console.log("QUERY", results);
      setSearchResults(results);
    }
    queryVideos();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Home" /> */}
        <IonContent className="ion-padding">
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
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
