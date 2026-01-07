export default function Footer() {
  return (
    <footer className="bg-industrial-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">
            CATALOG<span className="font-light">PRIME</span>
          </h3>
          <p className="text-industrial-400 text-sm">
            Global packaging solutions for every industry. Define your brand
            with our premium structural design.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-industrial-400">
            <li>
              <a href="#" className="hover:text-white">
                Bottles
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Jars
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Closures
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Decoration
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-industrial-400">
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Sustainability
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Industrial Inquiry</h4>
          <p className="text-sm text-industrial-400 mb-4">
            Need a custom mold or bulk quote? Our engineers are ready.
          </p>
          <a
            href="/inquiry"
            className="inline-block bg-action hover:bg-action-hover text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Start Project
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-industrial-800 text-center text-xs text-industrial-500">
        © 2026 CatalogPrime Inc. All rights reserved.
      </div>
    </footer>
  );
}
