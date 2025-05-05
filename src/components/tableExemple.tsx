import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Contribuable } from "@/types/contribTypes";
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]

  interface TableDisplayProps {
    data: Contribuable | null;
  }
  
  export function TableDisplay({ data }: TableDisplayProps) {
    if (!data) 
      return <div>Aucune donnée à afficher</div>;


    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">IFU</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Prénoms</TableHead>
            <TableHead className="text-right">Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
              <TableCell className="font-medium">{data.ifu}</TableCell>
              <TableCell>{data.nom}</TableCell>
              <TableCell>{data.prenom}</TableCell>
              <TableCell className="text-right">{data.statutCnf}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    )
  }
  