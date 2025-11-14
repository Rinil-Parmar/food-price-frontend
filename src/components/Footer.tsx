export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-semibold mb-3">SmartGrocer</h3>
          <p className="text-sm text-gray-400">
            Compare grocery prices across top stores and save money every week.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-white" href="/">Home</a></li>
            <li><a className="hover:text-white" href="/deals">Deals</a></li>
            <li><a className="hover:text-white" href="/categories">Categories</a></li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Features</h3>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-white" href="/compare">Price Comparison</a></li>
            <li><a className="hover:text-white" href="/recommend">Smart Recommendations</a></li>
            <li><a className="hover:text-white" href="/analytics">Analytics</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-400">support@smartgrocer.com</p>
          <p className="text-sm text-gray-400 mt-1">+1 (888) 123-4567</p>
        </div>

      </div>

      <p className="text-center text-gray-600 text-xs mt-10">
        © 2025 SmartGrocer — Grocery Price Comparison Platform
      </p>
    </footer>
  );
}
