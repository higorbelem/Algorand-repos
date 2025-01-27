import { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { githubOrg, githubRepo } from '@/@types/github';
import { API } from '@/services/api';
import { reposMock } from '@/constants/mocks';

const organizations: githubOrg[] = [{id: 'perawallet', name: 'Pera Wallet'}, {id: 'algorandfoundation', name: 'Algorand Foundation'}, {id: 'algorand', name: 'Algorand'}]

const MainContext = createContext<{
    orgs: githubOrg[];
    repos: githubRepo[];
    currentRepo: githubRepo | null;
    setCurrentRepository: (repository: githubRepo) => void;
    fetchRepositories: () => void;
    loading: boolean;
    favorites: string[];
    addToFavorites: (repository: githubRepo) => Promise<void>
}>({
    repos: [],
    orgs: [],
    currentRepo: null,
    setCurrentRepository: () => null,
    fetchRepositories: () => null,
    loading: false,
    favorites: [],
    addToFavorites: () => Promise.resolve(),
});

export function useMainContextProvider() {
  const value = useContext(MainContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useMainContextProvider must be wrapped in a <MainContextProvider />');
    }
  }

  return value;
}

export function MainContextProvider({ children }: PropsWithChildren) {
  const [orgs] = useState<githubOrg[]>(organizations);
  const [repos, setRepos] = useState<githubRepo[]>([]);
  const [currentRepo, setCurrentRepo] = useState<githubRepo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    getStoredRepo();
    getFavorites();
  }, []);

  const getFavorites = async () => {
    try {
      const res = await AsyncStorage.getItem('favorites');

      if(!res) return;

      setFavorites(JSON.parse(res) as string[]);
    } catch (e) {
      console.log(e);
    }
  }

  const getStoredRepo = async () => {
    try {
      const res = await AsyncStorage.getItem('repositories');

      if(!res) return;

      setRepos(JSON.parse(res) as githubRepo[]);
    } catch (e) {
      console.log(e);
    }
  }

  const fetchRepositories = async () => {
    if(await AsyncStorage.getItem('repositories')) return; // This is only beign done because the anauthed Github API rate limit is really low and this is a test app

    setLoading(true);

    let response: githubRepo[] = [];

    for (let i = 0; i < orgs.length; i++) {
      const org = orgs[i];

      const res = await API<githubRepo[]>(`/orgs/${org.id}/repos`);

      if(!res) continue;

      response = [...response, ...res]
    }

    AsyncStorage.setItem('repositories', JSON.stringify(response));
    setRepos(response);

    setLoading(false);
  }

  const addToFavorites = async (repository: githubRepo) => {
    try {
      let res = favorites;
      if(favorites.includes(repository.name)) {
        res = res.filter(item => item !== repository.name);
      } else {
        res = [...res, repository.name];
      }

      setFavorites(res);
      await AsyncStorage.setItem('favorites', JSON.stringify(res));
    } catch (e) {
      console.log(e);
    }
    
  }

  const setCurrentRepository = (repository: githubRepo) => {
    setCurrentRepo(repository);
  }

  return (
    <MainContext.Provider
      value={{
        orgs,
        repos,
        currentRepo,
        setCurrentRepository,
        fetchRepositories,
        loading,
        favorites,
        addToFavorites
      }}>
      {children}
    </MainContext.Provider>
  );
}
