import { fetchIssueById } from "@/sql/data";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}

const IssuueDetailPage = async ({ params }: Props) => {
  const issue = await fetchIssueById(params.id);

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue}/>
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id}/>
      </Box>
    </Grid>
  );
};

export default IssuueDetailPage;
