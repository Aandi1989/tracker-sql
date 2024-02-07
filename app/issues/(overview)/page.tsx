import Pagination from "@/app/components/Pagination";
import { fetchIssues } from "@/sql/data";
import IssueActions from "../_components/IssueActions";
import IssueTable, { IssueQuery, columnNames } from "../_components/IssueTable";
import { Flex } from "@radix-ui/themes";


const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {

   const statuses = ["OPEN", "IN_PROGRESS", "CLOSED"]
   const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy =  columnNames
    .includes(searchParams.orderBy) 
    ? searchParams.orderBy 
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
   
  const issues = await fetchIssues(status, orderBy, undefined, pageSize, offset);
  const totalIssueCount = await fetchIssues(status);

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      {/* @ts-ignore */}
      <IssueTable searchParams={searchParams} issues={issues}/>
      <Pagination 
        pageSize={pageSize}
        currentPage={page}
        //@ts-ignore
        itemCount={totalIssueCount.length}
      />
    </Flex>
  );
};

export default IssuesPage;
