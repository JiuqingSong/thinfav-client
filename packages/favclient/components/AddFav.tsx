import * as React from 'react';
import Group from '../store/schema/Group';
import Item from '../store/schema/Item';
import favStore from '../store/favStore';
import { getPlugIn } from '../plugins/FavPlugIn';
import addGroup from '../actions/group/addGroup'
import addItem from '../actions/item/addItem';

function getQueryString(key: string): string
{
    let search = window.location.search;
    let result = "";
    search = search.substr(1);
    search.split('&').forEach(str => {
        if (str.indexOf(key + '=') == 0) {
            result = str.substr(key.length + 1);
        }
    });

    return (window as any)["unescape"](result);
}

function getAllGroups(): Group[] {
    return favStore.groups[0].concat(favStore.groups[1]).concat(favStore.groups[2]);
}

export interface AddFavState {
    title: string;
    url: string;
    group: Group;
    newGroupName: string;
}

class AddFav extends React.Component<{}, AddFavState> {
    private title: HTMLInputElement;
    private url: HTMLInputElement;
    private group: HTMLSelectElement;
    private groupName: HTMLInputElement;

    constructor(props: {}) {
        super(props);
        this.state = {
            title: getQueryString('title'),
            url: getQueryString('url'),
            group: null,
            newGroupName: '未命名组',
        };
    }

    render() {
        let allGroups = getAllGroups();
        return (
            <div>
                <div className="addFavTitle">添加收藏</div>
                <div className="addFavBody">
                    <div className="trDiv">
                        <div className="tdDiv">标题：</div>
                        <div className="tdDiv"><input type="text" ref={ref => this.title = ref} value={this.state.title} onChange={this.onInputChange} /></div>
                    </div>
                    <div className="trDiv">
                        <div className="tdDiv">地址：</div>
                        <div className="tdDiv"><input type="text" ref={ref => this.url = ref} value={this.state.url} onChange={this.onInputChange} /></div>
                    </div>
                    <div className="trDiv">
                        <div className="tdDiv">组：</div>
                        <div className="tdDiv">
                            <select ref={ref => this.group = ref} onChange={this.onInputChange}>
                                <option value="">添加新组</option>
                                {                                    
                                    allGroups.map(this.renderGroupOption)
                                }
                            </select>
                        </div>
                    </div>
                    {
                        !this.state.group &&
                        <div className="trDiv">
                            <div className="tdDiv">组名：</div>
                            <div className="tdDiv"><input type="text" ref={ref => this.groupName = ref} value={this.state.newGroupName} onChange={this.onInputChange} /></div>
                        </div>
                    }
                </div>
                <div className="addFavButtonRow"><button onClick={this.save}>确定</button></div>
            </div>);
    }

    private renderGroupOption = (group: Group) => {
        let plugIn = getPlugIn(group);

        return plugIn ? null : <option value={group.id}>{group.displayName}</option>;
    }

    private onInputChange = () => {
        let groupId = this.group.value;
        let currentGroup = null;
        getAllGroups().forEach(group => (group.id == groupId) && (currentGroup = group));
        this.setState({
            title: this.title.value,
            url: this.url.value,
            group: currentGroup,
            newGroupName: this.groupName ? this.groupName.value : this.state.newGroupName,
        });
    }

    private save = () => {
        let title = this.state.title.trim();
        let url = this.state.url.trim();
        let group: Group = this.state.group;

        if (!title || !url) {
            return;
        }

        if (url.indexOf('://') < 0) {
            url = 'http://' + url;
        }

        if (!group) {
            let groupName = this.state.newGroupName.trim();

            if (!groupName) {
                return;
            }

            group = addGroup(groupName, false);
        }

        addItem(group, title, url, window.close);
    }
}

export default AddFav;