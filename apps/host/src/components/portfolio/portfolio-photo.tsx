import Image from "next/image";

type PortfolioPhotoProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function PortfolioPhoto({
  src,
  alt,
  className = "",
  priority = false,
}: PortfolioPhotoProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/20 blur-2xl" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-emerald-500/10">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 220px, (max-width: 1024px) 280px, 320px"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
