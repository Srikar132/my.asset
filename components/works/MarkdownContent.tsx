type MarkdownContentProps = {
  content: string;
};

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-accent">
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let code: string[] = [];
  let inCode = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(
      <p key={`p-${blocks.length}`} className="max-w-3xl text-sm leading-7 text-foreground/65 sm:text-base">
        {renderInline(paragraph.join(" "))}
      </p>
    );
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="max-w-3xl space-y-2 pl-5 text-sm leading-7 text-foreground/65 sm:text-base">
        {list.map((item, index) => (
          <li key={index} className="list-disc pl-1 marker:text-foreground/30">
            {renderInline(item)}
          </li>
        ))}
      </ul>
    );
    list = [];
  };

  const flushCode = () => {
    if (!code.length) return;
    blocks.push(
      <pre key={`pre-${blocks.length}`} className="max-w-4xl overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-4 text-xs leading-6 text-foreground/70">
        <code className="font-mono">{code.join("\n")}</code>
      </pre>
    );
    code = [];
  };

  lines.forEach((line) => {
    if (line.trim().startsWith("```") && !inCode) {
      flushParagraph();
      flushList();
      inCode = true;
      return;
    }

    if (line.trim().startsWith("```") && inCode) {
      inCode = false;
      flushCode();
      return;
    }

    if (inCode) {
      code.push(line);
      return;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      return;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <h3 key={`h3-${blocks.length}`} className="pt-8 text-xs font-medium tracking-[0.2em] text-foreground/45">
          {line.slice(4)}
        </h3>
      );
      return;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <h2 key={`h2-${blocks.length}`} className="pt-12 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {line.slice(3)}
        </h2>
      );
      return;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <h1 key={`h1-${blocks.length}`} className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {line.slice(2)}
        </h1>
      );
      return;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2));
      return;
    }

    paragraph.push(line.trim());
  });

  if (inCode) flushCode();
  flushParagraph();
  flushList();

  return <article className="space-y-4">{blocks}</article>;
}
