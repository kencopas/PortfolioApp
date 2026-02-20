interface TechStackProps {
  stack: string[];
  className?: string;
  stackMode?: "vertical" | "horizontal";
  title?: string;
}

export default function TechStack({
  stack,
  className = "",
  stackMode = "vertical",
  title = "Stack",
}: TechStackProps) {
  return (
    <div className={`${className}`}>
      <b>{title}: </b>

      {/* Vertical Stack List */}
      {stackMode === "vertical" && (
        <ul className="list-disc list-inside">
          {stack.map((item, i) => (
            <li key={`${i}-${item}`}>{item}</li>
          ))}
        </ul>
      )}

      {/* Horizontal Stack List */}
      {stackMode === "horizontal" && stack.join(" • ")}
    </div>
  );
}
