import type { Metadata } from "next";
import { Chessboard } from "@/components/chessboard/chessboard";

export const metadata: Metadata = {
  title: "Chessboard",
  description: "Interactive N×N chessboard pattern with basic styling.",
};

export default function ChessboardPage() {
  return <Chessboard />;
}
