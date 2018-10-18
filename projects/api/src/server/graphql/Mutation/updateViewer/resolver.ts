import { types, users } from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { Resolver, Root } from '../../../types';
import { validateNonNull } from '../../validations';

export type ResolveUpdateViewerArgs = Readonly<{
  input: Readonly<{
    username: types.Undefinable<types.Nullable<string>>;
  }>;
}>;

export const resolveUpdateViewer: Resolver<
  Root,
  ResolveUpdateViewerArgs,
  users.User
> = async (root, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  validateInputArguments(args.input);

  const updatedViewer = await users.updateUser(viewer, args.input as any);

  return updatedViewer;
};

function validateInputArguments(input: ResolveUpdateViewerArgs['input']): void {
  validateNonNull(['username'], input);
}

export default resolveUpdateViewer;
