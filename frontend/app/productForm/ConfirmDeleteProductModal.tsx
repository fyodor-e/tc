"use client";
import config from "@/config";
import ConfirmModal from "../ConfirmModal";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmDeleteProductModal({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter()

  const handleDelete = useCallback(async () => {
    await fetch(`${config.serverUrl}/products/${productId}`, {
      method: "DELETE",
    });
    router.push('/')
  }, [productId, router]);

  return (
    <ConfirmModal
      text="После удаления продукта его нельзя будет восстановить. Вы уверены?"
      buttonText="Удалить"
      onProceed={handleDelete}
    />
  );
}
