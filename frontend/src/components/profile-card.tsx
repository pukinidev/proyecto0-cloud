import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ProfileAvatar } from "./profile-avatar";

export function ProfileCard() {
  return (
    <Card className="w-[300px] h-[750px]">
      <CardHeader>
        <div className="flex justify-between mb-2">
          <CardTitle>Profile</CardTitle>
        </div>
        <div className="border-t-2 border-black-200">
          <div className="flex mt-4 mb-4">
            <CardDescription>Details</CardDescription>
          </div>
          <CardContent>
            <ProfileAvatar />
            <div className="flex flex-col items-center gap-4 mt-4">
              <label htmlFor="username">Username</label>
            </div>
          </CardContent>
        </div>
      </CardHeader>
    </Card>
  );
}
