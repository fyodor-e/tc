"use client";
import Product from "@/interfaces/product";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import Link from "next/link";
import config from "@/config";
import { useRouter } from "next/navigation";
import { useFilePicker } from "use-file-picker";
import ProductImage from "./ProductImage";

const ProductForm = ({ id }: { id: string | undefined }) => {
  const [initialProduct, setInitialProduct] = useState<Product | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    values: initialProduct,
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await fetch(`${config.serverUrl}/products/${id}`);
      const product: Product = await res.json();
      setInitialProduct(product);
    })();
  }, [id]);

  const router = useRouter();

  const { filesContent, ...restFilePickerProps } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
  });

  const photo = filesContent.length ? filesContent[0] : undefined;

  const onSubmit = useCallback<SubmitHandler<Product>>(
    async (data) => {
      try {
        let productId = id;
        if (!productId) {
          const res: { id: string } = await fetch(
            `${config.serverUrl}/products`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(data),
            }
          ).then((body) => body.json());
          productId = res.id;
        } else {
          await fetch(`${config.serverUrl}/products/${productId}`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify(data),
          });
        }

        if (photo) {
          const data = await fetch(photo.content);
          const blob = await data.blob();

          const formData = new FormData();
          formData.append("file", blob, photo.name);

          await fetch(`${config.serverUrl}/products/${productId}/photo`, {
            method: "POST",
            body: formData,
          });
        }

        router.push("/");
      } catch {}
    },
    [id, photo, router]
  );

  return (
    <div className="p-7 flex gap-5 bg-slate-50">
      <ProductImage
        id={id}
        filesContent={filesContent}
        {...restFilePickerProps}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-3 items-start"
      >
        <FormInput
          label="Артикул"
          {...register("sku")}
          error={errors.sku?.message}
        />
        <FormInput
          label="Название"
          {...register("name", { required: "Название является обязательным" })}
          error={errors.name?.message}
        />
        <FormInput
          label="Описание"
          {...register("description")}
          error={errors.description?.message}
        />
        <FormInput
          label="Цена"
          type="number"
          {...register("price", {
            min: { value: 0, message: "Цена должны быть больше нуля" },
          })}
          error={errors.price?.message}
        />
        <FormInput
          label="Цена со скидкой"
          type="number"
          {...register("priceWithDiscount", {
            min: { value: 0, message: "Цена должны быть больше нуля" },
          })}
          error={errors.priceWithDiscount?.message}
        />
        <div className="flex gap-2 justify-end">
          <input
            type="submit"
            value="Сохранить"
            className="px-2 border border-gray-500 rounded-lg"
          />
          <Link className="px-2 border border-gray-500 rounded-lg" href="/">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
