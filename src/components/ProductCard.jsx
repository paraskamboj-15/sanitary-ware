import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "../lib/data";

export default function ProductCard({ product, showBlurb = true, eager = false }) {
  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative overflow-hidden border border-line bg-card transition-colors duration-300 group-hover:border-ink/30">
        <img
          src={product.image}
          alt={product.name}
          loading={eager ? "eager" : "lazy"}
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-line bg-ivory/95 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight size={14} strokeWidth={1.5} />
        </span>
      </div>

      <div className="pt-4">
        <p className="eyebrow">
          {product.series} · {product.code}
        </p>
        <div className="mt-2 flex items-baseline justify-between gap-4">
          <h3 className="text-[15px] font-medium leading-snug">{product.name}</h3>
          <p className="shrink-0 text-[15px]">{formatPrice(product.price)}</p>
        </div>
        {showBlurb && (
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-smoke">
            {product.blurb}
          </p>
        )}
      </div>
    </Link>
  );
}
