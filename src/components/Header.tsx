// src/components/Header.tsx
import React from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        navigate("/homepage");
      },
    },
    {
      label: "Favorkite",
      icon: "pi pi-code",
      command: () => {
        navigate("/favorkite");
      },
    },
    {
      label: "Todoist",
      icon: "pi pi-calendar",
      command: () => {
        navigate("/todoist");
      },
    },
  ];

  return (
    <div
      className="p-fixed p-top-0 p-left-0 p-right-0 p-shadow-2"
      style={{ zIndex: 100 }}
    >
      <Menubar model={items} />
    </div>
  );
};

export default Header;
