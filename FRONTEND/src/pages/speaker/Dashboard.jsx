import { useAuth } from "../../context/AuthContext";
import { useState } from "react";


export default function Dashboard() {

    return (
     <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Panel del Falicitador</h2>
            <p>Aquí podrás gestionar tus talleres y asistencia como ponente.</p>
         
        </div>
    );
}