import Image from 'next/image'

export function Footer() {
  return (
    <footer className="w-full bg-black border-t border-primary/20 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Column 1: Brand */}
        <div>
          <a href="#" className="flex items-center gap-2 text-white text-lg font-semibold">
            <Image
              src="https://assets.aceternity.com/logo-dark.png"
              alt="logo"
              width={30}
              height={30}
            />
            D Karma
          </a>
          <p className="mt-3 text-slate-400 leading-relaxed max-w-xs">
            Empowering global freelancing with secure contracts and verified identities.
          </p>
        </div>

        {/* Column 2: Product */}
        <div>
          <h3 className="text-foreground font-medium mb-2">Product</h3>
          <ul className="space-y-1">
            <li><a href="#features" className="hover:text-purple-400 transition">Features</a></li>
            <li><a href="#pricing" className="hover:text-purple-400 transition">Pricing</a></li>
            <li><a href="#use-cases" className="hover:text-purple-400 transition">Use Cases</a></li>
            <li><a href="#faq" className="hover:text-purple-400 transition">FAQ</a></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h3 className=" font-medium mb-2">Company</h3>
          <ul className="space-y-1">
            <li><a href="#about" className="hover:text-purple-400 transition">About Us</a></li>
            <li><a href="#blog" className="hover:text-purple-400 transition">Blog</a></li>
            <li><a href="#careers" className="hover:text-purple-400 transition">Careers</a></li>
            <li><a href="#contact" className="hover:text-purple-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Column 4: Social + Newsletter */}
        <div>
          <h3 className=" font-medium mb-2">Stay Updated</h3>
          <p className="text-sm mb-3">Subscribe for product updates and industry news.</p>
          <form className="flex items-center bg-black/80 backdrop-blur-sm rounded-md overflow-hidden border border-primary/20">
            <input
              type="email"
              placeholder="you@example.com"
              className="px-3 py-2 w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-primary to-purple-500 text-white text-sm font-medium hover:from-primary-hover hover:to-purple-400 transition shadow-lg hover:shadow-purple-500/30"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-primary/20 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} D Karma. All rights reserved.
      </div>
    </footer>
  );
}
