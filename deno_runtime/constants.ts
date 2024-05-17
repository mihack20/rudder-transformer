export const EventType = {
  PAGE: 'page',
  SCREEN: 'screen',
  TRACK: 'track',
  IDENTIFY: 'identify',
  ALIAS: 'alias',
  GROUP: 'group',
  RESET: 'reset',
  RECORD: 'record',
};

export const Address = {
  city: 'address.city',
  country: 'address.country',
  postalCode: 'address.postalCode',
  state: 'address.state',
  street: 'address.street',
};

export const TraitsMapping = {
  address: Address,
};

export const SpecedTraits = ['address'];

export const WhiteListedTraits = [
  'email',
  'firstName',
  'firstname',
  'first_name',
  'lastName',
  'lastname',
  'last_name',
  'phone',
  'title',
  'organization',
  'city',
  'region',
  'country',
  'zip',
  'image',
  'timezone',
  'id',
  'anonymousId',
  'userId',
  'properties',
];

export const MappedToDestinationKey = 'context.mappedToDestination';

export const GENERIC_TRUE_VALUES = ['true', 'True', 'TRUE', 't', 'T', '1'];
export const GENERIC_FALSE_VALUES = ['false', 'False', 'FALSE', 'f', 'F', '0'];

export const HTTP_CUSTOM_STATUS_CODES = {
  FILTERED: 298,
};
