/// <reference path="./render-typings.d.ts" />

import Component from 'vue-class-component';
import {ipcRenderer, shell}  from 'electron';
import {SettingsRender} from './SettingsRender';
import {SongRender} from './SongRender';
import {template} from './template';
const toastr = require('toastr');
toastr.options.positionClass = 'toast-bottom-left';
toastr.options.timeout = '60000';

@Component({
    components: {
        SettingsRender,
        SongRender
    },
    template: template('Lyricfier')
})
class LyricfierRender {
    protected ipc;
    protected currentView;
    protected liveReload = false;

    listenStatus(msg) {
        toastr.info(msg);
    }

    data() {
        return {
            menu: [
                'SongRender',
                'SettingsRender'
            ],
            ipc: ipcRenderer,
            shell: shell,
            liveReload: false,
            'currentView': 'SongRender'
        }
    }

    ready() {
        this.ipc.on('change-view', (event, page) => {
            this.changeView(page);
        });

        this.ipc.on('live-reload', (event, status) => {
            this.liveReload = status;
        });

        this.ipc.on('status', (event, msg) => {
            this.listenStatus(msg);
        });
    }

    changeView(page) {
        this.currentView = page;
    }

    isView(page) {
        return this.currentView === page;
    }
}

export = LyricfierRender;
