class Favorite {
    constructor() {
        const get_local = localStorage.getItem(this.#key());
        if (get_local === null) {
            localStorage.setItem(this.#key(), JSON.stringify([]));
        } else {
            this.favorite = JSON.parse(get_local);
        }
    }

    set(id, title, image, description) {
        let favorite = this.favorite.find(favorite => favorite.id === id);
        if (favorite) {
            favorite.title = title;
            favorite.image = image;
            favorite.description = description;
            this.#refresStorage();
            return true;
        } else {
            return false;
        }
    }

    add(id, title, image, description, element) {
        if (element.dataset.is_fav == 1) {
            // remove
            element.dataset.is_fav = 0;
            element.innerHTML = `<i class="bi bi-heart" style="font-size: 1.7em;"></i>`;
            this.delete(id);
            return true;
        }

        if (this.favorite.find(favorite => favorite.id === id)) {
            return false;
        }
        element.dataset.is_fav = 1;
        element.innerHTML = `<i class="bi bi-heart-fill text-danger" style="font-size: 1.7em;"></i>`;
        this.favorite.push({ id: id, title: title, image: image, description: description });
        this.#refresStorage();
        return true;
    }

    getById(id) {
        return this.favorite.find(favorite => favorite.id === id) ?? null;
    }

    delete(id) {
        this.favorite = this.favorite.filter(favorite => favorite.id !== id);
        this.#refresStorage();
        return this.favorite;
    }

    reset() {
        localStorage.removeItem(this.#key());
        this.favorite = [];
        this.#refresStorage();
        return this.favorite;
    }

    getAll() {
        const get = JSON.parse(localStorage.getItem(this.#key()));
        return get ?? [];
    }

    #key() {
        return 'list_favorite';
    }

    #refresStorage() {
        localStorage.setItem(this.#key(), JSON.stringify(this.favorite));
    }
}