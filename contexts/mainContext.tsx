import { useContext, createContext, type PropsWithChildren, useState } from 'react';

import { githubOrg, githubRepo } from '@/@types/github';
import { reposMock } from '@/constants/mocks';

const organizations: githubOrg[] = [{id: 'perawallet', name: 'Pera Wallet'}, {id: 'algorandfoundation', name: 'Algorand Foundation'}, {id: 'algorand', name: 'Algorand'}]

const MainContext = createContext<{
    orgs: githubOrg[];
    repos: githubRepo[];
    currentRepo: githubRepo | null;
    setCurrentRepository: (repository: githubRepo) => void;
}>({
    repos: [],
    orgs: [],
    currentRepo: null,
    setCurrentRepository: () => null
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
  const [orgs, setOrgs] = useState<githubOrg[]>(organizations);
  const [repos, setRepos] = useState<githubRepo[]>(reposMock);
  const [currentRepo, setCurrentRepo] = useState<githubRepo | null>(null);

  const setCurrentRepository = (repository: githubRepo) => {
    setCurrentRepo(repository)
  }

  return (
    <MainContext.Provider
      value={{
        orgs,
        repos,
        currentRepo,
        setCurrentRepository
      }}>
      {children}
    </MainContext.Provider>
  );
}
