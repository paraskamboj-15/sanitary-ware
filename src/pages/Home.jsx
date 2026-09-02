import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getCategories, getCategoryCount, getFeatured, plural } from "../lib/data";
import Reveal from "../components/Reveal";
import ProductCard from "../components/ProductCard";

/* Layout spans for the asymmetric collections grid */
const tileLayout = [
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-16",
  "lg:col-span-5",
  "lg:col-span-7 lg:mt-10",
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-16",
];

function CategoryTile({ category, index }) {
  const count = getCategoryCount(category.slug);
  return (
    <Link to={`/category/${category.slug}`} className="group block">
      <div className="overflow-hidden border border-line">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">
            0{index + 1} · {plural(count, "piece")}
          </p>
          <h3 className="mt-1.5 font-display text-[24px] leading-tight">{category.name}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-smoke">{category.blurb}</p>
        </div>
        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-line transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-ivory">
          <ArrowUpRight size={15} strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  const categories = getCategories();
  const featured = getFeatured(4);

  return (
    <>
      {/* ——— Hero ——— */}
      <section className="container-x pt-12 md:pt-20">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:pb-10">
            <Reveal>
              <p className="eyebrow">Sanitary ware — est. 2011, Bengaluru</p>
              <h1 className="mt-5 font-display text-[40px] leading-[1.05] tracking-[-0.01em] sm:text-[52px] lg:text-[60px]">
                Objects for the daily <em className="font-light italic">ritual</em> of water.
              </h1>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-smoke">
                S.Ware designs and manufactures premium sanitary ware in India —
                ceramic, brass and stone, composed for the rooms you use first and
                last every day.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-7">
                <Link to="/#collections" className="btn-solid">
                  Explore the collections
                  <ArrowRight size={14} strokeWidth={1.75} />
                </Link>
                <Link to="/#featured" className="btn-line">
                  Featured pieces
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <div className="overflow-hidden border border-line">
                <img
                  src="/images/hero.jpg"
                  alt="Cala countertop basin on a travertine plinth in a warm, quiet bathroom"
                  className="aspect-[16/11] w-full object-cover"
                  fetchPriority="high"
                />
              </div>
              <p className="mt-3 flex items-baseline justify-between text-[11px] uppercase tracking-[0.18em] text-smoke">
                <span>Cala countertop basin · matte vitreous china</span>
                <span>SW-CA-1101</span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* Fact strip */}
        <Reveal delay={60}>
          <div className="mt-14 grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:mt-20">
            {[
              "Ceramic fired at 1,220 °C",
              "Solid CW617N brass bodies",
              "Written warranties up to 12 years",
            ].map((fact, i) => (
              <p
                key={fact}
                className="flex items-center justify-center px-6 py-5 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-smoke"
              >
                <span className="mr-3 text-ink/40">0{i + 1}</span> {fact}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ——— Collections ——— */}
      <section id="collections" className="container-x scroll-mt-28 py-20 md:py-28">
        <Reveal>
          <div className="grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow">01 — The collections</p>
              <h2 className="mt-4 font-display text-[32px] leading-tight md:text-[40px]">
                Six lines, one language.
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-relaxed text-smoke md:col-span-4 md:col-start-9">
              Every category shares the same materials and the same warranty —
              so a basin bought in 2016 still matches a mixer bought today.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-14 md:mt-16 lg:grid-cols-12">
          {categories.map((category, i) => (
            <Reveal key={category.slug} delay={(i % 2) * 90} className={tileLayout[i]}>
              <CategoryTile category={category} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— Featured ——— */}
      <section id="featured" className="scroll-mt-24 border-y border-line bg-parchment">
        <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-40">
              <Reveal>
                <p className="eyebrow">02 — Featured</p>
                <h2 className="mt-4 font-display text-[32px] leading-tight md:text-[40px]">
                  A short list, on repeat.
                </h2>
                <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-smoke">
                  Four pieces our studio returns to again and again — the ones we
                  specify first, in projects of our own.
                </p>
                <Link to="/#collections" className="btn-line mt-8">
                  Browse the collections
                  <ArrowRight size={13} strokeWidth={1.75} />
                </Link>
              </Reveal>
            </div>
          </div>

          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:col-span-8">
            {featured.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 2) * 90} className={i % 2 === 1 ? "sm:mt-10" : ""}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Studio statement ——— */}
      <section id="studio" className="container-x scroll-mt-28 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">03 — The studio</p>
              <h2 className="mt-4 font-display text-[32px] leading-[1.15] md:text-[40px]">
                Good fixtures are felt, <em className="font-light italic">not noticed.</em>
              </h2>
              <div className="mt-6 max-w-lg space-y-5 text-[15px] leading-relaxed text-smoke">
                <p>
                  S.Ware began in 2011 in a rented shed outside Bengaluru, with one
                  second-hand kiln and a simple conviction: the most-used objects in
                  a home deserve the most thought. We still design everything
                  in-house, and we still refuse a brief that starts with a trend.
                </p>
                <p>
                  A tap is lifted thousands of times a year. A basin is cleaned
                  ten thousand times in its life. Our work is to make those
                  repetitions feel the same in year twelve as they did on the first
                  morning — nothing more, and nothing less.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <div className="overflow-hidden border border-line">
                <img
                  src="/images/studio.jpg"
                  alt="A pedestal basin in quiet window light at the S.Ware studio"
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-smoke">
                The glaze room, Bengaluru studio
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={60}>
          <div className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
            {[
              {
                title: "Ceramic",
                note: "Vitreous china and fireclay, fired at 1,220 °C and glazed inside and out. Warrantied against crazing for ten years.",
              },
              {
                title: "Brass",
                note: "Cast CW617N bodies with ceramic disc cartridges rated to 500,000 cycles. PVD-bonded finishes that will not peel.",
              },
              {
                title: "Stone",
                note: "Honed travertine and quartz composite, sealed at the factory and simple to reseal at home, year after year.",
              },
            ].map((m) => (
              <div key={m.title}>
                <p className="eyebrow text-ink">{m.title}</p>
                <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-smoke">{m.note}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
