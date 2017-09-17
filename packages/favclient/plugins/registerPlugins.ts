import { registerPlugin } from './FavPlugIn';
import { getPlugin as getGooglePlugin } from './Google/Google';
import { getPlugin as getBaiduPlugin } from './Baidu/Baidu';

function registerPlugins() {
    registerPlugin(getGooglePlugin());
    registerPlugin(getBaiduPlugin());
}

export default registerPlugins;
