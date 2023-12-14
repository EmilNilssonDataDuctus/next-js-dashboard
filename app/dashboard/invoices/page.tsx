import { fetchInvoicesPages } from '@/app/lib/data';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import FilterOptions from '@/app/ui/filterOptions';
import { lusitana } from '@/app/ui/fonts';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import Pagination from '@/app/ui/invoices/pagination';
import InvoicesTable from '@/app/ui/invoices/table';
import Search from '@/app/ui/search';
import {
  InvoicesTableSkeleton,
  LatestInvoicesSkeleton,
} from '@/app/ui/skeletons';
import { Suspense } from 'react';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    filterQuery?: 'paid' | 'pending';
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query, searchParams?.filterQuery);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <div>
        <FilterOptions />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-4">
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          <InvoicesTable
            query={query}
            currentPage={currentPage}
            filterQuery={searchParams?.filterQuery}
          />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton width={1} entries={4} />}>
          <LatestInvoices width={1} entries={4} />
        </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
