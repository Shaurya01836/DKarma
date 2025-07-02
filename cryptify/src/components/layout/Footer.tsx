export function Footer() {
  return (
    <footer className="w-full bg-[var(--color-surface)] border-t border-[var(--color-border)] text-[var(--color-muted)]">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Column 1: Brand */}
        <div>
          <a href="#" className="flex items-center gap-2 text-white text-lg font-semibold">
            <img
              src="https://assets.aceternity.com/logo-dark.png"
              alt="logo"
              width={30}
              height={30}
            />
            D Karma
          </a>
          <p className="mt-3 text-[var(--color-muted)] leading-relaxed max-w-xs">
            Empowering global freelancing with secure contracts and verified identities.
          </p>
        </div>

        {/* Column 2: Product */}
        <div>
          <h3 className="text-white font-medium mb-2">Product</h3>
          <ul className="space-y-1">
            <li><a href="#features" className="hover:text-white transition">Features</a></li>
            <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
            <li><a href="#use-cases" className="hover:text-white transition">Use Cases</a></li>
            <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h3 className="text-white font-medium mb-2">Company</h3>
          <ul className="space-y-1">
            <li><a href="#about" className="hover:text-white transition">About Us</a></li>
            <li><a href="#blog" className="hover:text-white transition">Blog</a></li>
            <li><a href="#careers" className="hover:text-white transition">Careers</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Column 4: Social + Newsletter */}
        <div>
          <h3 className="text-white font-medium mb-2">Stay Updated</h3>
          <p className="text-sm mb-3">Subscribe for product updates and industry news.</p>
          <form className="flex items-center bg-[var(--color-background)] rounded-md overflow-hidden border border-[var(--color-border)]">
            <input
              type="email"
              placeholder="you@example.com"
              className="px-3 py-2 w-full bg-transparent text-sm text-[var(--color-foreground)] focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-[var(--color-border)] py-6 text-center text-xs text-[var(--color-muted)]">
        © {new Date().getFullYear()} D Karma. All rights reserved.
      </div>
    </footer>
  );
}
