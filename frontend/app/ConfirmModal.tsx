"use client"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function ConfirmModal({
  text,
  buttonText,
  onProceed,
}: {
  text: string;
  buttonText: string;
  onProceed: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="px-2 border border-gray-500 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">
              Подтвердите удаление
            </DialogTitle>
            <p>{text}</p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Отмена</button>
              <button
                onClick={() => {
                  onProceed();
                  setIsOpen(false);
                }}
              >
                Удалить
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
