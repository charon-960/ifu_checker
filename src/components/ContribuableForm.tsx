import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
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
} from "@radix-ui/react-alert-dialog";

export default function ContribuableForm() {
  const [ifu, setIfu] = useState("");
  const { data, loading, error, fetchContribuable } = useContribuable();
  const { sendUpdate, updateLoading, updateError, success } =
    useUpdateContribuable();

  const handleSearch = () => {
    if (ifu.trim()) {
      fetchContribuable(ifu);
    }
  };

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
          {data && (
            <>
              <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">IFU</th>
                    <th className="border px-4 py-2 text-left">Nom</th>
                    <th className="border px-4 py-2 text-left">Adresse</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">{data.ifu}</td>
                    <td className="border px-4 py-2">{data.nom}</td>
                    <td className="border px-4 py-2">{data.prenom}</td>
                    <td className="border px-4 py-2">{data.statutCnf}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end mt-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>Mettre à jour</Button>
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
