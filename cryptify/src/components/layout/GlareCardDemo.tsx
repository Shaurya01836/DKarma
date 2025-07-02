import { GlareCard } from "../ui/glare-card";

// Card data
const cardItems = [
  { title: "Programming & Tech", iconColor: "text-blue-400" },
  { title: "Graphics & Design", iconColor: "text-green-400" },
  { title: "Digital Marketing", iconColor: "text-emerald-400" },
  { title: "Writing & Translation", iconColor: "text-yellow-400" },
  { title: "Video & Animation", iconColor: "text-purple-400" },
  { title: "AI Services", iconColor: "text-pink-400" },
  { title: "Music & Audio", iconColor: "text-orange-400" },
  { title: "Business", iconColor: "text-red-400" },
  { title: "Consulting", iconColor: "text-cyan-400" },
];

export function GlareCardDemo() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 p-2 px-32">
      {cardItems.map((item, index) => (
        <GlareCard
          key={index}
          className="flex flex-col items-center justify-center w-full h-full p-2 rounded-md"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 66 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${item.iconColor}`}
          >
            <path
              d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
              stroke="currentColor"
              strokeWidth="10"
              strokeMiterlimit="3.86874"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-white text-xs mt-2 font-medium text-center">
            {item.title}
          </p>
        </GlareCard>
      ))}
    </div>
  );
}
