import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

export function GoalTracker({ asset, currentAmount, targetAmount, deadline }: { asset: string; currentAmount: number; targetAmount: number; deadline: string }) {
  const progress = Math.min((currentAmount / targetAmount) * 100, 100);
  return (
    <Card className="border-l-4 border-blue-500">
      <CardHeader className="flex flex-row items-center gap-2">
        <Target className="text-blue-500" />
        <CardTitle className="text-base">Goal Tracker: {asset}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2">
          Target {targetAmount} {asset} sebelum {deadline}
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>{currentAmount.toFixed(4)} {asset}</span>
          <span>{targetAmount} {asset}</span>
        </div>
        <Progress value={progress} className="h-3" />
      </CardContent>
    </Card>
  );
}