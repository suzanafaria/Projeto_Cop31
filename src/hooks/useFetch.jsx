import { useState, useEffect } from "react";

export default function useFetch(url, options = {}) {
  const cacheKey = options.cacheKey || url;

  const [data, setData] = useState(() => {
    const cached = localStorage.getItem(cacheKey);
    return cached ? JSON.parse(cached) : null;
  });

  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);

      try {
        const res = await fetch(url);

        if (!res.ok) throw new Error("Erro ao buscar dados da API");

        const json = await res.json();
        if (cancelled) return;

        setData(json);
        localStorage.setItem(cacheKey, JSON.stringify(json));
        setError(null);
      } catch (err) {
        console.error("Erro no useFetch:", err);

        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          setData(JSON.parse(cached));
          setError("Falha na API — usando cache.");
        } else {
          setError("API indisponível e sem cache.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (!data) fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}
