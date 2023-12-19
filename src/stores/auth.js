import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { router } from '@/router';
import { useToast } from 'vue-toast-notification';


import moment from "moment/dist/moment";
import es from "moment/dist/locale/es";
moment.locale("es", es);

const baseUrl = `${import.meta.env.VITE_API_URL}`;

const $toast = useToast();

const getUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'))
    } catch (error) {
        return JSON.parse(JSON.stringify({ username: 'unlogged', role: 0 }));
    }
}
export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: getUser(),  // initialize state from local storage to enable user to stay logged in
        services: null, // servicios
        returnUrl: null,
        stations: null, // estaciones
        appointments: null, // citas
        washers: null, // lavadores
    }),
    actions: {
        async create_fast_appointment(services) {
            const response = await fetchWrapper.post(`${baseUrl}Agenda/Rapida`, { idParametroNumerico: this.user.role, parametroNvarchar: services.toString() });
            const format_date = (fechaString) => {
                const date = moment(fechaString, 'DD/MM/YYYY HH:mm');
                return date.locale('es').format('D [de] MMMM YYYY, h:mm A');
            }
            const extracted_date = response.match(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/)[0];
            const date_formatted = format_date(extracted_date);

            let instance = $toast.success(`Cita pautada para ${date_formatted}`);
        },
        async create_appointment(services, message, date) {
            const response = await fetchWrapper.post(`${baseUrl}Agenda/Agenda`, { 
                idParametroNumerico: this.user.role, 
                parametroNvarchar: services.toString(),
                parametroDatetime: date,
            });

            let instance = $toast.default(`Cita pautada para ${message}`);
        },
        async get_services() {
            try {
                const services = await fetchWrapper.get(`${baseUrl}Servicios`);
                this.services = services;
            } catch (error) {
                console.log(error);
            }
        },
        async get_washers() {
            try {
                const washers = await fetchWrapper.get(`${baseUrl}Lavador`);
                this.washers = washers;
            } catch (error) {
                console.log(error);
            }
        },  
        async get_stations() {
            try {
                const stations = await fetchWrapper.get(`${baseUrl}Estacion`);
                this.stations = stations;
            } catch (error) {
                console.log(error);
            }
        }, 
        async get_citas() {
            const appointments = await fetchWrapper.get(`${baseUrl}Cita`);
            this.appointments = appointments.filter((appointment) => appointment.idUsuarioCit === this.user.role);
        },
        async login(username, password) {
            const role = await fetchWrapper.post(`${baseUrl}Session/IniciarSesion`, { userP: username, passP: password });
            this.user = { username, role }; // update pinia state
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(this.user));
            // redirect to previous url or default to home page
            router.replace('/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/auth/login');
        }
    }
});
