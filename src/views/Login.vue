<template>
    <div class="bg-gray-300 flex justify-center items-center h-screen w-full">
        <div class="bg-white max-w-4xl w-10/12 flex rounded-lg overflow-hidden">
            <div class="w-1/2 flex items-center hidden md:block my-auto">
                <img src="../assets/images/login.jpg" alt="">
            </div>
            <div class="w-full md:w-1/2 p-8 flex items-center flex-col" v-if="flag">
                <form @submit.prevent="doLogin()" class="w-full space-y-8">
                    <div class="space-y-2">
                        <label for="email" class="block text-base font-medium text-gray-600">Email</label>
                        <input type="email" name="email" v-model="user.email" class="block w-full p-2 rounded bg-gray-200 border border-transparent focus:outline-none">
                    </div>
                    <div class="space-y-2">
                        <label for="password" class="block text-base font-medium text-gray-600">Password</label>
                        <input type="password" v-model="user.password" class="block w-full p-2 rounded bg-gray-200 border border-transparent focus:outline-none">
                    </div>
                    <input type="submit" value="Log In" class="w-full bg-indigo-600 text-white p-2 rounded shadow mb-4 hover:bg-indigo-700">
                </form>
                <div class="w-full flex flex-col text-center space-y-4 md:flex-row md:justify-between md:space-y-0 mt-4 p-4 text-sm border-t border-gray-300">
                    <a class="font-medium text-indigo-500 cursor-pointer" @click="flag=false">Create account</a>
                    <a class="text-gray-600 cursor-pointer">Forgot password?</a>
                </div>
            </div>

            <div class="w-full md:w-1/2 p-8 flex items-center flex-col" v-else>
                <form @submit.prevent="doRegister()" class="w-full space-y-4">
                    <div class="space-y-2">
                        <label for="name" class="block text-base font-medium text-gray-600">Name</label>
                        <input type="text" name="name" v-model="user.name" class="block w-full p-2 rounded bg-gray-200 border border-transparent focus:outline-none">
                    </div>
                    <div class="space-y-2">
                        <label for="email" class="block text-base font-medium text-gray-600">Email</label>
                        <input type="email" name="email" v-model="user.email" class="block w-full p-2 rounded bg-gray-200 border border-transparent focus:outline-none">
                    </div>
                    <div class="space-y-2">
                        <label for="password" class="block text-base font-medium text-gray-600">Password</label>
                        <input type="password" name="email" v-model="user.password" class="block w-full p-2 rounded bg-gray-200 border border-transparent focus:outline-none">
                    </div>
                    <input type="submit" value="Sign Up" class="w-full bg-indigo-600 text-white p-2 rounded shadow mb-4 hover:bg-indigo-700">
                    
                </form>
                <div class="w-full flex flex-col text-center space-y-4 md:flex-row md:justify-between md:space-y-0 mt-4 p-4 text-sm border-t border-gray-300">
                    <a class="font-medium text-indigo-500 cursor-pointer" @click="flag=true">Log In</a>
                    <a class="text-gray-600 cursor-pointer">Forgot password?</a>
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
            flag: true,
            user: {
                name: null,
                email: null,
                password: null
            }
        }
    },
    methods: {
        doReset() {
            this.user.name = this.user.email = this.user.password = null;
        },
        async doLogin() {
            try {
                await this.$store.dispatch('doLogin', {email: this.user.email, password: this.user.password});
                this.$router.push({name: 'Home'});
                this.doReset()
                console.log("entraste a la app");
            } catch (error) {
                console.error(error.message);
            }
        },
        async doRegister() {
            try {
                await this.$store.dispatch('doRegister', {name: this.user.name, email: this.user.email, password: this.user.password});
                this.$router.push({name: "Login"});
                this.doReset();
                console.log("has sido registrado");
            } catch (error) {
                console.error(error.message);
            }
        }
    },
}
</script>