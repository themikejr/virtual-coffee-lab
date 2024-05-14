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

function prettyDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function daysSinceRoast(noteDate: string, roastDate: string) {
  const roastDateObj: any = new Date(roastDate);
  // roastDateObj.setHours(0, 0, 0, 0); // Set time to midnight
  const noteDateObj: any = new Date(noteDate);
  // noteDateObj.setHours(0, 0, 0, 0); // Set time to midnight
  // console.log(noteDate, roastDate);

  const timeDiff = noteDateObj - roastDateObj;
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  return dayDiff;
}

function formatTime(secondsDecimal: number): string {
  const totalSeconds = Math.round(secondsDecimal);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

interface ContainerProps {
  roast: any;
}

const RoastDetail: React.FC<ContainerProps> = ({ roast }) => {
  const [notes, setNotes] = useState([]);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const addNoteModal = useRef<HTMLIonModalElement>(null);

  const [newNoteContent, setNewNoteContent] = useState("");

  // console.log("ROAST", roast);

  const drySeconds = roast.dry_time;
  const dryLength = formatTime(drySeconds);

  const dryPercentage = Math.round((roast.dry_time / roast.drop_time) * 100);
  const phase2Percentage = Math.round(
    ((roast.fcs_time - roast.dry_time) / roast.drop_time) * 100,
  );

  const phase3Percentage = Math.round(
    ((roast.drop_time - roast.fcs_time) / roast.drop_time) * 100,
  );

  const fcsSeconds = roast.fcs_time;
  const fcsLength = formatTime(fcsSeconds - drySeconds);

  const dropSeconds = roast.drop_time;
  const dropLength = formatTime(dropSeconds - fcsSeconds);

  const roastLength = formatTime(roast.drop_time);

  useEffect(() => {
    async function loadNotes() {
      const notes: any = await fetchNotesForRoast(supabase, roast.id);
      setNotes(notes);
    }
    loadNotes();
  }, [showAddNoteModal]);
  return (
    <>
      <IonText className="ion-padding">
        <h1 className="ion-padding" style={{ paddingBottom: "0" }}>
          {roast.green.name}
        </h1>
        <p className="ion-padding" style={{ paddingTop: "0" }}>
          <strong>{roast.green.country}</strong>,{" "}
          {roast.roast_date.replaceAll("/", ".")}
        </p>
      </IonText>
      <div
        className="roast-summary ion-text-center"
        style={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <span className="phase phase-1">
          <span className="time">{dryLength}</span>
          <br />
          <span className="percent">{`${dryPercentage}%`}</span>
        </span>
        <span className="phase phase-2">
          <span className="time">{fcsLength}</span>
          <br />
          <span className="percent">{`${phase2Percentage}%`}</span>
        </span>
        <span className="phase phase-3">
          <span className="time">{dropLength}</span>
          <br />
          <span className="percent">{`${phase3Percentage}%`}</span>
        </span>
      </div>
      <table className="ion-text-center" style={{ margin: "auto" }}>
        <tbody>
          {/* <tr> */}
          {/*   <td>Weight Loss</td> */}
          {/*   <td>11%</td> */}
          {/* </tr> */}

          <tr>
            <td>Roast Length</td>
            <td>{roastLength}</td>
          </tr>

          {/* <tr> */}
          {/*   <td>Charge Temp</td> */}
          {/*   <td>180ºF</td> */}
          {/* </tr> */}

          {/* <tr> */}
          {/*   <td>Drop Temp</td> */}
          {/*   <td>192ºF</td> */}
          {/* </tr> */}
        </tbody>
      </table>

      <IonText className="ion-padding">
        <h1
          className="ion-padding"
          style={{
            width: "max-content",
            minWidth: "0",
            display: "inline-block",
          }}
        >
          Notes
        </h1>
        <IonButton
          fill="outline"
          size="small"
          style={{
            width: "100px",
            display: "inline-block",
            marginTop: "-1rem",
          }}
          onClick={() => {
            // console.log("click");
            setShowAddNoteModal(true);
          }}
        >
          Add Note
        </IonButton>
      </IonText>
      <IonList style={{ overflowY: "auto" }}>
        {notes.length &&
          notes.map((note: any) => {
            return (
              <IonItem key={note.id}>
                <IonCard style={{ whiteSpace: "pre-wrap" }}>
                  <IonCardHeader>
                    <IonCardTitle>{note.user.display_name}</IonCardTitle>
                    <IonCardSubtitle>
                      {`${prettyDate(note.created_at)} (day ${daysSinceRoast(note.created_at, note.roast.roast_date)})`}
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonText class="ion-text-left">
                      <p>{note.content}</p>
                    </IonText>
                  </IonCardContent>
                </IonCard>
              </IonItem>
            );
          })}
      </IonList>
      {showAddNoteModal && (
        <IonModal
          ref={addNoteModal}
          isOpen={showAddNoteModal}
          onWillDismiss={() => {
            setShowAddNoteModal(false);
          }}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton
                  onClick={() => {
                    addNoteModal.current?.dismiss();
                    return;
                  }}
                >
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle className="ion-text-center">Add Note</IonTitle>
              <IonButtons slot="end"></IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonTextarea
              placeholder="Add note here..."
              autoGrow={true}
              style={{ height: "60%", overflowY: "scroll" }}
              value={newNoteContent}
              onIonInput={(event) => {
                setNewNoteContent(event.target.value ?? "");
              }}
            />
            <IonFooter>
              <IonGrid style={{ marginTop: "6rem" }}>
                <IonRow class="ion-justify-content-center">
                  <IonCol size-md="6" size-lg="6" size-xs="12">
                    <IonButton
                      expand="block"
                      onClick={() => {
                        saveNote(supabase, newNoteContent, roast.id);
                        addNoteModal.current?.dismiss();
                      }}
                    >
                      Save
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonFooter>
          </IonContent>
        </IonModal>
      )}
    </>
  );
};

export default RoastDetail;
