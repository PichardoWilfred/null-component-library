<template>
    <div class="max-w-[450px]">
        <div>
            <h1 class="font-semibold text-[24px] text-blue-200 ">
                El Lavadero <span class="text-blue-100">Inc.</span>
            </h1>
            <p class="text-[16px] text-blue-100 leading-[22px]">
                Complete los campos a continuación para crear una cuenta en el sistema
            </p>
        </div>
        <form @submit="onSubmit" class="mt-6 mb-4">
            <CustomInput theme="light" label="Usuario" 
            v-model="username" v-bind="usernameAttrs" :error="errors.username" />

            <CustomInput theme="light" label="Nombre Completo"
            v-model="full_name" v-bind="full_nameAttrs" :error="errors.full_name" />
            
            <CustomInput theme="light" label="Contraseña" type="password" 
            v-model="password" v-bind="passwordAttrs" :error="errors.password" />

            <!-- <h2 class="text-blue-100 text-[14px] hover:underline cursor-pointer text-end translate-y-[-20px]">
                ¿Olvidaste tu contraseña?
            </h2> -->
            <button class="btn bg-blue-100 hover:brightness-[95%] w-full mt-4" :disabled="isSubmitting" submit>
                Regístrate
            </button>
            <h2 class="text-gray-300 text-[14px] text-center mt-3">
                <span class="cursor-pointer hover:brightness-[140%] transition-all">Ya tienes una  cuenta?</span> 
                <RouterLink to="/auth/login">
                    <span class="cursor-pointer ms-2 text-blue-100 font-medium hover:underline">Iniciar Sesión</span>
                </RouterLink>
            </h2>
        </form>
    </div>
</template>
<script setup>

import CustomInput from '@/components/CustomInput.vue';
    import { RouterLink } from 'vue-router';
    import { useForm } from 'vee-validate';
    import { object, string  } from 'yup';

    const { errors, handleSubmit, defineField } = useForm({
        validationSchema: object({
            username: string().required('El nombre de usuario es requerido'),
            full_name: string().required('El nombre completo del usuario es requerido'),
            password: string().required('La contraseña es requerida'),
        }),
    });

    const [full_name,  full_nameAttrs] = defineField('full_name');
    const [username, usernameAttrs] = defineField('username');
    const [password, passwordAttrs] = defineField('password');

    const onSubmit = handleSubmit(values => {
        console.log(values);
    });
</script>