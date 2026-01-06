import { Address } from '@suleigolden/the-last-spelling-bee-api-client';

export const fullAddress = (address: Address): string => {
  if (typeof address === 'string') {
    return address;
  }

  const { street, city, state, postal_code, country } = address;
  return [street, city, state, postal_code, country]
    .filter((part) => part)
    .join(', ');
};
