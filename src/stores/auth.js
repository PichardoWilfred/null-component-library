import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { router } from '@/router';
import  axios  from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        services: null,
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            // const user = { username, password };
            const user = await axios.post(`${baseUrl}Session/IniciarSesion`, { userP: username, passP: password });
            // await user.json()
            console.log(user);
            // console.log();
            // update pinia state
            this.user = user;
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            // redirect to previous url or default to home page
            router.push(this.returnUrl || '/');
        },
        async get_services() {
            await fetchWrapper.get(`${baseUrl}Servicios`).then((services) => {
                const services_ = services;
                return services_;
            });
        },
        async create_appointment(type, data) {
            // const data = { username, password };
            const user = await fetchWrapper.post(`${baseUrl}Session/IniciarSesion`, { userP: username, passP: password });
            console.log(user);
            // update pinia state
            this.user = user;
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            // redirect to previous url or default to home page
            router.push(this.returnUrl || '/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/auth/login');
        }
    }
});
