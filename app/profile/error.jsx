"use client"; // Error components must be Client Components

import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const Error = () => {
  return (
    <Alert className="mt-8 flex items-center py-4" variant="ghost">
      <AlertTriangle />
      <AlertTitle className="ml-8 text-lg">
        Vous devez être connecté pour accéder à cette page.
      </AlertTitle>
    </Alert>
  );
};

export default Error;
