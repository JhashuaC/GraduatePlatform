// src/components/CourseCard.jsx
export default function CourseCard({ name, description, date, time, modality, onRegister }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-semibold text-blue-700 mb-2">{name}</h3>
        <p className="text-gray-700 mb-3">{description}</p>
        <div className="text-sm text-gray-500 space-y-1 mb-3">
          <p><strong>Fecha:</strong> {date}</p>
          <p><strong>Hora:</strong> {time}</p>
          <p><strong>Modalidad:</strong> {modality}</p>
        </div>
      </div>
      <button
        onClick={onRegister}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Inscribirse
      </button>
    </div>
  );
}
