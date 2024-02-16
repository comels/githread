import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <Alert className="mt-8 flex items-center py-4" variant="ghost">
      <AlertTriangle />
      <AlertTitle className="ml-8 text-lg">Post not found.</AlertTitle>
    </Alert>
  );
};

export default NotFound;
