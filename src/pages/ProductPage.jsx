import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { formatPrice, getCategory, getProduct, getRelated } from "../lib/data";
import Reveal from "../components/Reveal";
import ProductCard from "../components/ProductCard";

const specRows = [
  { key: "material", label: "Material" },
  { key: "finish", label: "Finish" },
  { key: "dimensions", label: "Dimensions" },
  { key: "installation", label: "Installation" },
  { key: "warranty", label: "Warranty" },
];

function NotFound() {
  return (
    <div className="container-x flex min-h-[50vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">Products</p>
      <h1 className="mt-4 font-display text-4xl">That piece doesn't exist.</h1>
      <Link to="/" className="btn-solid mt-8">Back to home</Link>
    </div>
  );
}

export default function ProductPage() {
  const { productSlug } = useParams();
  const product = getProduct(productSlug);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [productSlug]);

  if (!product) return <NotFound />;

  const category = getCategory(product.category);
  const related = getRelated(product, 4);
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const paragraphs = product.description.split("\n\n");
  const enquiry = `mailto:studio@sware.in?subject=${encodeURIComponent(
    `Enquiry — ${product.name} (${product.code})`
  )}`;

  return (
    <div className="container-x pb-24 pt-10 md:pt-14">
      {/* Breadcrumb */}
      <nav className="eyebrow flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
        <Link to="/" className="transition-colors hover:text-ink">Home</Link>
        <span className="text-line">/</span>
        <Link to={`/category/${category.slug}`} className="transition-colors hover:text-ink">
          {category.name}
        </Link>
        <span className="text-line">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="overflow-hidden border border-line bg-card">
              <img
                key={gallery[active]}
                src={gallery[active]}
                alt={`${product.name} — view ${active + 1}`}
                className="aspect-[4/5] w-full object-cover"
                fetchPriority="high"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 flex gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`overflow-hidden border transition-colors duration-200 ${
                      active === i ? "border-ink" : "border-line hover:border-ink/40"
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="aspect-square w-20 object-cover md:w-24"
                    />
                  </button>
                ))}
              </div>
            )}
          </Reveal>
        </div>

        {/* Details */}
        <div className="lg:col-span-5">
          <Reveal delay={90} className="lg:sticky lg:top-36">
            <p className="eyebrow">{product.series} series</p>
            <h1 className="mt-3 font-display text-[32px] leading-[1.1] tracking-[-0.01em] md:text-[40px]">
              {product.name}
            </h1>

            <div className="mt-5 flex items-baseline justify-between border-y border-line py-4">
              <p className="text-[22px]">{formatPrice(product.price)}</p>
              <p className="eyebrow">{product.code}</p>
            </div>
            <p className="mt-2 text-[12px] text-smoke">
              Inclusive of GST. Installation support in 12 cities.
            </p>

            <p className="mt-6 text-[14px] leading-relaxed text-smoke">{product.blurb}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href={enquiry} className="btn-solid">
                Enquire about this piece
              </a>
              <Link to="/#contact" className="btn-outline">
                Find a showroom
              </Link>
            </div>

            <div className="mt-8 space-y-3 text-[13px] text-smoke">
              <p className="flex items-center gap-3">
                <Truck size={15} strokeWidth={1.5} className="shrink-0 text-ink" />
                Ships across India in 7–10 working days, crated and insured.
              </p>
              <p className="flex items-center gap-3">
                <ShieldCheck size={15} strokeWidth={1.5} className="shrink-0 text-ink" />
                {product.warranty} written warranty, serviced by our own team.
              </p>
            </div>

            {/* Specifications */}
            <dl className="mt-10 border-t border-line">
              {specRows.map(({ key, label }) => (
                <div
                  key={key}
                  className="grid grid-cols-[120px_1fr] gap-4 border-b border-line py-3.5"
                >
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-smoke">
                    {label}
                  </dt>
                  <dd className="text-[14px] leading-relaxed">{product[key]}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Long-form detail */}
      <section className="mt-20 grid gap-12 border-t border-line pt-16 md:mt-28 lg:grid-cols-12">
        <div className="lg:col-span-6 lg:col-start-2">
          <Reveal>
            <p className="eyebrow">Details</p>
            <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-ink/85">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
        {gallery[1] && (
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={120}>
              <div className="overflow-hidden border border-line">
                <img
                  src={gallery[1]}
                  alt={`${product.name} in context`}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-smoke">
                {product.name}, in context
              </p>
            </Reveal>
          </div>
        )}
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20 border-t border-line pt-14 md:mt-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Related</p>
                <h2 className="mt-3 font-display text-[28px] leading-tight md:text-[34px]">
                  More from {category.name.toLowerCase()}
                </h2>
              </div>
              <Link to={`/category/${category.slug}`} className="btn-line">
                View all {category.name.toLowerCase()}
                <ArrowRight size={13} strokeWidth={1.75} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <ProductCard product={p} showBlurb={false} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
