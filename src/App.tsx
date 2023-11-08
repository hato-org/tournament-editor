import { useRef, useState } from "react";
import "./App.css";
import { Section } from "./components/tournament/Section";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tournament, setTournament] = useState<
    ClassmatchSportInfo | undefined
  >();

  console.log(tournament);

  return (
    <div className="container">
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
      <button onClick={() => inputRef.current?.click()}>JSONを読み込む</button>
      {tournament && (
        <Section direction="ltr" isWinner {...tournament.tournament} />
      )}
    </div>
  );
}

export default App;
