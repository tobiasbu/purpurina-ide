interface DialogsAPI {
  /**
   * Open directory dialog.
   * @returns
   * `false` if the dialog was cancelled
   * `string` the selected path
   */
  openDirectory(
    options?: DialogsOptionsAPI.OpenDirectory
  ): Promise<string | undefined | false>;
}
