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
  if (stackMode == "vertical") {
    return (
      <div className={`${className}`}>
        <b>{title}:</b>
        <ul className="list-disc list-inside">
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <span className={`${className}`}>
        <b>{title}: </b>
        {stack.join(" • ")}
      </span>
    );
  }
}
