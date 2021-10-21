<template>
    <div class="bg-gray-300 flex justify-center items-center h-screen w-full">
        <div class="bg-gray-100 w-full min-h-screen flex flex-col">
            <h1 class="text-3xl text-center font-bold text-blue-700 my-10">Create Account</h1>
            <div class="w-1/2 flex items-center hidden md:block my-auto">
                <img src="../assets/images/login.jpg" alt="">
            </div>
            <div class="w-full px-8 flex flex-col">
                <form @submit.prevent="doRegister()" class="space-y-7">
                    <div class="flex items-center">
                        <span class="p-2 bg-white"><font-awesome-icon :icon="['fas', 'user']"/></span>
                        <input type="text" v-model="user.username" class="w-full p-2 rounded bg-white border border-transparent focus:outline-none" placeholder="Username">
                    </div>
                    <div class="flex items-center">
                        <span class="p-2 bg-white"><font-awesome-icon :icon="['fas', 'envelope']"/></span>
                        <input type="email" v-model="user.email" class="w-full p-2 rounded bg-white border border-transparent focus:outline-none" placeholder="Email">
                    </div>
                    <div class="flex items-center">
                        <span class="p-2 bg-white"><font-awesome-icon :icon="['fas', 'lock']"/></span>
                        <input type="password" v-model="user.password" class="w-full p-2 rounded bg-white border border-transparent focus:outline-none" placeholder="Password">
                    </div>
                    <div class="flex items-center">
                        <span class="p-2 bg-white"><font-awesome-icon :icon="['fas', 'lock']"/></span>
                        <input type="password" v-model="user.confirmPassword" class="w-full p-2 rounded bg-white border border-transparent focus:outline-none" placeholder="Confirm Password">
                    </div>
                    <button type="submit" :disabled="!checkInputs" class="disabled:opacity-50 w-full bg-indigo-600 text-white p-2 rounded shadow mb-4 hover:bg-indigo-700" :class="{'cursor-not-allowed': !checkInputs}">Registrar</button>
                </form>
                <div class="w-full mt-4 p-4 text-sm border-t border-gray-300 text-center">
                    <span class="text-gray-600 text-center">Have an account? <a class="text-blue-400 cursor-pointer" @click="goLogin()">Sign In</a></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Register',
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        goLogin() {
            this.$router.push({name: 'Login'});
        },
        doReset() {
            this.user.username = this.user.email = this.user.password = this.user.confirmPassword = '';
        },
        async doRegister() {
            if (this.user.password !== this.user.confirmPassword) {
                this.$toast.error('La contraseña no es la misma');
                return
            }
            try {
                await this.$store.dispatch('user/doRegister', {name: this.user.username, email: this.user.email, password: this.user.password});
                this.doReset();
                this.goLogin();
                console.log("has sido registrado");
                this.$toast.success('Has sido registrado');
            } catch (error) {
                //console.log(error.message, "wadafa");
                this.$toast.error(error.message);
                //console.error(error.message);
            }
        }
    },
    computed: {
        checkInputs() {
            return this.user.username !== '' && this.user.email !== '' && this.user.password !== '' && this.user.confirmPassword !== '';
        }
    }
}
</script>