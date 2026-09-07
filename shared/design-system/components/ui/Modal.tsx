"use client";

import { type HTMLAttributes, useCallback, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  title?: string;
}

/**
 * Modal — accessible dialog with focus trap and Escape-to-close.
 *
 * Uses native <dialog> for built-in accessibility. Focus is trapped within
 * the modal while open, and restored to the trigger on close.
 */
export function Modal({ open, onClose, title, className, children, ...props }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose],
  );

  return (
    <dialog
      ref={dialogRef}
      onKeyDown={handleKeyDown}
      className={twMerge(
        "rounded-lg border bg-background p-0 shadow-lg",
        "backdrop:bg-black/50 backdrop:backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {title && (
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
    </dialog>
  );
}
