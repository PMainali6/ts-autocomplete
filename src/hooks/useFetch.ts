/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { fetchPersonName } from "../api/api";
import { debounce } from "../utils/debounce";

export const useFetch = (
  query: string,
  debounceWait: number,
  autoComplete: boolean
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchApiData = useCallback(
    debounce(async (query: string, signal: AbortSignal) => {
      try {
        const res = await fetchPersonName(query, signal);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setData(data.results);
      } catch (e: any) {
        console.error(e);
        setError(e);
      }
    }, debounceWait),
    []
  );

  useEffect(() => {
    if (!query || !autoComplete) {
      setData(null);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    fetchApiData(query, signal);
  }, [query, fetchApiData, autoComplete]);

  return [data, setData, error];
};
