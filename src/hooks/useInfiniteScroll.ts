import { useEffect } from 'react';

export default function useInfiniteScroll(
  callback: () => void,
  hasNextPage: boolean | undefined
) {
  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: Event) => {
      const document = event.currentTarget as Document;
      if (!document.scrollingElement) return;
      const { scrollHeight, scrollTop, clientHeight } =
        document.scrollingElement;
      if (
        !fetching &&
        scrollHeight - scrollTop <= clientHeight * 1.5 &&
        hasNextPage
      ) {
        fetching = true;
        await callback();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [hasNextPage]);
}
