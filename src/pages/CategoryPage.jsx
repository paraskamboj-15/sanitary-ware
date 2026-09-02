import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  getCategories,
  getCategory,
  getProductsByCategory,
  plural,
} from "../lib/data";
import Reveal from "../components/Reveal";
import ProductCard from "../components/ProductCard";

const sortOptions = [
  { value: "featured", label: "Sort — Featured" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "name", label: "Name, A to Z" },
];

function NotFound() {
  return (
    <div className="container-x flex min-h-[50vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">Collections</p>
      <h1 className="mt-4 font-display text-4xl">That collection doesn't exist.</h1>
      <Link to="/" className="btn-solid mt-8">Back to home</Link>
    </div>
  );
}

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const category = getCategory(categorySlug);

  const [series, setSeries] = useState("all");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    setSeries("all");
    setSort("featured");
  }, [categorySlug]);

  const all = useMemo(
    () => (category ? getProductsByCategory(category.slug) : []),
    [category]
  );

  const seriesList = useMemo(
    () => [...new Set(all.map((p) => p.series))],
    [all]
  );

  const visible = useMemo(() => {
    const filtered =
      series === "all" ? [...all] : all.filter((p) => p.series === series);
    switch (sort) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [all, series, sort]);

  if (!category) return <NotFound />;

  const others = getCategories().filter((c) => c.slug !== category.slug);

  return (
    <div className="container-x pb-24 pt-10 md:pt-14">
      {/* Breadcrumb */}
      <nav className="eyebrow flex items-center gap-2" aria-label="Breadcrumb">
        <Link to="/" className="transition-colors hover:text-ink">Home</Link>
        <span className="text-line">/</span>
        <span className="text-ink">{category.name}</span>
      </nav>

      {/* Header */}
      <Reveal className="mt-7">
        <div className="grid items-end gap-6 border-b border-line pb-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1 className="font-display text-[40px] leading-none tracking-[-0.01em] md:text-[56px]">
              {category.name}
            </h1>
            <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-smoke">
              {category.description}
            </p>
          </div>
          <p className="eyebrow md:col-span-4 md:text-right">
            {plural(visible.length, "piece")}
            {series !== "all" && ` — ${series}`}
          </p>
        </div>
      </Reveal>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-5">
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setSeries("all")}
            className={`chip ${series === "all" ? "chip-active" : ""}`}
          >
            All
          </button>
          {seriesList.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSeries(s)}
              className={`chip ${series === s ? "chip-active" : ""}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="cursor-pointer appearance-none border border-line bg-transparent py-2 pl-4 pr-10 text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink focus:outline-none"
            aria-label="Sort products"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            strokeWidth={1.75}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-smoke"
          />
        </div>
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 3) * 70}>
              <ProductCard product={product} eager={i < 3} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-start py-20">
          <p className="text-[15px] text-smoke">Nothing in this series yet under {category.name}.</p>
          <button type="button" onClick={() => setSeries("all")} className="btn-line mt-6">
            Show everything
          </button>
        </div>
      )}

      {/* Other collections */}
      <div className="mt-20 border-t border-line pt-8">
        <p className="eyebrow">Other collections</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {others.map((c) => (
            <Link key={c.slug} to={`/category/${c.slug}`} className="chip">
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
