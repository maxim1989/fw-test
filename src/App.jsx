import React from 'react';
import { connect } from 'react-redux';

import { Table } from 'antd';

import { saveUsers } from './__data__/actions';
import { selectUsers } from './__data__/selectors';
import { findSelectedUsers, sortByAge } from './utils/process-users';
import { SelectedItem } from './components/SelectedItem';

import 'antd/dist/antd.css';
import './App.css';

const columns = [
    { dataIndex: 'surname', title: 'Surname' },
    { dataIndex: 'name', title: 'Name' },
    { dataIndex: 'age', title: 'Age', sorter: sortByAge }
];

export const App = ({ users, saveUsers }) => {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [sortConfig, setSortConfig] = React.useState();
    const handleSelectedRowKeys = React.useCallback((keys) => {
        setSelectedRowKeys(keys);
    }, []);
    const handleChange = React.useCallback((_pagination, _filters, sorter) => {
        const { field, order } = sorter;

        if (field && order) {
            setSortConfig({ field, order });
        } else if (sortConfig && field && !order) {
            setSortConfig(null);
        }
    }, [sortConfig]);
    const rowSelection = {
        selectedRowKeys,
        onChange: handleSelectedRowKeys,
    };

    React.useEffect(() => {
        fetch('/api/people')
            .then((response) => response.json())
            .then((data) => {
                if (data.users.length) {
                    saveUsers(data.users.map((user) => ({ ...user, key: user.id })));
                }
            })
            .catch(console.error)
    }, []);

    return (
        <div className="app">
            <div className="table">
                <Table
                    columns={columns}
                    dataSource={users}
                    rowSelection={rowSelection}
                    pagination={{
                        pageSize: 2
                    }}
                    onChange={handleChange}
                />
            </div>
            <div className="selected">
                {findSelectedUsers(users, selectedRowKeys, sortConfig).map((user) => <SelectedItem user={user} key={user.key} />)}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    users: selectUsers(state)
});

const mapDispatchToProps = {
    saveUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App);