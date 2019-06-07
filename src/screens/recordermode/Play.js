import React from 'react';
import PropTypes from 'prop-types';

import {
    ListView
} from 'react-native';

import FileItem from './FileItem';

export default class Play extends React.Component {

    static propTypes = {
        fileList: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        if(this.props.fileList){
            this.state = {
                dataSource: ds.cloneWithRows(this.props.fileList)
            };
        }
        else{
            this.state = {
                dataSource: ds.cloneWithRows([])
            };
        }
        
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => {
                    return <FileItem filename={rowData} />;
                }}
            />
        );
    }
}