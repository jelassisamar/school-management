import Header from "../components/header/Header";
import TableClasseElevesAbsences from "../components/tables/TableClasseElevesAbsences";

export default function Absences() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium">Liste des Absences</h1>
        </div>

        {/* Affichage des tableaux par classe */}
        <TableClasseElevesAbsences />
      </main>
    </div>
  );
}
