const api = new ApiKey();
const alertjs = new AlertJS();

const storage = {
    delete: (key) => {
        return localStorage.removeItem(key)
    },
    set: (key, data) => {
        return localStorage.setItem(key, JSON.stringify(data));
    },
    get: (key, def = null) => {
        let local = localStorage.getItem(key);
        if (local) return JSON.parse(local);
        else return def;
    },
};

const repo = {
    setUser: (data) => {
        return storage.set('repo_user', data);
    },
    getUser: () => {
        return storage.get('repo_user');
    },
    resetUser: () => {
        return storage.delete('repo_user');
    }
};


function locStrSet(key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
}

function locStrGet(key, def = null) {
    let local = localStorage.getItem(key);
    if (local != null) return JSON.parse(local);
    else return def;
}

function getApiKey() {
    return 'k_qwa0nu1j';
}

function getLanguage() {
    return 'k_qwa0nu1j';
}


