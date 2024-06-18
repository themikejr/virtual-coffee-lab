import { RefObject, useEffect, useState, useRef } from "react";
import * as I from "@ionic/react";

import { saveRoast, fetchGreens, saveGreen, getCultivarValues } from "../db";
import supabase from "../utils/supabase";

interface AddGreenProps {
  modal: RefObject<HTMLIonModalElement>;
  onClose: Function;
}

const AddGreen: React.FC<AddGreenProps> = ({ modal, onClose }) => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [process, setProcess] = useState("");
  const [elevationMasl, setElevationMasl] = useState<number | null>(null);
  const [initialQuantity, setInitialQuantity] = useState<number | null>(0);
  const [importer, setImporter] = useState("");
  const [selectedCultivar, setSelectedCultivar] = useState<number | null>(null);
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [cultivars, setCultivars] = useState([]);

  useEffect(() => {
    async function loadCultivars() {
      const cultivars: any = await getCultivarValues(supabase);
      setCultivars(cultivars);
    }
    loadCultivars();
  }, []);

  return (
    <>
      <I.IonContent className="ion-padding">
        <I.IonList>
          <I.IonItem>
            <I.IonLabel>Purchase Date</I.IonLabel>
            <I.IonDatetimeButton datetime="purchase-date"></I.IonDatetimeButton>
          </I.IonItem>
          <I.IonItem>
            <I.IonInput
              value={initialQuantity}
              onIonInput={(event) => {
                if (event.detail.value) {
                  setInitialQuantity(Number(event.detail.value));
                }
              }}
              label="Initial Quantity"
            />
          </I.IonItem>

          <I.IonItem>
            <I.IonInput
              value={name}
              onIonInput={(event) => {
                setName(event.detail.value ?? "");
              }}
              label="Name"
            />
          </I.IonItem>
          <I.IonItem>
            <I.IonInput
              value={country}
              onIonInput={(event) => {
                setCountry(event.detail.value ?? "");
              }}
              label="Country"
            />
          </I.IonItem>
          <I.IonItem>
            <I.IonInput
              value={region}
              onIonInput={(event) => {
                setRegion(event.detail.value ?? "");
              }}
              label="Region"
            />
          </I.IonItem>

          <I.IonItem>
            <I.IonInput
              value={process}
              type="text"
              placeholder=""
              onIonInput={(event) => {
                setProcess(event.detail.value ?? "");
              }}
              label="Process"
            />
          </I.IonItem>

          <I.IonItem>
            <I.IonSelect
              label="Cultivar"
              value={selectedCultivar}
              onIonChange={(event) => {
                setSelectedCultivar(Number(event.detail.value));
              }}
            >
              {cultivars.map((cultivar: any) => {
                return (
                  <I.IonSelectOption
                    value={cultivar.id}
                    key={`cultivar-${cultivar.id}`}
                  >
                    {cultivar.name}
                  </I.IonSelectOption>
                );
              })}
            </I.IonSelect>
          </I.IonItem>

          <I.IonItem>
            <I.IonInput
              value={importer}
              type="text"
              placeholder=""
              onIonInput={(event) => {
                setImporter(event.detail.value ?? "");
              }}
              label="Importer"
            />
          </I.IonItem>

          <I.IonItem>
            <I.IonInput
              value={elevationMasl}
              onIonInput={(event) => {
                setElevationMasl(Number(event.detail.value) ?? 0);
              }}
              label="Elevation (MASL)"
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
                    !name ||
                    !country ||
                    !region ||
                    !process ||
                    !elevationMasl ||
                    !initialQuantity ||
                    !selectedCultivar
                  }
                  onClick={async () => {
                    await saveGreen(
                      supabase,
                      name,
                      country,
                      region,
                      process,
                      elevationMasl ?? 0,
                      initialQuantity ?? 0,
                      importer,
                      selectedCultivar ?? 1,
                      purchaseDate,
                    );
                    modal.current?.dismiss();
                    onClose();
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
          id="purchase-date"
          showDefaultButtons={true}
          presentation="date"
          value={purchaseDate}
          onIonChange={(event) => {
            const newPurchaseDate = event.detail?.value;
            if (newPurchaseDate) {
              if (Array.isArray(newPurchaseDate)) {
                setPurchaseDate(newPurchaseDate[0]);
              } else {
                setPurchaseDate(newPurchaseDate);
              }
            }
          }}
        ></I.IonDatetime>
      </I.IonModal>
    </>
  );
};

export default AddGreen;
