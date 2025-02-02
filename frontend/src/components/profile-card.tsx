import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ProfileAvatar } from "./profile-avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth-provider";
import { ModeToggle } from "./mode-toggle";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

interface Profile {
  id: number;
  username: string;
  profile_picture: string;
  disabled: boolean;
}

export function ProfileCard() {
  const { setToken } = useAuth();
  const [profile, setProfile] = useState<Profile>({
    id: 0,
    username: "",
    profile_picture: "",
    disabled: false,
  });

  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/profile", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    setToken(null);
  };

  return (
    <Card className="w-[300px] h-[750px]">
      <CardHeader>
        <div className="flex justify-between mb-2">
          <CardTitle>Profile</CardTitle>
        </div>
        <div className="border-t-2 border-black-200">
          <div className="flex items-center justify-between mt-4 mb-4">
            <CardDescription>Details</CardDescription>
            <ModeToggle />
          </div>

          <CardContent>
            <ProfileAvatar />
            <div className="flex flex-col items-center gap-4 mt-4">
              <label htmlFor="username">{profile.username}</label>
              <Button variant="destructive" type="button" onClick={logout}>
                Logout
              </Button>
            </div>
          </CardContent>
        </div>
      </CardHeader>
    </Card>
  );
}
