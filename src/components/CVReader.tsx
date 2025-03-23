// src/components/Curriculum.tsx
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { Tag } from "primereact/tag";
import React from "react";
import cv from "../db/curriculum.json";
import logo from "../logo.png";

const CVReader: React.FC = () => {
  const data: any = cv;

  return (
    <div className="p-m-4 p-grid p-justify-center">
      <div className="body-cv">
        <div className="animated-panel mb-3">
          <Card title={data.name} subTitle={data.title} className="p-3">
            <img src={logo} className="img" />
            <p>
              <i className="pi pi-envelope p-mr-2" /> {data.contacts.email}
            </p>
            <p>
              <i className="pi pi-phone p-mr-2" /> {data.contacts.phone}
            </p>
            <p>
              <i className="pi pi-map-marker p-mr-2" /> {data.contacts.location}
            </p>
          </Card>
        </div>

        <Panel header="Profilo" className="mb-3">
          <p>{data.profile}</p>
        </Panel>

        <Panel header="Esperienza" className="mb-3">
          {data.experience.map((exp: any, idx: number) => (
            <Card
              key={idx}
              title={exp.role}
              subTitle={`${exp.company} - ${exp.period}`}
              className="p-mb-3"
            >
              <p>{exp.description}</p>
            </Card>
          ))}
        </Panel>

        <Panel header="Formazione" className="mb-3">
          {data.education.map((edu: any, idx: number) => (
            <Card
              key={idx}
              title={edu.institution}
              subTitle={`${edu.period}`}
              className="p-mb-3"
            >
              <p>{edu.degree}</p>
            </Card>
          ))}
        </Panel>

        <Panel header="Competenze">
          <div className="grid">
            {data.skills.map((skill: any, idx: number) => (
              <div className="col p-3">
                <Tag key={idx} value={skill} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default CVReader;
