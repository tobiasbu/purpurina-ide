interface DialogsApi {
  /**
   * Open directory dialog.
   * @returns
   * `false` if the dialog was cancelled
   * `string` the selected path
   */
  openDirectory(
    options?: Dialogs.Options.OpenDirectory
  ): Promise<string | undefined | false>;
}
