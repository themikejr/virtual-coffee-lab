import React, { useState, useEffect } from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonSearchbar,
} from "@ionic/react";
import supabase from "../utils/supabase"; // Ensure you import your supabase client
import { searchVideos } from "../db";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function queryVideos() {
      const joinedTerms = searchTerm.split(" ").join(" & ");
      const results: any = await searchVideos(supabase, joinedTerms);
      console.log("QUERY", results);
      setSearchResults(results);
    }
    queryVideos();
  }, [searchTerm]);

  const handleSearch = (event: any) => {
    setSearchTerm(event.detail.value);
  };

  return (
    <>
      <IonSearchbar
        animated={true}
        placeholder="Type to search..."
        onIonInput={handleSearch}
        debounce={500}
      ></IonSearchbar>
      <IonList inset={true}>
        {searchResults.map((item: any, index) => (
          <IonItem
            key={index}
            button={true}
            detail={false}
            href={item.yt_url}
            target="_new"
          >
            <IonLabel>
              <strong>{item.title}</strong>
              <br />
              <i style={{ fontSize: "0.8rem", marginTop: "0.2rem" }}>
                {item.published_date.replaceAll("-", ".")}
              </i>
              <br />
              <IonNote>
                <p
                  style={{ marginTop: "0.5rem" }}
                >{`${item.description.substring(0, 150)}...`}</p>
              </IonNote>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </>
  );
};

export default SearchComponent;
