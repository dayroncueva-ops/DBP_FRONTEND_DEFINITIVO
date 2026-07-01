import { useEffect, useState } from "react";
import axios from "axios";
import TablaAnime from "../components/TablaAnime";
import { getAnimes } from "../services/animeService";
import type { Anime } from "../types/anime";

interface ErrorResponse {
  message?: string;
  error?: string;
}

function AnimePage() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnimes() {
      try {
        const data = await getAnimes();
        setAnimes(data);
      } catch (error) {
        if (axios.isAxiosError<ErrorResponse>(error)) {
          setError(
            error.response?.data.message ??
              error.response?.data.error ??
              "No se pudieron cargar los animes."
          );
        } else {
          setError("Ocurrió un error inesperado.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadAnimes();
  }, []);

  if (loading) return <p>Cargando animes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>Animes</h1>
      <TablaAnime animes={animes} />
    </main>
  );
}

export default AnimePage;