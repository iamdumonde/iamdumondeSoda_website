
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VariantNavigatorProps {
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalVariants: number;
}

export default function VariantNavigator({ onPrev, onNext, currentIndex, totalVariants }: VariantNavigatorProps) {
  return (
    <div className="flex items-center gap-4 text-white">
      <div className="flex flex-col items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onPrev} className="p-0 h-auto hover:bg-transparent text-white/70 hover:text-white">
          <div className="flex flex-col items-center">
            <span className="text-xs font-light tracking-widest">PRÉC</span>
            <ChevronUp className="h-6 w-6" />
          </div>
        </Button>
        <div className="h-10 w-px bg-white/50"></div>
        <Button variant="ghost" size="sm" onClick={onNext} className="p-0 h-auto hover:bg-transparent text-white/70 hover:text-white">
          <div className="flex flex-col items-center">
            <ChevronDown className="h-6 w-6" />
            <span className="text-xs font-light tracking-widest">SUIV</span>
          </div>
        </Button>
      </div>
       <span className="text-7xl font-black w-20 text-left">
        {String(currentIndex + 1).padStart(2, '0')}
      </span>
    </div>
  );
}
