import { useEffect, useState } from "react";
import { getWorkshops } from "../../api/courseService";

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getWorkshops();
      setWorkshops(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Talleres Disponibles</h2>
      <ul>
        {workshops.map((w) => (
          <li key={w.id_workshop} className="border p-2 my-2">
            <h3 className="font-semibold">{w.title}</h3>
            <p>{w.description}</p>
            <p><strong>Modalidad:</strong> {w.mode}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
