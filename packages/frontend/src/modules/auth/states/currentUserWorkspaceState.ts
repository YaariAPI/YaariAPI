import { UserWorkspace } from 'src/generated/graphql';
import { createState } from 'src/utils/createState';

export type CurrentUserWorkspace = Pick<
  UserWorkspace, 'id' | 'name'
>;

export const currentUserWorkspaceState =
  createState<CurrentUserWorkspace | null>({
    key: 'currentUserWorkspaceState',
    defaultValue: null,
  });
