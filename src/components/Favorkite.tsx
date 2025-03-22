import React from "react";
import { PanelMenu } from "primereact/panelmenu";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import favoritesData from "../db/favorites.json";

interface FavoriteItem {
  label: string;
  icon?: string;
  items?: FavoriteItem[];
  link?: string;
}

function convertToFavoritesData(originalData: any): FavoriteItem[] {
  const favoritesData: FavoriteItem[] = [];

  if (typeof originalData !== "object" || originalData === null) {
    return favoritesData;
  }

  if (Array.isArray(originalData)) {
    for (const item of originalData) {
      if (
        typeof item === "object" &&
        item !== null &&
        "nome" in item &&
        "link" in item
      ) {
        favoritesData.push({
          label: item.nome,
          icon: "pi pi-file",
          link: item.link,
        });
      } else if (typeof item === "object" && item !== null) {
        for (const key in item) {
          if (
            typeof item[key] === "object" &&
            item[key] !== null &&
            Array.isArray(item[key])
          ) {
            favoritesData.push({
              label: key,
              icon: "pi pi-folder",
              items: convertToFavoritesData(item[key]),
            });
          } else if (typeof item[key] === "object" && item[key] !== null) {
            favoritesData.push({
              label: key,
              icon: "pi pi-folder",
              items: convertToFavoritesData(item[key]),
            });
          } else if (
            typeof item[key] === "object" &&
            item[key] !== null &&
            "nome" in item[key] &&
            "link" in item[key]
          ) {
            favoritesData.push({
              label: item[key].nome,
              icon: "pi pi-file",
              link: item[key].link,
            });
          }
        }
      }
    }
    return favoritesData;
  }

  for (const key in originalData) {
    if (
      typeof originalData[key] === "object" &&
      originalData[key] !== null &&
      Array.isArray(originalData[key])
    ) {
      favoritesData.push({
        label: key,
        icon: "pi pi-folder",
        items: convertToFavoritesData(originalData[key]),
      });
    } else if (
      typeof originalData[key] === "object" &&
      originalData[key] !== null
    ) {
      favoritesData.push({
        label: key,
        icon: "pi pi-folder",
        items: convertToFavoritesData(originalData[key]),
      });
    } else if (
      typeof originalData[key] === "object" &&
      originalData[key] !== null &&
      "nome" in originalData[key] &&
      "link" in originalData[key]
    ) {
      favoritesData.push({
        label: originalData[key].nome,
        icon: "pi pi-file",
        link: originalData[key].link,
      });
    } else if (typeof originalData[key] === "string") {
      favoritesData.push({
        label: key,
        icon: "pi pi-file",
        link: originalData[key],
      });
    }
  }

  return favoritesData;
}

// Example usage (replace with your original data):
// const originalData = { ... your data ... };
// const favorites = convertToFavoritesData(originalData);
// console.log(favorites);

const Favorkite: React.FC = () => {
  const handleClick = (link?: string) => {
    if (link) {
      window.open(link, "_blank")
    }
  };

  // Funzione per trasformare i dati aggiungendo l'onClick
  const transformData = (items: FavoriteItem[]): any[] => {
    return items.map((item) => ({
      ...item,
      command: () => handleClick(item.link), // Aggiunto il comando per l'onClick
      items: item.items ? transformData(item.items) : undefined,
    }));
  };

  const transformedData = transformData(convertToFavoritesData(favoritesData));

  return (
    <div style={{ width: "900px", margin: "0 auto" }}>
      <h2>Favorites</h2>
      <PanelMenu model={transformedData} />
    </div>
  );
};

export default Favorkite;
