class AlertJS {
    constructor() {
        this.template = {
            primary: `<div class="alert custom-alert-2 alert-primary alert-dismissible fade show" role="alert"><i class="bi bi-check-circle"></i>msg123
              <button class="btn btn-close btn-close-white position-relative p-1 ms-auto" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`,
            secondary: `<div class="alert custom-alert-2 alert-secondary alert-dismissible fade show" role="alert"><i class="bi bi-check-circle"></i>msg123
              <button class="btn btn-close btn-close-white position-relative p-1 ms-auto" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`,
            success: `<div class="alert custom-alert-2 alert-success alert-dismissible fade show" role="alert"><i class="bi bi-check-circle"></i>msg123
              <button class="btn btn-close btn-close-white position-relative p-1 ms-auto" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`,
            danger: `<div class="alert custom-alert-2 alert-danger alert-dismissible fade show" role="alert"><i class="bi bi-x-circle"></i>msg123
              <button class="btn btn-close btn-close-white position-relative p-1 ms-auto" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`,
            warning: `<div class="alert custom-alert-2 alert-warning alert-dismissible fade show" role="alert"><i class="bi bi-exclamation-circle"></i>msg123
              <button class="btn btn-close btn-close-white position-relative p-1 ms-auto" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`,
            info: `<div class="alert custom-alert-2 alert-info alert-dismissible fade show" role="alert"><i class="bi bi-info-circle"></i>msg123
              <button class="btn btn-close btn-close-white position-relative p-1 ms-auto" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`,
            light: `<div class="alert custom-alert-2 alert-light alert-dismissible fade show" role="alert"><i class="bi bi-check-circle"></i>msg123
              <button class="btn btn-close position-relative p-1 ms-auto" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`,
            dark: `<div class="alert custom-alert-2 alert-dark alert-dismissible fade show mb-0" role="alert"><i class="bi bi-check-circle"></i>msg123
              <button class="btn btn-close btn-close-white position-relative p-1 ms-auto" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
        };

    }

    get(color, text) {
        return this.template[color].replace('msg123', text);
    }

    setDef(color, text) {
        const result = this.get(color, text);
        $('#alert-default').html(result);
        return result;
    }

    setWithJQ(element, color, text) {
        const result = this.get(color, text);
        $(element).html(result);
        return result;
    }
}