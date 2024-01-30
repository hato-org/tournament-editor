import React, { useMemo } from "react";
import { Leaf } from "./Leaf";
import { Divider } from "../ui/Divider";
import { focusAtom } from "jotai-optics";
import { focusTournament } from "../../lib/tournament";
import { tournamentAtom } from "../../atoms/tournament";
import { SetStateAction, WritableAtom, useSetAtom } from "jotai";
import { Minus } from "lucide-react";
import { OpticParams, Prism } from "optics-ts";

const countNumOfClass = ({
  match,
  class: classInfo,
}: ClassmatchTournament): ClassmatchClass[] =>
  match
    ? match.map((tournament) => countNumOfClass(tournament)).flat()
    : [classInfo];

export const Section = React.memo(
  ({
    id,
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
    const focusTournamentAtom = useMemo(
      () =>
        focusAtom(tournamentAtom, (optic) =>
          focusTournament<
            Prism<ClassmatchTournament, OpticParams, ClassmatchTournament>
          >(optic.prop("tournament"), id.split("-").slice(1))
        ) as unknown as WritableAtom<
          ClassmatchTournament,
          [SetStateAction<ClassmatchTournament>],
          void
        >,
      [id]
    );

    const setTournament = useSetAtom(focusTournamentAtom);

    const winnerId = participants.reduce(
      (prev, curr) => (prev.point > curr.point ? prev : curr),
      { from: "", point: 0 }
    ).from;

    const numOfClass = match?.map((tournament) => countNumOfClass(tournament));

    return match ? (
      <div className="flex shrink-0 self-stretch">
        <div
          className="flex shrink-0 grow"
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
        <div className="relative flex min-w-12 grow flex-col items-center justify-center self-stretch">
          {match.map((tournament, index) => (
            <div
              key={tournament.id}
              className="absolute -left-0.5 w-0.5 bg-black"
              style={{
                ...{
                  [(tournament.id.at(-1) ?? "") === "0" ? "bottom" : "top"]:
                    "50%",
                  height: `calc(100% / ${numOfClass?.flat()?.length} / 2 * ${
                    numOfClass?.[Math.abs(index - 1)]?.length
                  })`,
                },
              }}
            />
          ))}
          <button
            hidden={id === "0"}
            className="absolute left-0 top-1/2 rounded-md border border-red-400 p-1 text-red-500 transition-all hover:bg-red-200"
            onClick={() =>
              setTournament((prev) => ({
                ...prev,
                match: undefined,
                class: {
                  type: "?",
                  grade: "?",
                  class: "?",
                },
              }))
            }
          >
            <Minus size={8} />
          </button>
          <Divider />
        </div>
      </div>
    ) : (
      <Leaf id={id} direction={direction} isWinner={isWinner} {...classInfo} />
    );
  }
);
