import { RefObject, useEffect, useState, useRef } from "react";
import * as I from "@ionic/react";

import { saveRoast, fetchGreens } from "../db";
import supabase from "../utils/supabase";

interface AddRoastProps {
  modal: RefObject<HTMLIonModalElement>;
}

const AddRoast: React.FC<AddRoastProps> = ({ modal }) => {
  const [drySeconds, setDrySeconds] = useState(null);
  const [fcsSeconds, setFcsSeconds] = useState(null);
  const [dropSeconds, setDropSeconds] = useState(null);
  const [weightLoss, setWeightLoss] = useState(null);
  const [greens, setGreens] = useState([]);
  const [green, setGreen] = useState(null);
  const [roastDate, setRoastDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    async function loadGreens() {
      const greens: any = await fetchGreens(supabase);
      setGreens(greens);
    }
    loadGreens();
  }, []);

  return (
    <>
      <I.IonContent className="ion-padding">
        <I.IonList>
          <I.IonItem>
            <I.IonSelect
              label="Green"
              value={green}
              onIonChange={(event) => {
                setGreen(Number(event.detail.value));
              }}
            >
              {greens.map((green: any) => {
                return (
                  <I.IonSelectOption value={green.id}>
                    {green.name}
                  </I.IonSelectOption>
                );
              })}
            </I.IonSelect>
          </I.IonItem>
          <I.IonItem>
            <I.IonLabel>Roast Date</I.IonLabel>
            <I.IonDatetimeButton datetime="roast-date"></I.IonDatetimeButton>
          </I.IonItem>
          <I.IonItem>
            <I.IonInput
              value={drySeconds}
              onIonInput={(event) => {
                setDrySeconds(Number(event.detail.value) ?? 0);
              }}
              label="Dry Time (Seconds)"
            />
          </I.IonItem>
          <I.IonItem>
            <I.IonInput
              value={fcsSeconds}
              type="number"
              placeholder=""
              onIonInput={(event) => {
                setFcsSeconds(Number(event.detail.value) ?? 0);
              }}
              label="FCs Time (Seconds)"
            />
          </I.IonItem>
          <I.IonItem>
            <I.IonInput
              value={dropSeconds}
              onIonInput={(event) => {
                setDropSeconds(Number(event.detail.value) ?? 0);
              }}
              label="Drop Time (Seconds)"
            />
          </I.IonItem>
          <I.IonItem>
            <I.IonInput
              value={weightLoss}
              onIonInput={(event) => {
                setWeightLoss(Number(event.detail.value) ?? 0);
              }}
              label="Weight Loss (Percentage)"
            />
          </I.IonItem>
        </I.IonList>
        <I.IonFooter>
          <I.IonGrid style={{ marginTop: "6rem" }}>
            <I.IonRow class="ion-justify-content-center">
              <I.IonCol size-md="6" size-lg="6" size-xs="12">
                <I.IonButton
                  expand="block"
                  disabled={
                    !green ||
                    !drySeconds ||
                    !fcsSeconds ||
                    !dropSeconds ||
                    !roastDate
                  }
                  onClick={() => {
                    saveRoast(
                      supabase,
                      green,
                      roastDate,
                      drySeconds,
                      fcsSeconds,
                      dropSeconds,
                      weightLoss,
                    );
                    modal.current?.dismiss();
                  }}
                >
                  Save
                </I.IonButton>
              </I.IonCol>
            </I.IonRow>
          </I.IonGrid>
        </I.IonFooter>
      </I.IonContent>
      <I.IonModal keepContentsMounted={true}>
        <I.IonDatetime
          id="roast-date"
          showDefaultButtons={true}
          presentation="date"
          value={roastDate}
          onIonChange={(event) => {
            setRoastDate(event.detail.value);
          }}
        ></I.IonDatetime>
      </I.IonModal>
    </>
  );
};

export default AddRoast;
