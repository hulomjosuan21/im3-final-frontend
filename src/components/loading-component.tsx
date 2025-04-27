import { Progress } from "./ui/progress";

export default function LoadingComponent() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-background">
      <div className="text-md font-semibold mb-4">Loading...</div>
      <Progress value={80} className="w-1/2" />
    </div>
  );
}
