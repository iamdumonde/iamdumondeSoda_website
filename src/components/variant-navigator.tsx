
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
    <div className="flex flex-col items-center gap-4 text-white">
       <span className="text-7xl font-black w-20 text-center order-2">
        {String(currentIndex + 1).padStart(2, '0')}
      </span>
      <div className="flex items-center gap-4 order-1">
        <Button variant="outline" size="icon" onClick={onPrev} className="rounded-full h-12 w-12 bg-white/10 text-white/70 border-white/20 hover:bg-white/20 hover:text-white hover:border-white/40 backdrop-blur-sm">
          <ChevronUp className="h-6 w-6" />
           <span className="sr-only">Précédent</span>
        </Button>
        <Button variant="outline" size="icon" onClick={onNext} className="rounded-full h-12 w-12 bg-white/10 text-white/70 border-white/20 hover:bg-white/20 hover:text-white hover:border-white/40 backdrop-blur-sm">
          <ChevronDown className="h-6 w-6" />
           <span className="sr-only">Suivant</span>
        </Button>
      </div>
    </div>
  );
}

    