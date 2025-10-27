import { basename } from "path";
import { useCallback, useEffect } from "react";
import { type ContainerHookProps } from "components/system/Apps/AppContainer";
import useTitle from "components/system/Window/useTitle";
import { useFileSystem } from "contexts/fileSystem";
import { useProcesses } from "contexts/process";
import { useLinkHandler } from "hooks/useLinkHandler";
import { loadMarkedLibs } from "components/apps/Marked/libs";

export type MarkedOptions = {
  headerIds: boolean;
  mangle: boolean;
};

const useMarked = ({
  containerRef,
  id,
  loading,
  setLoading,
  url,
}: ContainerHookProps): void => {
  const { readFile } = useFileSystem();
  const { prependFileToTitle } = useTitle(id);
  const { processes: { [id]: { libs = [] } = {} } = {} } = useProcesses();
  const openLink = useLinkHandler();
  const getContainer = useCallback(
    (): HTMLElement | null =>
      containerRef.current?.querySelector("article") as HTMLElement,
    [containerRef]
  );
  const loadFile = useCallback(async () => {
    const markdownFile = await readFile(url);
    const markdownText = markdownFile.toString();
    const container = getContainer();

    if (container instanceof HTMLElement) {
      container.classList.remove("drop");

      try {
        const { marked, DOMPurify } = await loadMarkedLibs();
        container.innerHTML = DOMPurify.sanitize(
          marked.parse(markdownText, {
            headerIds: false,
            mangle: false,
          }) as unknown as string
        );
        container
          .querySelectorAll("a")
          .forEach((link) =>
            link.addEventListener("click", (event) =>
              openLink(
                event,
                link.href || "",
                link.pathname,
                link.textContent || ""
              )
            )
          );
      } catch {
        // Fallback: show raw markdown if dynamic imports fail
        container.textContent = markdownText;
      }

      container.scrollTop = 0;
    }

    prependFileToTitle(basename(url));
  }, [getContainer, openLink, prependFileToTitle, readFile, url]);

  useEffect(() => {
    if (loading) setLoading(false);
    // Preload libs for faster first render
    void loadMarkedLibs();
  }, [loading, setLoading]);

  useEffect(() => {
    if (!loading) {
      if (url) loadFile();
      else getContainer()?.classList.add("drop");
    }
  }, [getContainer, loadFile, loading, url]);
};

export default useMarked;
