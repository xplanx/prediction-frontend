'use client';

import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import { ReactNode } from 'react';

export function ApolloProvider({ children }: { children: ReactNode }) {
  if (!apolloClient) {
    throw new Error('Apollo Client is not initialized');
  }

  return (
    <BaseApolloProvider client={apolloClient}>
      {children}
    </BaseApolloProvider>
  );
} 