export default function ImageCard({ data }) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
      {/* Image */}
      <img
        src={`http://localhost:5000/uploads/${data.image}`}
        alt={data.title}
        className="w-full h-48 sm:h-56 md:h-60 object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Glass overlay (hidden by default) */}
      <div
        className="absolute bottom-0 left-0 w-full p-3 
                bg-white/10 backdrop-blur-md
                opacity-0 group-hover:opacity-100
                transition duration-300"
      >
        <h4 className="text-white text-lg font-semibold">{data.title}</h4>
      </div>
    </div>
  );
}
