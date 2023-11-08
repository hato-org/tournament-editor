import { HTMLAttributes } from "react";

export function Divider(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        border: "1px solid",
        borderColor:  'var(--border-color)',
				alignSelf: 'stretch',
				width: 'auto',
				height: 'auto',
        ...props.style,
      }}
    />
  );
}
