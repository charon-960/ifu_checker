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
        <div className="h-full w-full bg-gray-100">
        <div className="w-full bg-primary text-primary-foreground py-6 flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            Recherche de Contribuable
          </h1>
        </div>
      
        <div className="max-w-4xl mx-auto py-10 px-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                {/* Ajout d'une icône ou illustration */}
                <div className="text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v12a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
      
                {/* Champ de recherche */}
                <div className="flex items-center w-full space-x-4">
                  <div className="relative w-full">
                    <Input
                      placeholder="Entrez un numéro IFU..."
                      value={ifu}
                      onChange={(e) => setIfu(e.target.value)}
                      className="pl-10"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6a4 4 0 100 8 4 4 0 000-8zM21 21l-6-6"
                        />
                      </svg>
                    </div>
                  </div>
                  <Button
                    onClick={handleSearch}
                    className="bg-primary text-white hover:bg-primary-dark shadow-md transition-transform transform hover:scale-105"
                  >
                    Rechercher
                  </Button>
                </div>
      
                {/* Message d'aide */}
                <p className="text-sm text-gray-500">
                  Entrez un numéro IFU valide pour rechercher un contribuable.
                </p>
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
              <form className="bg-white p-6 rounded-md shadow space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ifu" className="block text-sm font-medium mb-1 text-left">IFU</label>
                    <Input value={data.ifu} disabled />
                  </div>
                  <div>
                    <label htmlFor="raisonSociale" className="block text-sm font-medium mb-1 text-left">Nom de l'entreprise</label>
                    <Input value={data.raisonSociale} disabled />
                  </div>
                  <div>
                    <label htmlFor="identiteGestionnaire" className="block text-sm font-medium mb-1 text-left">Nom du représentant</label>
                    <Input value={data.identiteGestionnaire ?? "-"} disabled />
                  </div>
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium mb-1 text-left">Prénom du repésentant</label>
                    <Input value={data.prenom ?? "-"} disabled />
                  </div>
                  <div>
                    <label htmlFor="ville" className="block text-sm font-medium mb-1 text-left">Adresse Entrprise</label>
                    <Input value={data.ville ?? "-"} disabled />
                  </div>
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium mb-1 text-left">Téléphone</label>
                    <Input value={data.telephone} disabled />
                  </div>
                  <div>
                    <label htmlFor="statutCnf" className="block text-sm font-medium mb-1 text-left">Statut</label>
                    <Input value={data.statutCnf} disabled />
                  </div>
                </div>
              </form>



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
  );
}
