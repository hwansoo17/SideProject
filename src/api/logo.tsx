import { authApi } from "./api";

interface ISearchLogoInput {
  query: string;
  limit: number;
}

interface ILogo {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
}

interface ISearchLogoOutput {
  count: number;
  next: string;
  previous: string;
  results: ILogo[];
}

export const SearchLogoAPI = async (payload: ISearchLogoInput): Promise<ISearchLogoOutput> => {
  payload.limit = 100;
  const response = await authApi.get('/api/search-corp-logo', {params: payload});
  return response.data;
};
