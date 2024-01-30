import { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error }: FallbackProps) {
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
    </div>
  );
}
