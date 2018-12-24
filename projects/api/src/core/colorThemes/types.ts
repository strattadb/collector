import { ID, Identifiable, Timestamps } from '../types';

export type ColorTheme = Readonly<{
  name: string;
  authorId: ID | null;
  colors: Colors;
}> &
  Identifiable &
  Timestamps;

export type Colors = Readonly<{}>;
