import React from "react";
import IssueForm from "../../_components/IssueForm";
import { fetchIssueById } from "@/sql/data";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await fetchIssueById(params.id);

  if(!issue){
    notFound();
  }

  return <IssueForm issue={issue}/>;
};

export default EditIssuePage;
