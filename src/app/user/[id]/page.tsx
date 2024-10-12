"use client";

import { deleteUser, getUser } from "@/lib/user";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { RecordModel } from "pocketbase";


export default function Profile({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<RecordModel | null>(null);
  

  useEffect(() => {
    getUser(params.id)
      .then(userRecord => {
        setUser(userRecord)
      })
  }, [params.id])

  function confirmDeletion() {
    if (!confirm("Are you sure? This can't be undone!")) return;
    deleteUser();
  }

  return (
    <main className="h-screen flex justify-center items-center flex-col bg-zinc-200 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100">
      {user ? (
        <>
          <p>Profile of {user.username}</p>
          <Button onClick={confirmDeletion}>Delete Profile</Button>
        </>
      ) : (
        <p>No user found. Please log in to view your profile.</p>
      )}
    </main>
  );
}
