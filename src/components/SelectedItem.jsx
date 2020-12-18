import React from 'react';

export const SelectedItem = ({ user }) =>
    <div className="selected-item">Строка {user.row}, пользователь {user.name}</div>;