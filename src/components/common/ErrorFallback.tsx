import { useResetAtom } from "jotai/utils";
import { Loader } from "lucide-react";
import { FallbackProps } from "react-error-boundary";
import { tournamentAtom } from "../../atoms/tournament";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const resetTournament = useResetAtom(tournamentAtom);

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 overflow-y-auto p-4">
      <h2 className="text-2xl font-bold">エラーが発生しました</h2>
      <p className="text-center text-sm">
        正しいJSONファイルを読み込んでいるか確認してください
        <br />
        JSONファイルが正しい構造になっているか確認してください
      </p>
      <pre className="max-w-full overflow-x-auto rounded-xl border bg-gray-100 p-4">
        {error.stack}
      </pre>
      <button
        className="flex items-center gap-2 rounded-xl bg-blue-400 px-6 py-4 font-bold text-white"
        onClick={() => {
          resetTournament();
          resetErrorBoundary();
        }}
      >
        <Loader />
        リセット
      </button>
    </div>
  );
}
