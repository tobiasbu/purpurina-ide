import { ProjectInfo } from '@shared/types';

// export enum MenuRoute {
//   Projects,
//   Learn,
// }

export interface IProjectContainer {
  readonly info: ProjectInfo;
  setSelection(flag: boolean): void;
}

export interface IRecentProjectsPage {
  selectProject(project: IProjectContainer): void;
}

export type MouseCallback = (event: MouseEvent) => void;
