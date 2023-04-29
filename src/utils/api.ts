import zod from 'zod';
import { IP, PORT } from '@env';

const URL = `http://${IP}:${PORT}/` ?? `http://localhost:${PORT}/`;

const Game = zod.object({
  id: zod.number(),
  name: zod.string(),
  posterUrl: zod.string(),
  releaseYear: zod.string(),
});

const Author = zod.object({
  id: zod.number(),
  name: zod.string(),
  avatarUrl: zod.string(),
});

const Post = zod.object({
  id: zod.number(),
  game: Game,
  author: Author,
  post: zod.string(),
});
export type Post = zod.infer<typeof Post>;
export type Author = zod.infer<typeof Author>;

const Posts = zod.array(Post);

// NOTE: debugging helper
const log = async <T>(res: T) => {
  console.log(JSON.stringify(res, null, 2));
  return res;
};

const randomize = async <T>(arr: T[]) => {
  return arr.sort(() => Math.random() - 0.5);
};

export const Api = {
  posts:
    ({ limit = 10 }) =>
    async ({ pageParam = 1 }) => {
      return fetch(URL + 'posts' + `?_page=${pageParam}?_limit=${limit}`)
        .then((res) => res.json())
        .then(Posts.parse)
        .then(randomize);
    },
  postsByAuthor:
    ({ authorId }: { authorId: number }) =>
    async () => {
      return fetch(URL + 'posts' + `?author.id=${authorId}`)
        .then((res) => res.json())
        .then(Posts.parse)
        .then(randomize);
    },
};
