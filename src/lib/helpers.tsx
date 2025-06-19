export function parseBoldUnderline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*[^*]+\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      const clean = part.slice(1, -1);
      return (
        <span key={index} className="font-semibold underline">
          {clean}
        </span>
      );
    }
    return part;
  });
}
