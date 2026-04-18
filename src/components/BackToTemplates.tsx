import Link from "next/link";

type Props = {
  variant?: "dark" | "light";
  offset?: "default" | "belowTicker";
};

export function BackToTemplates({ variant = "dark", offset = "default" }: Props) {
  const styles =
    variant === "light"
      ? "bg-black/80 text-white hover:bg-black"
      : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md";
  const topClass = offset === "belowTicker" ? "top-24" : "top-4";
  return (
    <Link
      href="/"
      className={`fixed left-4 z-[100] inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition ${topClass} ${styles}`}
    >
      <span>←</span> Templates
    </Link>
  );
}
