import api from '@services/Axios';
import { FilterType } from '@services/types/Filters';
import { PostSchema, PostType } from '@services/types/Posts';
import { queryOptions } from '@tanstack/react-query';

type ReturnPostType =
  | {
      type: 'success';
      data: PostType[];
    }
  | { type: 'error'; data: ErrorPostType };

type ErrorPostType = {
  title: string;
  body: string;
};

const placeholderPost: ErrorPostType = {
  title: 'Não encontrado',
  body: 'Houve algum erro com sua pesquisa',
};
const GetPostById = async (filter: FilterType): Promise<ReturnPostType> => {
  const { data } = await api.get('posts', { params: filter });
  console.log('data getpostById: ', data);
  const validatedPost = PostSchema.array().safeParse(data);
  if (!validatedPost.success) {
    return { type: 'error', data: placeholderPost };
  }
  return { type: 'success', data: validatedPost.data };
};

export function PostByUserId(filter: FilterType) {
  return queryOptions({
    queryKey: ['posts', filter],
    queryFn: () => GetPostById(filter),
  });
}
