import { Loader } from "@/components/ui/loader";
import React from "react";

export default function loading() {
  return (
    <div className="mt-10 flex gap-10 justify-center">
      <Loader />
      <p>Chargement...</p>
    </div>
  );
}
