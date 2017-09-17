import Group from '../store/schema/Group';

interface FavPlugIn {
    pluginId: string;
    displayName: string;
    getBody: () => JSX.Element;
    logoUrl: string;
    url?: string;
}

export default FavPlugIn;

let plugins: FavPlugIn[] = [];

function getPlugIn(group: Group): FavPlugIn {
    if (group) {
        for (let i = 0; i < plugins.length; i++) {
            if (plugins[i].pluginId == group.displayName) {
                return plugins[i];
            }
        }
    }

    return null;
}

export { getPlugIn };

function getPlugins(): FavPlugIn[] {
    return plugins;
}

export { getPlugins };

function registerPlugin(plugin: FavPlugIn) {
    plugins.push(plugin);
}

export { registerPlugin };
