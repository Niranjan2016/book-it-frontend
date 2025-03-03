"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "../dashboard/types";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, session, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>
          {profile && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Name</h2>
                <p className="text-gray-600">{profile.name}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Email</h2>
                <p className="text-gray-600">{profile.email}</p>
              </div>
              {/* Add more profile fields as needed */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
