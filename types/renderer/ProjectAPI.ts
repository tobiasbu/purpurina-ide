interface ProjectAPI {
  /**
   * Create new purpurina project
   */
  create(options: Project.Create): Promise<boolean>;
  /**
   * Open purpurina by given path.
   * @param projectPath Project path
   */
  open(projectPath: string): void;
  on: {
    /**
     * Listens to recent projects to be loaded.
     * This occurs once.
     */
    loaded(): Promise<Project.Metadata[]>;
  };
}
