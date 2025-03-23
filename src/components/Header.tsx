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
      className="fixed top-0 left-0 right-0 shadow-2"
      style={{ zIndex: 100 }}
    >
      <Menubar model={items} />
    </div>
  );
};

export default Header;
