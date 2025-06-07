import { toast as sonnerToast } from "sonner";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaTriangleExclamation } from "react-icons/fa6";
import { BsExclamationDiamondFill } from "react-icons/bs";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ToastProps {
  id: string | number;
  title: string;
  description?: string;
  variant?: "default" | "success" | "info" | "warning" | "error";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
}

const icons = {
  default: null,
  info: <AiFillInfoCircle className="size-5 text-blue-700" />,
  success: <IoIosCheckmarkCircle className="size-5 text-green-700" />,
  warning: <FaTriangleExclamation className="size-5 text-yellow-500" />,
  error: <BsExclamationDiamondFill className="size-5 text-red-700" />,
} as const;

function Toast({
  id,
  title,
  description,
  variant = "default",
  action,
  cancel,
}: Readonly<ToastProps>) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 rounded-md rounded-r-none bg-white p-4 text-black md:max-w-[364px] md:min-w-[364px]",
        variant === "success" && "bg-green-100",
        variant === "error" && "bg-red-100",
        variant === "warning" && "bg-amber-100",
        variant === "info" && "bg-blue-100",
        variant === "default" && "bg-gray-100"
      )}
    >
      <div className="grid grid-cols-[auto_1fr] gap-2">
        {variant !== "default" && <div>{icons[variant]}</div>}
        <p className="text-left text-sm font-medium">{title}</p>

        {description && (
          <>
            <div />
            <p className="text-xs">{description}</p>
          </>
        )}
      </div>

      {(action || cancel) && (
        <div className="flex items-center">
          {cancel && (
            <Button
              variant="link"
              onClick={() => {
                cancel.onClick();
                sonnerToast.dismiss(id);
              }}
            >
              {cancel.label}
            </Button>
          )}
          {action && (
            <Button
              variant="link"
              onClick={() => {
                action.onClick();
                sonnerToast.dismiss(id);
              }}
            >
              {action.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

type ToastFunction = {
  (props: Omit<ToastProps, "id">): void;
  success: (props: Omit<ToastProps, "id" | "variant">) => void;
  info: (props: Omit<ToastProps, "id" | "variant">) => void;
  warning: (props: Omit<ToastProps, "id" | "variant">) => void;
  error: (props: Omit<ToastProps, "id" | "variant">) => void;
};

export const toast = ((props: Omit<ToastProps, "id">) => {
  return sonnerToast.custom((id) => <Toast id={id} {...props} />, {
    duration: props.duration,
  });
}) as unknown as ToastFunction;

// Add primitive methods
Object.keys(icons).forEach((key) => {
  if (key === "default") return;
  (toast as any)[key] = (props: Omit<ToastProps, "id" | "variant">) =>
    toast({ ...props, variant: key as keyof typeof icons });
});
