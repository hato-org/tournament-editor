import React from "react";
import "./section.css";
import { Leaf } from "./Leaf";
import { Divider } from "../ui/Divider";

const countNumOfClass = ({
  match,
  class: classInfo,
}: ClassmatchTournament): ClassmatchClass[] =>
  match
    ? match.map((tournament) => countNumOfClass(tournament)).flat()
    : [classInfo];

export const Section = React.memo(
  ({
    // id,
    match,
    class: classInfo,
    // meta,
    participants,
    direction,
    isWinner,
    losers,
  }: ClassmatchTournament & {
    direction: "rtl" | "ltr";
    isWinner: boolean;
    losers?: boolean;
  }) => {
    const winnerId = participants.reduce(
      (prev, curr) => (prev.point > curr.point ? prev : curr),
      { from: "", point: 0 }
    ).from;

    const numOfClass = match?.map((tournament) => countNumOfClass(tournament));

    return match ? (
      <div className="section">
        <div
          className="section-match"
          style={{
            flexDirection: direction === "ltr" ? "column" : "column-reverse",
          }}
        >
          {match.map((tournament) => (
            <Section
              key={tournament.id}
              {...tournament}
              direction={direction}
              isWinner={tournament.id === winnerId}
              losers={losers}
            />
          ))}
        </div>
        <div className="section-border-container">
          {match.map((tournament, index) => (
            <div
              key={tournament.id}
              style={{
                position: "absolute",
                left: -1,
                width: "2px",
                ...{
                  [(tournament.id.at(-1) ?? "") === "0" ? "bottom" : "top"]:
                    "50%",
                  height: `calc(100% / ${numOfClass?.flat()?.length} / 2 * ${
                    numOfClass?.[Math.abs(index - 1)]?.length
                  })`,
                  backgroundColor: "#fff",
                },
              }}
            />
          ))}
          <Divider />
        </div>
      </div>
    ) : (
      <Leaf direction={direction} isWinner={isWinner} {...classInfo} />
    );
  }
);
