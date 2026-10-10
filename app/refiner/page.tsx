import type { Metadata } from "next";
import { Refiner } from "@/components/Refiner";

export const metadata: Metadata = { title: "Refiner" };

export default function RefinerPage() {
  return <Refiner />;
}
