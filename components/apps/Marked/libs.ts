type MarkedModule = typeof import("marked");

type DomPurifyInstance = { sanitize: (html: string) => string };

let cachedLibsPromise: Promise<{
  marked: MarkedModule["marked"];
  DOMPurify: DomPurifyInstance;
}> | null = null;

export const loadMarkedLibs = (): Promise<{
  marked: MarkedModule["marked"];
  DOMPurify: DomPurifyInstance;
}> => {
  if (!cachedLibsPromise) {
    cachedLibsPromise = Promise.all([
      import("marked"),
      import("dompurify"),
    ]).then(([markedModule, domPurifyModule]) => {
      const markedExport = (
        markedModule as unknown as {
          marked?: MarkedModule["marked"];
          default?: unknown;
        }
      ).marked as MarkedModule["marked"];

      const createDOMPurify = (
        domPurifyModule as unknown as {
          default: (window: Window) => DomPurifyInstance;
        }
      ).default;

      const DOMPurify = createDOMPurify(window);

      return { marked: markedExport, DOMPurify };
    });
  }

  return cachedLibsPromise;
};

// Preload on the client as soon as this module is imported
if (typeof window !== "undefined") {
  void loadMarkedLibs();
}
