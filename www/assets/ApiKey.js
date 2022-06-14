class ApiKey {
    constructor() {
        const api = [
            {
                key: "k_qwa0nu1j",
                email: "iseplutpi.web@gmail.com",
                username: "iseplutpi.web",
                password: "TololBiadab123",
                status: true,
            },
            {
                key: "k_o9752t66",
                email: "iseplutpinur7@gmail.com",
                username: "iseplutpinur",
                password: "TololBiadab123",
                status: true,
            },
            {
                key: "k_4n86pqej",
                email: "bootloop209@gmail.com",
                username: "bootloop209",
                password: "TololBiadab123",
                status: true,
            },
            {
                key: "k_k35pn2f3",
                email: "ailatifah1612@gmail.com",
                username: "ailatifah1612",
                password: "TololBiadab123",
                status: true,
            },
            {
                key: "k_2wdhg22d",
                email: "iseplutpi1008@gmail.com",
                username: "iseplutpi1008",
                password: "TololBiadab123",
                status: true,
            },
            {
                key: "k_nkpawkpd",
                email: "lutpinurisep@gmail.com",
                username: "lutpinurisep",
                password: "TololBiadab123",
                status: true,
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

    set(key, status) {
        let api = this.api.find(api => api.key === key);
        if (api) {
            api.status = status;
        }
        this.#refresStorage();
        return api;
    }

    getAll() {
        return this.api;
    }

    add(key, username) {
        this.api.push({ key: key, status: true, username: username });
        this.#refresStorage();
        return this.api;
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