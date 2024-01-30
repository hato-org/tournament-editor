import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

export function Select(props: ComponentPropsWithoutRef<"select">) {
  return (
    <select
      {...props}
      className={clsx(
        props.className,
        "min-w-32 appearance-none rounded-lg border bg-white bg-[url(https://unpkg.com/lucide-static@latest/icons/chevron-down.svg)] bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat px-4 py-2 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      )}
    />
  );
}
