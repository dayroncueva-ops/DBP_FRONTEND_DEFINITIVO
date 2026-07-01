import type { Anime } from "../types/anime";

interface TablaAnimeProps {
  animes: Anime[];
}

function TablaAnime({ animes }: TablaAnimeProps) {
  return (
    <table border={1} cellPadding={10}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Imagen</th>
          <th>Título</th>
          <th>Género</th>
        </tr>
      </thead>

      <tbody>
        {animes.map((anime) => (
          <tr key={anime.id}>
            <td>{anime.id}</td>

            <td>
              <img
                src={anime.imageUrl}
                alt={anime.title}
                width={80}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/80?text=Anime";
                }}
              />
            </td>

            <td>{anime.title}</td>
            <td>{anime.genre}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaAnime;