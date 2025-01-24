"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChangeEventHandler, useCallback } from "react";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const { replace } = useRouter();

  const handleGoToPage = useCallback(
    (pageNumber: number) => {
      if (pageNumber < 1 || pageNumber > totalPages) return;
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams, totalPages]
  );

  const handlePageSizeChange = useCallback<
    ChangeEventHandler<HTMLSelectElement>
  >(
    ({ target: { value } }) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      params.set("pageSize", value);
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );

  return (
    <div className="flex justify-between w-[100%]">
      <button
        className="px-2 border border-gray-500 rounded-lg"
        disabled={currentPage === 1}
        onClick={() => handleGoToPage(currentPage - 1)}
      >
        Назад
      </button>
      <div className="flex gap-2">
        <label>Продуктов на странице:</label>
        <select onChange={handlePageSizeChange} value={pageSize}>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      Страница {currentPage} из {totalPages}
      <button
        className="px-2 border border-gray-500 rounded-lg"
        disabled={currentPage === totalPages}
        onClick={() => handleGoToPage(currentPage + 1)}
      >
        Вперед
      </button>
    </div>
  );
}
