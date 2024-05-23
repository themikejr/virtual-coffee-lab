import "./RoastDetail.css";
import {
  IonCard,
  IonCardContent,
  IonText,
  IonList,
  IonItem,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonTextarea,
  IonGrid,
  IonRow,
  IonCol,
  IonFooter,
} from "@ionic/react";
import { useEffect, useState, useRef } from "react";
import supabase from "../utils/supabase";
import { fetchNotesForRoast, fetchRoasts, saveNote } from "../db";

interface GreenDetailProps {
  green: any;
}

const GreenDetail: React.FC<GreenDetailProps> = ({ green }) => {
  // const [notes, setNotes] = useState([]);
  // const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  // const addNoteModal = useRef<HTMLIonModalElement>(null);

  // const [newNoteContent, setNewNoteContent] = useState("");

  // console.log("ROAST", roast);

  // const drySeconds = roast.dry_time;
  // const dryLength = formatTime(drySeconds);

  // const dryPercentage = Math.round((roast.dry_time / roast.drop_time) * 100);
  // const phase2Percentage = Math.round(
  //   ((roast.fcs_time - roast.dry_time) / roast.drop_time) * 100,
  // );

  // const phase3Percentage = Math.round(
  //   ((roast.drop_time - roast.fcs_time) / roast.drop_time) * 100,
  // );

  // const fcsSeconds = roast.fcs_time;
  // const fcsLength = formatTime(fcsSeconds - drySeconds);

  // const dropSeconds = roast.drop_time;
  // const dropLength = formatTime(dropSeconds - fcsSeconds);

  // const roastLength = formatTime(roast.drop_time);

  // useEffect(() => {
  //   async function loadNotes() {
  //     const notes: any = await fetchNotesForRoast(supabase, roast.id);
  //     setNotes(notes);
  //   }
  //   loadNotes();
  // }, [showAddNoteModal]);
  return (
    <>
      <p>teh contentz</p>
      <div>{JSON.stringify(green)}</div>
    </>
  );
};

export default GreenDetail;
