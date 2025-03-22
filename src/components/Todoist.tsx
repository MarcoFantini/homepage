import React, { useEffect, useState } from "react";

const Todoist: React.FC = () => {
  const days = [
    {
      name: "Lunedì",
      tasks: [
        { id: "lun1", text: "08:00 - Lezione di Fisica" },
        { id: "lun2", text: "Lavoro da casa" },
        { id: "lun3", text: "Studio serale di Fisica" },
      ],
    },
    {
      name: "Martedì",
      tasks: [
        { id: "mar1", text: "08:00 - Lezione di Fisica" },
        { id: "mar2", text: "Lavoro da casa o in ufficio" },
        { id: "mar3", text: "Studio serale o post-ufficio fino alle 19:30/20" },
      ],
    },
    {
      name: "Mercoledì",
      tasks: [
        { id: "mer1", text: "08:00 - Lezione di Fisica" },
        { id: "mer2", text: "Lavoro da casa o in ufficio" },
        { id: "mer3", text: "Studio serale o post-ufficio fino alle 19:30/20" },
      ],
    },
    {
      name: "Giovedì",
      tasks: [
        { id: "gio1", text: "08:00 - Lezione di TLC" },
        { id: "gio2", text: "Lavoro da casa o in ufficio" },
        { id: "gio3", text: "Studio serale o post-ufficio fino alle 19:30/20" },
      ],
    },
    {
      name: "Venerdì",
      tasks: [
        { id: "ven1", text: "08:00 - Lezione di TLC" },
        { id: "ven2", text: "Lavoro da casa (giornata più leggera)" },
        { id: "ven3", text: "20:30/21:00 - Palestra serale" },
      ],
    },
    {
      name: "Sabato",
      tasks: [
        { id: "sab1", text: "Palestra mattina (flessibile)" },
        { id: "sab2", text: "Pomeriggio in biblioteca" },
        { id: "sab3", text: "Sera - Lavoro sulla tesi" },
      ],
    },
    {
      name: "Domenica",
      tasks: [
        { id: "dom1", text: "Palestra mattina (flessibile)" },
        { id: "dom2", text: "Pomeriggio - Recupero o ripasso leggero" },
        { id: "dom3", text: "Sera - Lavoro sulla tesi" },
      ],
    },
  ];

  const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const savedTasks: { [key: string]: boolean } = {};
    days.forEach((day) =>
      day.tasks.forEach((task) => {
        const saved = localStorage.getItem(task.id);
        if (saved) {
          savedTasks[task.id] = true;
        }
      })
    );
    setCheckedTasks(savedTasks);
  }, []);

  const handleCheckboxChange = (id: string) => {
    setCheckedTasks((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      if (updated[id]) {
        localStorage.setItem(id, "checked");
      } else {
        localStorage.removeItem(id);
      }
      return updated;
    });
  };

  return (
    <div style={styles.body}>
      <h1 style={styles.title}>Piano Settimanale fino a Luglio</h1>
      <div style={styles.week}>
        {days.map((day) => (
          <div key={day.name} style={styles.dayCard}>
            <h2 style={styles.dayTitle}>{day.name}</h2>
            <ul style={styles.list}>
              {day.tasks.map((task) => (
                <li key={task.id} style={styles.listItem}>
                  <input
                    type="checkbox"
                    id={task.id}
                    checked={!!checkedTasks[task.id]}
                    onChange={() => handleCheckboxChange(task.id)}
                    style={styles.checkbox}
                  />
                  {task.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={styles.note}>
        <p>
          <strong>Nota:</strong> mantieni almeno una sera libera ogni tanto per
          decomprimere e non saturarti.
        </p>
        <p>
          <strong>Obiettivo:</strong> chiudere l’università entro Luglio senza
          perdere equilibrio e concentrazione.
        </p>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    background: "#f4f4f8",
    margin: 0,
    padding: "20px",
    color: "#333",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "30px",
    color: "#2c3e50",
  },
  week: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  dayCard: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    transition: "0.3s ease",
  },
  dayTitle: {
    marginTop: 0,
    color: "#34495e",
  },
  list: {
    paddingLeft: 0,
    listStyle: "none",
  },
  listItem: {
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    marginRight: "10px",
  },
  note: {
    marginTop: "30px",
    padding: "15px",
    background: "#dff9fb",
    borderLeft: "5px solid #00a8ff",
    borderRadius: "8px",
  },
};

export default Todoist;
