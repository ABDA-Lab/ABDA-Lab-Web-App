import { Progress } from '@/components/ui/progress';

interface CourseHeaderProps {
  title: string;
  instructor: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
}

export function CourseHeader({
  title,
  instructor,
  completedLessons,
  totalLessons,
  progress,
}: CourseHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">Instructor: {instructor}</p>
      </div>
      <div className="flex flex-col w-full md:w-auto">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">
            Your progress: {completedLessons}/{totalLessons} lessons
          </span>
          <span className="text-sm text-muted-foreground">({progress}%)</span>
        </div>
        <Progress value={progress} className="w-full md:w-[250px]" />
      </div>
    </div>
  );
}
