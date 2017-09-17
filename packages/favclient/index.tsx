import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Modules, { VersionInfo } from 'client/titleBar/Module';
import TitleBar from 'client/titleBar/TitleBar';
import registerPlugins from './plugins/registerPlugins';
import FavPane from './components/FavPane';
import FavDialogs from './components/FavDialogs';
import AddFav from './components/AddFav';
import Group from './store/schema/Group';
import setDataFromServer from './actions/setDataFromServer';
import openAllSelections from './actions/openAllSelections';
import showGroupDialog from './actions/dialog/showGroupDialog';

let pageType = (window as any)['pageType'];
let container = document.getElementById('container');
registerPlugins();
setDataFromServer((window as any)['groups'] as Group[]);

if (pageType == 'index') {
    ReactDOM.render(
        <div>
            <TitleBar
                modules={(window as any)['modules'] as Modules}
                versionInfo={(window as any)['versionInfo'] as VersionInfo}
                buttons={[
                    {
                        text: '添加组或插件',
                        onClick: () => {
                            showGroupDialog(null);
                        },
                    },
                    {
                        text: '打开全部选中的收藏',
                        onClick: openAllSelections,
                    },
                ]}
            />
            <FavPane />
            <FavDialogs />
        </div>,
        container
    );
} else if (pageType == 'addFav') {
    ReactDOM.render(<AddFav />, container);
}
