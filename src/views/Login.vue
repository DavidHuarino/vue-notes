<template>
    <div class="bg-gray-300 flex justify-center items-center h-screen w-full">
        <div class="bg-gray-100 w-full min-h-screen flex flex-col">
            <span class="p-2 bg-gray-100 text-center text-blue-700 text-7xl my-6"><font-awesome-icon :icon="['fas', 'sticky-note']"/></span>
            
            <div class="w-full px-8 flex flex-col mt-6">
                <form @submit.prevent="doLogin()" class="w-full space-y-7">
                    <div class="flex items-center">
                        <span class="p-2 bg-white"><font-awesome-icon :icon="['fas', 'envelope']"/></span>
                        <input type="email" v-model="user.email" class="w-full p-2 rounded bg-white border border-transparent focus:outline-none" placeholder="Email">
                    </div>
                    <div class="flex items-center">
                        <span class="p-2 bg-white"><font-awesome-icon :icon="['fas', 'lock']"/></span>
                        <input type="password" v-model="user.password" class="w-full p-2 rounded bg-white border border-transparent focus:outline-none" placeholder="Password">
                    </div>
                    <!-- <input disabled type="submit" value="Sign In" class="w-full cursor-pointer bg-indigo-600 text-white p-2 rounded shadow mb-4 hover:bg-indigo-700"> -->
                    <button type="submit" :disabled="!checkInputs" class="disabled:opacity-50 w-full bg-indigo-600 text-white p-2 rounded shadow mb-4 hover:bg-indigo-700" :class="{'cursor-not-allowed': !checkInputs}">Ingresar</button>
                </form>
                <div class="w-full flex flex-col text-center space-y-4 md:flex-row md:justify-between md:space-y-0 mt-4 p-4 text-sm border-t border-gray-300">
                    <span class="text-gray-600 w-full text-center">Don't have an account? <a class="text-blue-400 cursor-pointer" @click="goRegister()">Create One</a></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            user: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        goRegister() {
            this.$router.push({name: 'Register'});
        },
        doReset() {
            this.user.email = this.user.password = '';
        },
        async doLogin() {
            try {
                await this.$store.dispatch('user/doLogin', {email: this.user.email, password: this.user.password});
                this.doReset()
                this.$router.push({name: 'Home'});
                this.$toast.success('Bienvenido');
            } catch (error) {
                this.$toast.error(error.message);
            }
        }
    },
    computed: {
        checkInputs() {
            return this.user.email !== '' && this.user.password !== '';
        }
    }
}
</script>