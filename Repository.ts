export interface RepositoryDTO {
  id: number;
  name: string;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  watchers_count: number;
  language: string;
}
