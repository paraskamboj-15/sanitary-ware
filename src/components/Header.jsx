import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { getCategories, getCategoryCount, plural } from "../lib/data";

const anchorLinks = [
  { label: "Featured", to: "/#featured" },
  { label: "Studio", to: "/#studio" },
  { label: "Contact", to: "/#contact" },
];

function Brandmark() {
  return (
    <Link to="/" className="font-display text-[22px] leading-none tracking-tight" aria-label="S.Ware — home">
      S<span className="text-clay">.</span>Ware
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const categories = getCategories();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">

      <div className="border-b border-line bg-ivory">
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          <Brandmark />

          {/* Desktop navigation */}
          <nav className="relative hidden h-full items-center gap-9 lg:flex" aria-label="Primary">
            <div className="group flex h-full items-center">
              <button
                type="button"
                className="flex h-full items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-ink/80 transition-colors hover:text-ink"
              >
                Collections
                <ChevronDown size={13} strokeWidth={1.75} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <div className="invisible pointer-events-none absolute right-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                <div className="w-[720px] border border-line bg-ivory p-5 shadow-[0_36px_70px_-40px_rgba(33,30,25,0.35)]">
                  <div className="grid grid-cols-3 gap-x-5 gap-y-6">
                    {categories.map((cat) => (
                      <Link key={cat.slug} to={`/category/${cat.slug}`} className="group/item">
                        <div className="overflow-hidden border border-line">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            loading="lazy"
                            className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover/item:scale-[1.05]"
                          />
                        </div>
                        <div className="mt-2.5 flex items-baseline justify-between">
                          <span className="text-[13px] font-medium">{cat.name}</span>
                          <span className="text-[11px] text-smoke">{plural(getCategoryCount(cat.slug), "piece")}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <p className="mt-5 border-t border-line pt-4 text-[12px] leading-relaxed text-smoke">
                    Six lines, one language — ceramic, brass and stone, made in India and covered by written warranties.
                  </p>
                </div>
              </div>
            </div>

            {anchorLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink/80 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}

            <Link to="/#contact" className="btn-outline px-5 py-2.5">
              Enquire
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-line bg-ivory lg:hidden">
            <nav className="container-x max-h-[calc(100dvh-170px)] overflow-y-auto py-8" aria-label="Mobile">
              <p className="eyebrow mb-5">Collections</p>
              <ul className="divide-y divide-line border-y border-line">
                {categories.map((cat, i) => (
                  <li key={cat.slug}>
                    <Link
                      to={`/category/${cat.slug}`}
                      className="flex items-baseline justify-between py-3.5"
                      onClick={() => setOpen(false)}
                    >
                      <span className="font-display text-[26px] leading-tight">
                        <span className="mr-4 align-middle text-[11px] tracking-[0.2em] text-smoke">
                          0{i + 1}
                        </span>
                        {cat.name}
                      </span>
                      <ArrowUpRight size={18} strokeWidth={1.5} className="text-smoke" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {anchorLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink/80"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <p className="mt-8 text-[13px] leading-relaxed text-smoke">
                studio@sware.in
                <br />
                +91 80 4719 2400
              </p>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
