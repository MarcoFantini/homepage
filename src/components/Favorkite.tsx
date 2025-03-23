import { PanelMenu } from "primereact/panelmenu";
import React from "react";

import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";

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

const Favorkite: React.FC = () => {
  const handleClick = (link?: string) => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  const transformData = (items: FavoriteItem[]): any[] => {
    return items.map((item) => ({
      ...item,
      template: !item.items
        ? (itemData: FavoriteItem) => (
            <div className="p-2">
              <div
                style={{
                  cursor: "pointer",
                  minHeight: "75px",
                  maxHeight: "fit-content",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                }}
                onClick={() => handleClick(itemData.link)}
              >
                <div style={{ textAlign: "center" }}>
                  <h5
                    style={{
                      margin: "0",
                      fontSize: "1em",
                      marginBottom: "2.5px",
                    }}
                  >
                    {itemData.label}
                  </h5>
                  <p
                    style={{
                      wordBreak: "break-all",
                      fontSize: "0.8em",
                      margin: "0",
                      color: "#555",
                    }}
                  >
                    {itemData.link}
                  </p>
                </div>
              </div>
            </div>
          )
        : undefined,
      items: item.items ? transformData(item.items) : undefined,
    }));
  };

  const transformedData = transformData(convertToFavoritesData(favoritesData));

  return (
    <div style={{ width: "80%", margin: "0 auto", marginTop: "70px" }}>
      <h2>Favorites</h2>
      <PanelMenu model={transformedData} />
    </div>
  );
};

export default Favorkite;
