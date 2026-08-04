export type HeadingItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

type HeadingIdGenerator = {
  getId(text: string): string;
};

export function createHeadingIdGenerator(): HeadingIdGenerator {
  const counts = new Map<string, number>();

  return {
    getId(text: string) {
      const slug = normalizeHeadingText(text)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const count = counts.get(slug) ?? 0;
      counts.set(slug, count + 1);
      return count === 0 ? slug : `${slug}-${count + 1}`;
    },
  };
}

function normalizeHeadingText(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export function extractHeadingsFromSource(content: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const idGenerator = createHeadingIdGenerator();
  const lines = content.split(/\r?\n/);
  let inCodeFence = false;
  let fenceMarker = "";

  for (const line of lines) {
    const fenceMatch = line.match(/^(```|~~~)/);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!inCodeFence) {
        inCodeFence = true;
        fenceMarker = marker;
        continue;
      }

      if (marker === fenceMarker) {
        inCodeFence = false;
        fenceMarker = "";
      }

      continue;
    }

    if (inCodeFence) {
      continue;
    }

    const match = line.match(/^\s*(#{2,3})\s+(.*?)\s*(?:#+\s*)?$/);
    if (!match) {
      continue;
    }

    const level = match[1].length as 2 | 3;
    const title = normalizeHeadingText(match[2].trim());

    if (!title) {
      continue;
    }

    headings.push({
      id: idGenerator.getId(title),
      title,
      level,
    });
  }

  return headings;
}
