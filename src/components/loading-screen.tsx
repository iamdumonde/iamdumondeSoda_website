
import { Progress } from "@/components/ui/progress";

interface LoadingScreenProps {
  progress: number;
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-sm p-8 text-center space-y-6">
        <h1 className="text-5xl font-black text-primary tracking-tighter animate-pulse">
          Iamdumonde
        </h1>
        <div className="space-y-2">
            <Progress value={progress} className="w-full h-2" />
            <p className="text-sm text-muted-foreground">{`Chargement... ${Math.round(progress)}%`}</p>
        </div>
      </div>
    </div>
  );
}
