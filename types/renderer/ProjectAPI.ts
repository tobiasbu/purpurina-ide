interface ProjectAPI {
  /**
   * Create new purpurina project
   */
  create(options: Project.Create): Promise<boolean>;
  open(project: Project.)
  on: {
    /**
     * Listens to recent projects to be loaded.
     * This occurs once.
     */
    loaded(): Promise<Project.Metadata[]>;
  };
}
