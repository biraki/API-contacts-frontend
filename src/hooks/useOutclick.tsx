import { useEffect, useRef } from "react";

export const useOutclick = (callback: (event: MouseEvent) => void) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleOutclick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };

    window.addEventListener("mousedown", handleOutclick);

    return () => {
      window.removeEventListener("mousedown", handleOutclick);
    };
  }, [callback]);

  return ref;
};