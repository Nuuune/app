import React from 'react';

const initialStore = {
    user: null
};

const store = React.createContext(initialStore);

export default store;