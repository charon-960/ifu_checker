import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress"; // Import du composant Progress
import { useContribuable } from "@/hooks/useContribuable";
import { useUpdateContribuable } from "@/hooks/useUpdateContribuable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";


export default function ContribuableForm() {
  const [ifu, setIfu] = useState("");
  const { data, loading, error, fetchContribuable } = useContribuable();
  const { sendUpdate, updateLoading, updateError, success } =
    useUpdateContribuable();

  const handleSearch = () => {
    if (ifu.trim()) {
      fetchContribuable(ifu);
      console.log("Recherche effectuée pour l'IFU :", ifu);
    }
  };

  useEffect(() => {
    if (data) {
      console.log("Données récupérées :", data);
    }
  }, [data]);

  // Afficher une notification d'erreur lors de la recherche
  useEffect(() => {
    if (error) {
      toast.error(`Erreur lors de la recherche : ${error}`);
    }
  }, [error]);

  // Afficher une notification d'erreur lors de la mise à jour
  useEffect(() => {
    if (updateError) {
      toast.error(`Erreur lors de la mise à jour : ${updateError}`);
    }
  }, [updateError]);

  // Afficher une notification de succès lors de la mise à jour
  useEffect(() => {
    if (success) {
      toast.success("Contribuable mis à jour avec succès !");
    }
  }, [success]);

  const handleUpdate = () => {
    if (data) {
      sendUpdate(data);
    }
  };

  return (
    <>
      <div className="h-full w-full bg-gray-100">
        <div className="w-full bg-primary text-primary-foreground py-6 flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            Recherche de Contribuable
          </h1>
        </div>

        <div className="max-w-4xl mx-auto py-10 px-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="Entrez un numéro IFU..."
                  value={ifu}
                  onChange={(e) => setIfu(e.target.value)}
                />
                <Button onClick={handleSearch}>Rechercher</Button>
              </div>
            
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Barre de chargement indéterminée */}
        {(loading || updateLoading) && (
          <div className="my-4">
            <Progress className="h-2 animate-pulse" />
          </div>
        )}

        {(loading || updateLoading) && (
          <div className="my-4">
            <Progress className="h-2 animate-pulse" />
          </div>
        )}

        {(loading || updateLoading) && (
          <div className="my-4">
            <Progress className="h-2 animate-pulse" />
          </div>
        )}


          {data && (
            <>
              <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="border px-4 py-2 text-left">IFU</th>
                    <th className="border px-4 py-2 text-left">Nom</th>
                    <th className="border px-4 py-2 text-left">Adresse</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="hover:bg-gray-100 transition-colors">
                    <td className="border px-4 py-2">{data.ifu}</td>
                    <td className="border px-4 py-2">{data.nom}</td>
                    <td className="border px-4 py-2">{data.prenom}</td>
                    <td className="border px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          data.statutCnf === "Actif"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                        {data.statutCnf}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>


              <div className="flex justify-end mt-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button disabled={updateLoading}>
                      {updateLoading ? (
                        <div className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                         >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                          </svg>
                          Mise à jour...
                        </div>
                      ) : (
                        "Mettre à jour"
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Confirmer la mise à jour
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir mettre à jour les informations
                        de ce contribuable ?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Non</AlertDialogCancel>
                      <AlertDialogAction onClick={handleUpdate}>
                        Oui, mettre à jour
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
