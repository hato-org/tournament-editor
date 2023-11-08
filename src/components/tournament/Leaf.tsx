import React from "react";
import "./leaf.css";
import { Divider } from "../ui/Divider";

export const Leaf = React.memo(
  ({
    type,
    grade,
    class: classNum,
    direction,
    // isWinner,
  }: ClassmatchClass & { direction: "ltr" | "rtl"; isWinner: boolean }) => (
    <div
      className="leaf"
      style={{ flexDirection: direction === "ltr" ? "row" : "row-reverse" }}
    >
      <div
        style={{
          paddingTop: "0.25rem",
          paddingBottom: "0.25rem",
          flexShrink: 0,
        }}
      >
        <span className="leaf-text">
          {type === "teacher" ? "職員" : `${grade}-${classNum}`}
        </span>
      </div>
      <div className="leaf-border-container">
        <Divider />
      </div>
    </div>
  )
);
