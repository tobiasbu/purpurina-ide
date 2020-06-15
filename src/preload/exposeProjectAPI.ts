import { ipcRenderer } from 'electron';
import expose from './expose';
export default function exposeProjectAPI() {
  expose('project', {
    create: function (options: Project.Create) {
      ipcRenderer.send('@project/create', options);
    },
    open: function () {
      ipcRenderer.send('@project/open');
    },
    on: {
      loaded: async function () {
        return new Promise((resolve) => {
          ipcRenderer.once(
            '@project/loaded',
            (event: Electron.Event, projectsList: Project.Metadata[]) => {
              resolve(projectsList);
            }
          );
        });
      },
    },
  });
}
