import { DockPanel } from '@phosphor/widgets';



export default function (host: HTMLElement, overlay: DockPanel.IOverlay) {
  // const dragControllerElement = hyper.wire()`<div id="drag-drop-controller"/>`  // this.workspaceElement.children[0];
  // Assign drag & drop events
  host.ondrop = (event) => {
    event.preventDefault();

    const dataTransfer = event.dataTransfer;
    let filesToImport: ImportData.File[] = [];

    if (event.dataTransfer.items) {
      for (let i = 0; i < dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (dataTransfer.items[i].kind === 'file') {
          let file = dataTransfer.items[i].getAsFile();
          filesToImport.push({
            lastModified: file.lastModified,
            path: file.path,
            size: file.size,
            type: file.type
          });
        }
      }
    } else {
      const files = dataTransfer.files;
      const len = files.length;
      for (var i = 0; i < len; i++) {
        const file = files[i];
        filesToImport.push({
          lastModified: file.lastModified,
          path: file.path,
          size: file.size,
          type: file.type
        });
      }
    }

    if (filesToImport.length > 0) {
      window.assets.import(filesToImport);
    }

    if (host.className === 'is-dragover') {
      host.classList.remove('is-dragover');
      overlay.hide(0);
    }
  };

  host.addEventListener('dragover', (event) => {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, false);


  host.addEventListener('dragenter', (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (host.className !== 'is-dragover') {
      host.classList.add('is-dragover');
      overlay.show({ top: 0, left: 0, right: 0, bottom: 0 });
    }
  }, false);

  host.addEventListener('dragleave', (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (!host.contains(event.relatedTarget as Node)) {
      if (host.className === 'is-dragover') {
        host.classList.remove('is-dragover');
        overlay.hide(0);
      }
    }
  }, false);
}
