import { useContext, createContext, type PropsWithChildren, useState } from 'react';

import { githubOrg, githubRepo } from '@/@types/github';
import { reposMock } from '@/constants/mocks';

const organizations: githubOrg[] = [{id: 'perawallet', name: 'Pera Wallet'}, {id: 'algorandfoundation', name: 'Algorand Foundation'}, {id: 'algorand', name: 'Algorand'}]

const MainContext = createContext<{
    orgs: githubOrg[];
    repos: githubRepo[];
}>({
    repos: [],
    orgs: []
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

  return (
    <MainContext.Provider
      value={{
        orgs,
        repos,
      }}>
      {children}
    </MainContext.Provider>
  );
}
