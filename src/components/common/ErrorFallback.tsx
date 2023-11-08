import "./error-fallback.css";
import { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error }: FallbackProps) {
  return (
    <div className="error-fallback">
      <h2>エラーが発生しました</h2>
      <p>
        正しいJSONファイルを読み込んでいるか確認してください
        <br />
        JSONファイルが正しい構造になっているか確認してください
      </p>
      <pre
        style={{
          maxWidth: "100%",
          overflowX: "auto",
          padding: "0.25rem 0.5rem",
          border: "1px solid var(--border-color)",
        }}
      >
        {error.stack}
      </pre>
    </div>
  );
}
