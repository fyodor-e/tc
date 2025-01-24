import ProductForm from "../../productForm/ProductForm1";

export default async function EditProduct({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  return <ProductForm id={productId} />
}
