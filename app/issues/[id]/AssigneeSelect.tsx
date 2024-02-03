"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@/sql/definitions";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignedIssue = (userId: string) => {
    axios
      .patch(
        "/api/issues/" + issue.id,
        // we have to send title and description otherwise db will throw error cause these fields cant be null
        {
          title: issue.title,
          description: issue.description,
          assigninedToUserId: userId || null,
        }
      )
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
  };

  return (
    <>
      <Select.Root defaultValue={issue.assigninedToUserId !== null ? String(issue.assigninedToUserId): ""}
                    onValueChange={assignedIssue}>
        {/* @ts-ignore */}
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={String(user.id)}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () => useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60sec
    retry: 3,
  });

export default AssigneeSelect;
