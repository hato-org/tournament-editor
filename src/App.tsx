import { useRef } from "react";
import { Section } from "./components/tournament/Section";
import { useAtom } from "jotai";
import { tournamentAtom } from "./atoms/tournament";
import { Download, Upload } from "lucide-react";
import { Select } from "./components/ui/Select";
import sports from "./consts/sports.json";
import locations from "./consts/locations.json";
import clsx from "clsx";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tournament, setTournament] = useAtom(tournamentAtom);

  const tournamentBlob = new Blob([JSON.stringify(tournament)], {
    type: "application/json",
  });
  const tournamentFileUrl = URL.createObjectURL(tournamentBlob);

  return (
    <div className="container mx-auto flex min-h-dvh w-full max-w-screen-md flex-col gap-8 px-4 py-8">
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="application/json"
        onChange={async (e) => {
          setTournament(
            JSON.parse((await e.target.files?.item(0)?.text()) ?? "")
          );
        }}
      />
      <div className="flex gap-4 font-bold max-md:flex-col">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-400 p-4 text-white transition-all hover:bg-blue-300"
          onClick={() => inputRef.current?.click()}
        >
          <Download size={20} />
          JSONを読み込む
        </button>
        <a
          href={tournamentFileUrl}
          download={`${tournament.id}.json`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-400 p-4 text-white transition-all hover:bg-blue-300"
        >
          <Upload size={20} />
          JSONをエクスポート
        </a>
      </div>
      <div className="flex gap-4 font-bold max-md:flex-col">
        <Select
          className={clsx("w-full font-bold", {
            "border border-red-500 shadow-red-200 shadow-md": !tournament.id,
          })}
          value={`${tournament.id}-${tournament.name}`}
          onChange={(e) => {
            const [id, name] = e.target.value.split("-") as [
              ClassmatchSportId,
              string
            ];
            setTournament((prev) => ({
              ...prev,
              id,
              name,
            }));
          }}
        >
          <option hidden value="-">
            種目を選択
          </option>
          {sports.map(({ id, name }) => (
            <option key={id} value={`${id}-${name}`}>{name}</option>
          ))}
        </Select>
        <Select
          className={clsx("w-full font-bold", {
            "border border-red-500 shadow-red-200 shadow-md": !tournament.map,
          })}
          value={tournament.map}
          onChange={(e) =>
            setTournament((prev) => ({
              ...prev,
              map: e.target.value,
            }))
          }
        >
          <option hidden value="">
            場所を選択
          </option>
          {locations.map(({ id, name }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </Select>
      </div>
      <div className="w-full overflow-x-auto rounded-lg border bg-gray-100 p-4">
        <div className="w-fit">
          <Section direction="ltr" isWinner {...tournament.tournament} />
        </div>
      </div>
    </div>
  );
}

export default App;
