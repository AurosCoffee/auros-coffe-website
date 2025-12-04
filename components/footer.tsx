import Image from "next/image"

export default function Footer({ t }: { t: any }) {
  return (
    <footer className="bg-foreground text-primary-foreground py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/images/03.png"
              alt="AUROS Coffee"
              width={80}
              height={50}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-sm text-primary-foreground/70 leading-relaxed">{t.footer.tagline}</p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-syne-mono text-xs uppercase tracking-widest font-semibold">{t.footer.shop}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a href="#shop" className="hover:text-primary-foreground transition">
                  {t.footer.allCoffee}
                </a>
              </li>
              <li>
                <a href="#subscribe" className="hover:text-primary-foreground transition">
                  {t.footer.subscriptions}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  {t.footer.gifts}
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h4 className="font-syne-mono text-xs uppercase tracking-widest font-semibold">{t.footer.about}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  {t.footer.ourStory}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  {t.footer.sustainability}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  {t.footer.farms}
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-syne-mono text-xs uppercase tracking-widest font-semibold">{t.footer.support}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  {t.footer.faq}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary-foreground transition">
                  {t.footer.contact}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  {t.footer.returns}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <p className="text-sm text-primary-foreground/70 text-center font-space-mono">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
