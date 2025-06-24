import { useAuth } from "../../context/AuthContext";
import { useState } from "react";


export default function MyWorkshops() {

    
    return (
       <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Mis Talleres</h2>
            <p>Aquí podrás gestionar tus talleres, seleccionar el taller y ver la lista de estudiantes, para asi poder ponerles el curso completado y enviarles un titulo al correo.</p>
            {/* Aquí puedes agregar más lógica para mostrar y gestionar los talleres */}
        </div>
    );
}