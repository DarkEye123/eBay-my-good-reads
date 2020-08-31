import { useEffect, useState } from 'react';

function useTextOverflow(ref: React.RefObject<HTMLElement>) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  useEffect(() => {
    if (ref.current) {
      const el = ref.current;
      setIsOverflowing(el.clientHeight < el.scrollHeight);
    }
  }, [ref]);
  return isOverflowing;
}

export default useTextOverflow;
