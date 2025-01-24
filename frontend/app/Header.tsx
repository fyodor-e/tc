"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChangeEventHandler, useCallback } from "react";

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const price = Number(searchParams.get("price") || "");
  const { replace } = useRouter();

  const handlePageSizeChange = useCallback<
    ChangeEventHandler<HTMLSelectElement>
  >(
    ({ target: { value } }) => {
      const params = new URLSearchParams(searchParams);
      params.set("sort", value);
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );

  const handlePriceFilterChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    ({ target: { value } }) => {
      const params = new URLSearchParams(searchParams);
      if (isNaN(+value) || value === "") {
        params.delete("price");
      } else {
        params.set("price", value);
        params.set("page", "1");
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );

  return (
    <div className="flex justify-between items-center">
      <span className="text-2xl">Продукты</span>
      <div className="flex gap-2">
        <label>Сортировать по:</label>
        <select onChange={handlePageSizeChange} value={sort || ""}>
          <option value="sku">Артикул</option>
          <option value="name">Название</option>
          <option value="price">Стоимость</option>
        </select>
      </div>
      <div className="flex gap-2">
        <label>Стоимость больше:</label>
        <input
          className="px-1 bg-inherit border border-gray-500 w-[50px]"
          type="number"
          min={0}
          onChange={handlePriceFilterChange}
          value={price}
        />
      </div>
      <Link className="px-2 border border-gray-500 rounded-lg" href="new">
        Добавить продукт
      </Link>
    </div>
  );
}
