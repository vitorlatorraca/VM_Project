// frontend/app/mapa/page.tsx

import React from "react";
import MapComponent from "../../components/MapComponent";

export default function MapaPage() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Página do Mapa</h1>
      <MapComponent />
    </div>
  );
}
