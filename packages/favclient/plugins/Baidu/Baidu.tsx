import * as React from 'react';
import FavPlugIn from '../FavPlugIn';

let styles = require('favclient/favclient.scss');

interface BaiduState {
    search: string;
}

class Baidu extends React.Component<any, BaiduState> {
    private baiduInput: HTMLInputElement;

    constructor(props: any) {
        super(props);
        this.state = {
            search: '',
        };
    }

    render() {
        return (
            <div className={styles.tableDiv}>
                <div className={styles.trDiv}>
                    <div className={styles.tdDiv + styles.baiduLogo}>
                        <a href="http://www.baidu.com/">
                            <img src="/resource/baidu.png" width="80" />
                        </a>
                    </div>
                    <div className={styles.tdDiv}>
                        <input
                            type="text"
                            ref={ref => (this.baiduInput = ref)}
                            value={this.state.search}
                            className={styles.tableInput}
                            onInput={this.updateSearch}
                            onKeyPress={this.onKeyPress}
                        />
                    </div>
                    <div className={styles.tdDiv}>
                        <button className={styles.modalDialogButton} onClick={this.doSearch}>
                            搜索
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    private updateSearch = () => {
        this.setState({
            search: this.baiduInput.value,
        });
    };

    private onKeyPress = (ev: React.KeyboardEvent<EventTarget>) => {
        if (ev.which == 13) {
            this.doSearch();
        }
    };

    private doSearch = () => {
        let search = this.state.search;

        if (search) {
            this.setState({
                search: '',
            });
            window.location.href = 'http://www.baidu.com/s?wd=' + encodeURI(search);
        }
    };
}

function getPlugin(): FavPlugIn {
    return {
        pluginId: '{EB3A535C-96E1-4B0E-8414-308E5CAAA39F}',
        displayName: '百度',
        getBody: () => <Baidu />,
        logoUrl: 'resource/baidu.png',
        url: 'http://www.baidu.com/',
    };
}

export { getPlugin };
