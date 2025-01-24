"use client";
import { useCallback, useState } from "react";
import config from "@/config";
import ConfirmModal from "../ConfirmModal";
import { FilePickerReturnTypes } from "use-file-picker/types";

type Props = { id: string | undefined } & FilePickerReturnTypes<string, unknown>

const ProductImage = ({ id, openFilePicker, filesContent, clear }: Props) => {
  const photo = filesContent.length ? filesContent[0] : undefined;
  const [refreshImage, setImageRefresh] = useState<string>(new Date().toString())

  const handleDeletePhoto = useCallback(async () => {
    clear();
    await fetch(`${config.serverUrl}/products/${id}/photo`, {
      method: "DELETE",
    });
    setImageRefresh(new Date().toString())
  }, [clear, id]);

  const src =
    photo?.content ||
    (id ? `${config.serverUrl}/products/${id}/photo?${refreshImage}` : undefined);

  return (
    <div className="flex-1 flex flex-col gap-2 justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Изображение не выбрано"
        src={src}
        className="min-h[100px] w-[100%]"
      />
      <div className="flex gap-3 mt-auto">
        <button
          className="px-2 border border-gray-500 rounded-lg"
          onClick={openFilePicker}
        >
          Выбрать фото продукта
        </button>
        {src && (
          <ConfirmModal
            text="После удаления фото его нельзя будет восстановить. Вы уверены?"
            buttonText="Удалить фото"
            onProceed={handleDeletePhoto}
          />
        )}
      </div>
    </div>
  );
};

export default ProductImage;
