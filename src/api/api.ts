export async function fetchPersonName(query: string, signal: AbortSignal) {
  return await fetch(`https://swapi.dev/api/people/?search=${query}`, {
    signal,
  });
}
