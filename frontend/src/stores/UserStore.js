import { extendObservable } from 'mobx';

class UserStore {
    constructor() {
        extendObservable(this, {

            loading: true,
            isLoggedIn: false,
            id: null,
            name: '',
            email: '',
        });
    }
}

export default new UserStore();