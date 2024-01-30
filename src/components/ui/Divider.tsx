import clsx from "clsx";
import { HTMLAttributes } from "react";

export function Divider(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={clsx(props.className, "self-stretch border border-black")}
    />
  );
}
