import { fetchIssues } from "@/sql/data";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const open = await fetchIssues("OPEN");
  const inProgress = await fetchIssues("IN_PROGRESS");
  const closed = await fetchIssues("CLOSED");
  return (
    <Grid columns={{ initial: '1', md: '2'}} gap='5'>
      <Flex direction="column" gap='5'>
         {/* @ts-ignore */}
        <IssueSummary open={open.length} inProgress={inProgress.length} closed={closed.length}/>
        {/* @ts-ignore */}
        <IssueChart open={open.length} inProgress={inProgress.length} closed={closed.length}/>
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
