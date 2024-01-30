import React, { useMemo } from "react";
import { Divider } from "../ui/Divider";
import TournamentPopover from "./Popover";
import { focusAtom } from "jotai-optics";
import { tournamentAtom } from "../../atoms/tournament";
import { focusTournament } from "../../lib/tournament";
import { SetStateAction, WritableAtom, useSetAtom } from "jotai";
import { Plus } from "lucide-react";
import { OpticParams, Prism } from "optics-ts";
import clsx from "clsx";

const tournamentPlaceholder = {
  id: "",
  participants: [],
  meta: {
    location: null,
    startAt: null,
    endAt: null,
  },
  class: {
    type: "?",
    grade: "?",
    class: "?",
  },
} satisfies ClassmatchTournament;

export const Leaf = React.memo(
  ({
    id,
    type,
    grade,
    class: classNum,
    direction,
  }: // isWinner,
  ClassmatchClass & {
    id: string;
    direction: "ltr" | "rtl";
    isWinner: boolean;
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

    return (
      <div
        className="flex shrink-0 gap-2 self-stretch py-1"
        style={{ flexDirection: direction === "ltr" ? "row" : "row-reverse" }}
      >
        <TournamentPopover id={id}>
          <button
            className={clsx(
              "shrink-0 rounded-lg bg-blue-400 px-2 py-0.5 text-white transition-all hover:bg-blue-300",
              {
                "border border-red-500 shadow-red-200 shadow-md":
                  `${type}-${grade}-${classNum}`.includes("?"),
              }
            )}
          >
            <span className="w-full font-mono">
              {type === "teacher" ? "職員" : `${grade}-${classNum}`}
            </span>
          </button>
        </TournamentPopover>
        <button
          className="grid size-8 shrink-0 place-content-center rounded-lg border border-blue-500 transition-all hover:bg-blue-200"
          onClick={() =>
            setTournament((prev) => ({
              ...prev,
              match: [
                {
                  ...tournamentPlaceholder,
                  id: [...id.split("-"), "0"].join("-"),
                },
                {
                  ...tournamentPlaceholder,
                  id: [...id.split("-"), "1"].join("-"),
                },
              ],
              class: undefined,
            }))
          }
        >
          <Plus size={12} />
        </button>
        <div className="relative flex min-w-12 shrink-0 grow flex-col items-center justify-center self-stretch">
          <Divider />
        </div>
      </div>
    );
  }
);
