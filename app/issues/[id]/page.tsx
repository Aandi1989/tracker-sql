import { fetchIssueById } from "@/sql/data";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssuueDetailPage = async ({ params }: Props) => {
  const  issue  = await fetchIssueById(params.id);
  console.log(issue)

  if(!issue){
    notFound();
  }

  return (
    <div>
        <p>{issue.title}</p>
        <p>{issue.description}</p>
        <p>{issue.status}</p>
        <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssuueDetailPage;
