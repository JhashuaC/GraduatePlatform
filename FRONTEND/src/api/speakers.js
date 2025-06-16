// src/api/graduates.js
export async function getSpeakers() {
    try {
      const respuesta = await fetch('http://localhost:3000/api/graduates');
      if (!respuesta.ok) throw new Error('Error al traer oradores');
      const datos = await respuesta.json();
      return datos;
    } catch (error) {
      console.error('Error:', error);
      return []; // Devuelve vacío si falla
    }
  }

  
  export async function addSpeaker(speaker) {
    try {
      const response = await fetch("http://localhost:3000/api/speakers", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(speaker)
      });
  
      if (!response.ok) throw new Error("Error al agregar orador");
      const nuevo = await response.json();
      return nuevo;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  
export async function updateSpeaker(id, updatedData) {
  try {
    const response = await fetch(`http://localhost:3000/api/speakers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) throw new Error("Error al actualizar orador");
    const actualizado = await response.json();
    return actualizado;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Eliminar un graduado
export async function deleteSpeaker(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/speakers/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Error al eliminar orador");
    return true; // Confirmación de borrado
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}