import {
  CurrencyDollarIcon,
  BoltIcon,
  ShoppingCartIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

export default function About() {
  const features = [
    {
      name: "Real-time Price Comparison",
      description:
        "Instantly compare prices across major grocery stores to find the best deal on every product.",
      icon: CurrencyDollarIcon,
    },
    {
      name: "Trending Deals",
      description:
        "Stay updated with the latest discounts, weekly flyers, and limited-time supermarket offers.",
      icon: BoltIcon,
    },
    {
      name: "Smarter Shopping",
      description:
        "A clean, fast, and intuitive interface designed to help everyday shoppers save money effortlessly.",
      icon: ShoppingCartIcon,
    },
  ];

  const contacts = [
    {
      label: "Email",
      value: "support@smartgrocer.com",
      icon: EnvelopeIcon,
    },
    {
      label: "Phone",
      value: "+1 (000) 000-0000",
      icon: PhoneIcon,
    },
    {
      label: "Location",
      value: "Ontario, Canada",
      icon: MapPinIcon,
    },
  ];

  return (
    <div className="relative isolate overflow-hidden bg-gray-50 py-24 sm:py-32">
      {/* Background blobs */}
      <div
        className="absolute -top-32 left-1/2 -z-10 h-[40rem] w-[70rem] -translate-x-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(37,99,235,0.15), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Page Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            About SmartGrocer
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-8">
            SmartGrocer is a modern grocery price comparison platform built to
            help Canadians shop smarter. By analyzing real-time product data
            across multiple supermarkets, we help you save money — every day.
          </p>
        </div>

        {/* Features / What We Offer */}
        <div className="mx-auto mt-20 max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 text-center"
            >
              {/* Icon in circular background */}
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                <item.icon className="w-8 h-8 text-blue-600" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">
            Contact Us
          </h2>
          <p className="mt-4 text-gray-600 text-center">
            Have questions, feedback, or collaboration ideas? We'd love to hear
            from you.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contacts.map((c) => (
              <div
                key={c.label}
                className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 text-center"
              >
                <c.icon className="w-8 h-8 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {c.label}
                </h3>
                <p className="text-gray-600">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
