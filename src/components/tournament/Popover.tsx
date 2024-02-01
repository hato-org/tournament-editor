import { ReactNode, useMemo } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Select } from "../ui/Select";
import gradeList from "../../consts/grade.json";
import classList from "../../consts/class.json";
import { focusAtom } from "jotai-optics";
import { focusTournament } from "../../lib/tournament";
import { OpticParams, Prism } from "optics-ts";
import { WritableAtom, SetStateAction, useAtom } from "jotai";
import { tournamentAtom } from "../../atoms/tournament";

export default function TournamentPopover({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
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

  const [tournament, setTournament] = useAtom(focusTournamentAtom);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="flex min-w-48 flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-xl"
        >
          {/* <Popover.Close /> */}
          <Popover.Arrow className="fill-white shadow-md" />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-bold">ID</span>
            <span className="ml-auto rounded-md font-mono">
              {tournament.id}
            </span>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-bold ">学年</span>
              <Select
                value={`${tournament.class?.type}-${tournament.class?.grade}`}
                onChange={(e) => {
                  const [type, grade] = e.target.value.split("-");

                  setTournament((prev) => ({
                    ...prev,
                    match: undefined,
                    class: {
                      type,
                      grade,
                      class: prev.class?.class ?? "",
                    },
                  }));
                }}
              >
                <option value="?-?" hidden>
                  未選択
                </option>
                {gradeList.map(({ type, gradeCode, name }) => (
                  <option
                    key={`${type}-${gradeCode}`}
                    value={`${type}-${gradeCode}`}
                  >
                    {name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold ">クラス</span>
              <Select
                disabled={
                  tournament.class?.type === "?" &&
                  tournament.class?.grade === "?"
                }
                value={`${tournament.class?.type}-${tournament.class?.grade}-${tournament.class?.class}`}
                onChange={(e) => {
                  const [type, grade, classCode] = e.target.value.split("-");

                  setTournament((prev) => ({
                    ...prev,
                    match: undefined,
                    class: {
                      type,
                      grade,
                      class: classCode,
                    },
                  }));
                }}
              >
                <option value="?-?-?" hidden>
                  未選択
                </option>
                {classList
                  .filter(
                    ({ type, gradeCode }) =>
                      type === tournament.class?.type &&
                      gradeCode === tournament.class.grade
                  )
                  .map(({ type, gradeCode, classCode, name }) => (
                    <option
                      key={`${type}-${gradeCode}-${classCode}`}
                      value={`${type}-${gradeCode}-${classCode}`}
                    >
                      {name}
                    </option>
                  ))}
              </Select>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
