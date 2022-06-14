class ApiKey {
    constructor() {
        const api = [
            {
                key: "k_qwa0nu1j",
                username: "iseplutpi.web",
                status: true,
                default: true
            },
            {
                key: "k_o9752t66",
                username: "iseplutpinur",
                status: true,
                default: true
            },
            {
                key: "k_4n86pqej",
                username: "bootloop209",
                status: true,
                default: true
            },
            {
                key: "k_k35pn2f3",
                username: "ailatifah1612",
                status: true,
                default: true
            },
            {
                key: "k_2wdhg22d",
                username: "iseplutpi1008",
                status: true,
                default: true
            },
            {
                key: "k_nkpawkpd",
                username: "lutpinurisep",
                status: true,
                default: true
            }
        ];

        this.api_default = api;

        const get_local = localStorage.getItem(this.#key());
        if (get_local === null) {
            this.api = api;
            localStorage.setItem(this.#key(), JSON.stringify(this.api));
        } else {
            this.api = JSON.parse(get_local);
        }
    }

    get() {
        return this.api.find(api => api.status);
    }

    set(key, key_new, username, status) {
        if (key != key_new) {
            let key_new_check = this.api.find(api => api.key === key_new);
            if (key_new_check) return false;
        }

        let api = this.api.find(api => api.key === key);
        if (api) {
            api.key = key_new;
            api.status = status;
            api.username = username;
            this.#refresStorage();
            return true;
        } else {
            return false;
        }
    }

    getAll() {
        return this.api;
    }

    add(key, username, status) {
        if (this.api.find(api => api.key === key)) {
            return false;
        }
        this.api.push({ key: key, status: status, username: username });
        this.#refresStorage();
        return true;
    }

    delete(key) {
        this.api = this.api.filter(api => api.key !== key);
        this.#refresStorage();
        return this.api;
    }

    reset() {
        localStorage.removeItem(this.#key());
        this.api = this.api_default;
        this.#refresStorage();
        return this.api;
    }

    #key() {
        return 'api_key';
    }

    #refresStorage() {
        localStorage.setItem(this.#key(), JSON.stringify(this.api));
    }
}