export default async function Home() {
  return (
    <div
      className="relative flex h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/homeless.jpeg')" }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 bg-white/70 p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🚧 Under Development
        </h1>
        <p className="text-lg text-gray-600">
          We’re working hard to bring something amazing here. Stay tuned!
        </p>
      </div>
    </div>
  );
}
