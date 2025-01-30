import { ProfileCard } from "@/components/profile-card";
import { TaskCard } from "@/components/task-card";

export function Home() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-4 md:p-4 space-x-2">
      <ProfileCard />
      <TaskCard />
    </div>
  );
}
