import { fetchIssues } from "@/sql/data";
import { Table, TableBody } from "@radix-ui/themes";
import { IssueStatusBadge, Link} from '@/app/components';
import IssueActions from "../_components/IssueActions";
import { Status } from "@/sql/definitions";
import { Underdog } from "next/font/google";


const IssuesPage = async ({ 
    searchParams 
  }: { 
    searchParams: { status: Status};
  }) => {
   
    const statuses = ["OPEN", "IN_PROGRESS", "CLOSED"]
   const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
   
  const issues = await fetchIssues(status);

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <TableBody>
          {/* @ts-ignore */}
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </TableBody>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
