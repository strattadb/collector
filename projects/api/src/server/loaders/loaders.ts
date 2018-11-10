import { makeChannelByIdLoader } from './channels';
import { makeMessageByIdLoader } from './messages';
import {
  makeUserByEmailLoader,
  makeUserByIdLoader,
  makeUserByUniqueUsernameLoader,
} from './users';
import { makeWorkspaceByIdLoader } from './workspaces';

export function makeLoaders() {
  const loaders = {
    userById: makeUserByIdLoader(),
    userByEmail: makeUserByEmailLoader(),
    userByUniqueUsername: makeUserByUniqueUsernameLoader(),
    workspaceById: makeWorkspaceByIdLoader(),
    channelById: makeChannelByIdLoader(),
    messageById: makeMessageByIdLoader(),
  };

  return loaders;
}

export type Loaders = ReturnType<typeof makeLoaders>;