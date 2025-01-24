import config from "@/config";
import Product from "@/interfaces/product";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product: Product = await fetch(
    `${config.serverUrl}/products/${productId}`
  ).then((res) => res.json());

  return {
    title: product.name,
    openGraph: {
      title: product.name,
      description: product.description || undefined,
      images: [`${config.serverUrl}/products/${productId}/photo`],
    },
  };
}

export default async function ProductDetails({ params }: Props) {
  const { productId } = await params;
  const data = await fetch(`${config.serverUrl}/products/${productId}`);
  const product: Product = await data.json();

  return (
    <div className="flex flex-col items-stretch justify-items-center min-h-screen p-10 gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-6 items-center">
        <Link className="px-2 border border-gray-500 rounded-lg" href="/">
          Назад
        </Link>
        <span className="text-2xl">{product.name}</span>
      </div>

      <div className="flex gap-5">
        <div className="flex-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Изображение не выбрано"
            src={`${config.serverUrl}/products/${productId}/photo`}
            className="min-h[100px]"
          />
        </div>

        <div className="flex-1 grid grid-cols-2 grid-rows-5 gap-2">
          <div className="col-[1] row-[1]">Артикул:</div>
          <div className="col-[1] row-[2]">Название:</div>
          <div className="col-[1] row-[3]">Описание:</div>
          <div className="col-[1] row-[4]">Стоимость:</div>
          <div className="col-[1] row-[5]">Стоимость со скидкой:</div>
          <div className="col-[2] row-[1]">{product.sku}</div>
          <div className="col-[2] row-[2]">{product.name}</div>
          <div className="col-[2] row-[3]">{product.description}</div>
          <div className="col-[2] row-[4]">{product.price}</div>
          <div className="col-[2] row-[5]">{product.priceWithDiscount}</div>
        </div>
      </div>
    </div>
  );
}
