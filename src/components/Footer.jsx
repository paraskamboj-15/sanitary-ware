import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getCategories } from "../lib/data";

export default function Footer() {
  const categories = getCategories();

  return (
    <footer id="contact" className="scroll-mt-24 border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        {/* Brand */}
        <div className="md:col-span-5">
          <Link to="/" className="font-display text-[26px] tracking-tight">
            S<span className="text-clay">.</span>Ware
          </Link>
          <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-smoke">
            Premium sanitary ware designed and manufactured in India. Ceramic, brass
            and stone — made for decades of daily use, and guaranteed in writing.
          </p>
          <p className="eyebrow mt-8">Showrooms</p>
          <p className="mt-3 text-[14px] leading-relaxed">
            Karn Gate SCO 23, 1st Floor, Karnal 132001
            <br />
            Himalaya Marg, Sector 22, Chandigarh, 160000
            <br />
            Open Monday – Saturday, 10:00 – 19:00
          </p>
        </div>

        {/* Collections */}
        <div className="md:col-span-3">
          <p className="eyebrow">Collections</p>
          <ul className="mt-5 space-y-3">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/category/${cat.slug}`}
                  className="text-[14px] text-ink/80 transition-colors hover:text-ink"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="md:col-span-2">
          <p className="eyebrow">Studio</p>
          <ul className="mt-5 space-y-3">
            <li>
              <Link to="/#studio" className="text-[14px] text-ink/80 transition-colors hover:text-ink">
                About S.Ware
              </Link>
            </li>
            <li>
              <Link to="/#featured" className="text-[14px] text-ink/80 transition-colors hover:text-ink">
                Featured pieces
              </Link>
            </li>
            <li>
              <Link to="/#collections" className="text-[14px] text-ink/80 transition-colors hover:text-ink">
                The collections
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-2">
          <p className="eyebrow">Contact</p>
          <ul className="mt-5 space-y-3 text-[14px] text-ink/80">
            <li>
              <a href="mailto:paraskamboj1500@gmail.com" className="transition-colors hover:text-ink">
                paraskamboj1500@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+919350382320" className="transition-colors hover:text-ink">
                +91 9350382320
              </a>
            </li>
            <li>
              <a
                href="mailto:paraskamboj1500@gmail.com?subject=Trade%20enquiry"
                className="group inline-flex items-center gap-1.5 transition-colors hover:text-ink"
              >
                Trade enquiries
                <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-[12px] text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 S.Ware Studio Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
