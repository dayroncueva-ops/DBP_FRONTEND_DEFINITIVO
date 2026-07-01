import api from "../api/axios";
import type { Anime } from "../types/anime";

export async function getAnimes(): Promise<Anime[]> {
  const response = await api.get<Anime[]>("/anime/list");
  return response.data;
}