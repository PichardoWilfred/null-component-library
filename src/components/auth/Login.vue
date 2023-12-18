<template>
    <div class="max-w-[450px]">
        <div>
            <h1 class="font-semibold text-[24px] text-blue-200 ">
                El Lavadero <span class="text-blue-100">Inc.</span>
            </h1>
            <p class="text-[16px] text-blue-100 leading-[22px]">
                Ingrese sus credenciales para poder acceder a su cuenta en el sistema
            </p>
        </div>
        <form @submit="onSubmit" class="mt-6 mb-4">
            <CustomInput theme="light" label="Usuario" 
            v-model="username" v-bind="usernameAttrs" :error="errors.username" />

            <CustomInput theme="light" label="Contraseña" type="password" 
            v-model="password" v-bind="passwordAttrs" :error="errors.password" />

            <h2 class="text-blue-100 text-[14px] hover:underline cursor-pointer text-end translate-y-[-20px]">
                ¿Olvidaste tu contraseña?
            </h2>
            <p v-if="request_error" class="text-blue-100 text-[14px] hover:underline cursor-pointer text-start my-3">
                Algo salió mal
            </p>
            <button class="btn bg-blue-100 hover:brightness-[95%] w-full" :disabled="isSubmitting" submit>
                Iniciar sesión
            </button>
            <h2 class="text-gray-300 text-[14px] text-center mt-3">
                <span class="cursor-pointer hover:brightness-[140%] transition-all">Aún no tienes cuenta?</span> 
                <RouterLink to="/auth/register">
                    <span class="cursor-pointer ms-2 text-blue-100 font-medium hover:underline">Regístrate</span>
                </RouterLink>
            </h2>
        </form>
    </div>
</template>
<script setup>
    import CustomInput from '@/components/CustomInput.vue';

    import { RouterLink } from 'vue-router';
    import { object, string  } from 'yup';
    import { useForm } from 'vee-validate';
    import { ref } from "vue";

    import { useAuthStore } from '@/stores/auth.js';

    const { errors, handleSubmit, defineField } = useForm({
        validationSchema: object({
            username: string().required('El nombre de usuario es requerido'),
            password: string().required('La contraseña es requerida'),
        }),
    });

    const [username, usernameAttrs] = defineField('username');
    const [password, passwordAttrs] = defineField('password');

    const request_error = ref(false);

    const onSubmit = handleSubmit((values) => {
        const authStore = useAuthStore();
        const { username, password } = values;

        // if (username === "1" && password === "1") {

        //     localStorage.setItem('user', JSON.stringify({ username: '1', password: '1' }));
        // } else {
        //     request_error.value = true;
        // }
        return authStore.login(username, password);
    }); 
</script> 