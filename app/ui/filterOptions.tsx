'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function FilterOptions() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  // TODO: Fix bug where clicking both and unclicking one does the opposite of what you want
  const handleToggleFilter = (filterOption: string) => {
    if (filterOption === 'paid') {
    }
    const params = new URLSearchParams(searchParams);
    params.delete('page');

    if (!params.get('filterQuery')) {
      params.set('filterQuery', filterOption);
    } else {
      params.delete('filterQuery');
    }
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div>
      <label className="mr-5">
        Hide Paid
        <input
          type="checkbox"
          className="ml-2"
          id="paid"
          onChange={(e) => handleToggleFilter(e.target.id)}
        />
      </label>
      <label className="mr-5">
        Hide Pending
        <input
          type="checkbox"
          className="ml-2"
          id="pending"
          onChange={(e) => handleToggleFilter(e.target.id)}
        />
      </label>
    </div>
  );
}
