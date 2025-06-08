import Header from "../components/header/Header";
import TableClasseElevesResultats from "../components/tables/TableClasseElevesResultats";

export default function Resultats() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium">Liste des Resultats</h1>
        </div>

        {/* Affichage des tableaux par classe */}
        <TableClasseElevesResultats />
      </main>
    </div>
  );
}
