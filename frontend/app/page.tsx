import config from "@/config";
import Product from "@/interfaces/product";
import Link from "next/link";
import Pagination from "./Pagination";
import Header from "./Header";
import ConfirmDeleteProductModal from "./productForm/ConfirmDeleteProductModal";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{
    sort?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const urlParams = params ? `?${new URLSearchParams(params).toString()}` : "";
  const data = await fetch(`${config.serverUrl}/products${urlParams}`);
  const {
    products,
    totalPages,
  }: {
    products: Product[];
    totalPages: number;
  } = await data.json();

  return (
    <>
      <Header />

      <div className="flex-1 min-h-0 overflow-auto">
        <table className="w-[100%]">
          <thead>
            <tr>
              <th>Артикул</th>
              <th>Название</th>
              <th>Описание</th>
              <th>Стоимость</th>
              <th>Стоимость со скидкой</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`${index % 2 === 0 && "bg-slate-200"}`}
              >
                <td>{product.sku}</td>
                <td>
                  <Link
                    className="cursor-pointer font-bold"
                    href={`${product.id}`}
                  >
                    {product.name}
                  </Link>
                </td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.priceWithDiscount}</td>
                <td>
                  <Link
                    className="px-2 border border-gray-500 rounded-lg"
                    href={`${product.id}/edit`}
                  >
                    Изменить
                  </Link>{" "}
                  <ConfirmDeleteProductModal productId={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer>
        <Pagination totalPages={totalPages} />
      </footer>
    </>
  );
}
