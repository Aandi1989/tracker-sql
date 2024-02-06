import { fetchIssues } from "@/sql/data";
import { Table, TableBody } from "@radix-ui/themes";
import { IssueStatusBadge, Link} from '@/app/components';
import NextLink from 'next/link';
import IssueActions from "../_components/IssueActions";
import { Issue, Status } from "@/sql/definitions";
import { Underdog } from "next/font/google";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";


const IssuesPage = async ({ 
    searchParams 
  }: { 
    searchParams: { 
      status: Status, 
      orderBy: keyof Issue, 
      page: string
    };
  }) => {

    const columns: {
        label: string; 
        value: keyof Issue;
        className?: string;      
      }[] = [
        { label: 'Issue', value: 'title'},
        { label: 'Status', value: 'status', className: "hidden md:table-cell"},
        { label: 'Created', value: 'createdAt', className: "hidden md:table-cell"},
    ]
   
   const statuses = ["OPEN", "IN_PROGRESS", "CLOSED"]
   const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy =  columns
    .map(column => column.value)
    .includes(searchParams.orderBy) 
    ? searchParams.orderBy 
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
   
  const issues = await fetchIssues(status, orderBy, pageSize, offset);
  const totalIssueCount = await fetchIssues(status);

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(column =>  (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink href={{
                  query: { ...searchParams, orderBy: column.value}
                }}>{column.label}</NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className="inline"/>}
              </Table.ColumnHeaderCell>
            ))}
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
      <Pagination 
        pageSize={pageSize}
        currentPage={page}
        //@ts-ignore
        itemCount={totalIssueCount.length}
      />
    </div>
  );
};

export default IssuesPage;
