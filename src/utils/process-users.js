export const sortByAge = (a, b) => a.age - b.age;

export const sortAscend = (config) => (a, b) => a[config.field] - b[config.field];

export const sortDescend = (config) => (a, b) => b[config.field] - a[config.field];

export const convert = (keys) => keys.reduce((a, c) => {
    a[c] = 1;

    return a;
}, {});

export const findSelectedUsers = (users, keys, sortConfig) => {
    const store = convert(keys);

    if (!sortConfig) {
        return users
            .map((user, idx) => ({ ...user, row: idx + 1}))
            .filter((user) => store[user.key]);
    } else if (sortConfig.order === 'ascend') {
        return users
            .slice()
            .sort(sortAscend(sortConfig))
            .map((user, idx) => ({ ...user, row: idx + 1}))
            .filter((user) => store[user.key]);
    } else if (sortConfig.order === 'descend') {
        return users
            .slice()
            .sort(sortDescend(sortConfig))
            .map((user, idx) => ({ ...user, row: idx + 1}))
            .filter((user) => store[user.key]);
    }
};
