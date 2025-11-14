import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="relative isolate overflow-hidden bg-gray-50 min-h-screen flex items-center justify-center px-6 py-24 sm:py-32">
      {/* Background blob */}
      <div
        className="absolute -top-32 left-1/2 -z-10 h-[40rem] w-[70rem] -translate-x-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(37,99,235,0.15), transparent 70%)",
        }}
      />

      <div className="text-center max-w-xl">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-5xl sm:text-6xl font-bold tracking-tight text-gray-900">
          Page not found
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition"
          >
            Go back home
          </button>
        </div>
      </div>
    </main>
  );
}
