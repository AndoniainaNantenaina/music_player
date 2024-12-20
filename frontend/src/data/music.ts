interface Music {
  id: number;
  path: string;
  name: string;
  tag: Tag;
  album_cover: string;
}

interface Tag {
  title: string;
  artist: string;
  album: string;
  date: string;
  duration: number;
}

export type { Music, Tag };
