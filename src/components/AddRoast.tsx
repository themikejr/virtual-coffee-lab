import { RefObject, useEffect, useState, useRef } from "react";
import * as I from "@ionic/react";

import { saveRoast } from "../db";
import supabase from "../utils/supabase";

interface AddRoastProps {
  modal: RefObject<HTMLIonModalElement>;
}

const AddRoast: React.FC<AddRoastProps> = ({ modal }) => {
  const [] = useState("");

  return (
    <>
      <I.IonContent className="ion-padding">
        <I.IonFooter>
          <I.IonGrid style={{ marginTop: "6rem" }}>
            <I.IonRow class="ion-justify-content-center">
              <I.IonCol size-md="6" size-lg="6" size-xs="12">
                <I.IonButton
                  expand="block"
                  onClick={() => {
                    saveRoast(supabase);
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
    </>
  );
};

export default AddRoast;
