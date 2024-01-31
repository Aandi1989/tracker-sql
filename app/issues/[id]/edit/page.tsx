import React from "react";
import { fetchIssueById } from "@/sql/data";
import { notFound } from "next/navigation";
import dynamic from 'next/dynamic';
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  { ssr: false,
  loading: () => <IssueFormSkeleton /> }
)

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
