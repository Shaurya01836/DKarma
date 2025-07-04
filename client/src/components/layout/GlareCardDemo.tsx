import {
  CodeBracketIcon,
  PaintBrushIcon,
  MegaphoneIcon,
  PencilSquareIcon,
  FilmIcon,
  CpuChipIcon,
  MusicalNoteIcon,
  BriefcaseIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { GlareCard } from "../ui/glare-card";

const cardItems = [
  { title: "Programming & Tech", icon: CodeBracketIcon, iconColor: "text-primary" },
  { title: "Graphics & Design", icon: PaintBrushIcon, iconColor: "text-success" },
  { title: "Digital Marketing", icon: MegaphoneIcon, iconColor: "text-primary-hover" },
  { title: "Writing & Translation", icon: PencilSquareIcon, iconColor: "text-secondary" },
  { title: "Video & Animation", icon: FilmIcon, iconColor: "text-error" },
  { title: "AI Services", icon: CpuChipIcon, iconColor: "text-primary" },
  { title: "Music & Audio", icon: MusicalNoteIcon, iconColor: "text-muted" },
  { title: "Business", icon: BriefcaseIcon, iconColor: "text-foreground" },
  { title: "Consulting", icon: UserGroupIcon, iconColor: "text-secondary" },
];

export function GlareCardDemo() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 p-2 px-32">
      {cardItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <GlareCard
            key={index}
            className="group flex flex-col items-center justify-center w-full h-full p-2 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-[var(--color-primary)] bg-[var(--color-surface)] hover:bg-gradient-to-br hover:from-[var(--color-primary)] hover:to-[var(--color-primary-hover)] hover:bg-opacity-80"
          >
            <Icon className={`h-8 w-8 ${item.iconColor} transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125`} />
            <p className="text-white text-xs mt-2 font-medium text-center group-hover:text-[var(--color-primary-hover)] transition-colors duration-300">
              {item.title}
            </p>
          </GlareCard>
        );
      })}
    </div>
  );
}
