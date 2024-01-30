import { atomWithStorage } from "jotai/utils";

export const tournamentAtom = atomWithStorage<ClassmatchSportInfo>(
  "tournament",
  {
    id: "" as ClassmatchSportId,
    name: "",
    map: "",
    losersTournament: [],
    tournament: {
      id: "0",
      participants: [],
      match: [
        {
          id: "1-0",
          participants: [],
          class: {
            type: "?",
            grade: "?",
            class: "?",
          },
          meta: {
            location: null,
            startAt: null,
            endAt: null,
          },
        },
        {
          id: "1-1",
          participants: [],
          class: {
            type: "?",
            grade: "?",
            class: "?",
          },
          meta: {
            location: null,
            startAt: null,
            endAt: null,
          },
        },
      ],
      meta: {
        location: null,
        startAt: null,
        endAt: null,
      },
    },
  }
);
