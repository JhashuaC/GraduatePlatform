// src/api/graduates.js
export async function getGraduates() {
    try {
      const respuesta = await fetch('http://localhost:3000/api/graduates');
      if (!respuesta.ok) throw new Error('Error al traer graduados');
      const datos = await respuesta.json();
      return datos;
    } catch (error) {
      console.error('Error:', error);
      return []; // Devuelve vacío si falla
    }
  }

  export async function addGraduate(graduate) {
    try {
      const response = await fetch("http://localhost:3000/api/graduates", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(graduate)
      });
  
      if (!response.ok) throw new Error("Error al agregar graduado");
      const nuevo = await response.json();
      return nuevo;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  
  export async function updateGraduate(id, updatedData) {
  try {
    const response = await fetch(`http://localhost:3000/api/graduates/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) throw new Error("Error al actualizar graduado");
    const actualizado = await response.json();
    return actualizado;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Eliminar un graduado
export async function deleteGraduate(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/graduates/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Error al eliminar graduado");
    return true; // Confirmación de borrado
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
