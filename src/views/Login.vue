<template>
    <div class="bg-gray-300 flex justify-center items-center h-screen w-full">
        <div class="bg-white max-w-4xl w-10/12 flex rounded-lg overflow-hidden">
            <div class="w-1/2 flex items-center hidden md:block my-auto">
                <img src="../assets/images/login.jpg" alt="">
            </div>
            <div class="w-full md:w-1/2 p-8 flex items-center flex-col" v-if="flag">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <form class="w-full">
                    <label for="email" class="block mb-2 text-base font-medium text-gray-600">Email</label>
                    <input type="email" name="email" class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none mb-8">
                    <label for="password" class="block mb-2 text-base font-medium text-gray-600">Password</label>
                    <input type="password" name="email" class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none mb-8">
                    <button class="w-full bg-indigo-600 text-white p-3 mt-5 rounded shadow mb-8 hover:bg-indigo-700">Log In</button>
                </form>
                <div class="w-full flex justify-between p-4 text-sm border-t border-gray-300 bg-gray-100">
                    <a href="#" class="font-medium text-indigo-500" @click="flag=false">Create account</a>
                    <a href="#" class="text-gray-600">Forgot password?</a>
                </div>
            </div>

            <div class="w-1/2 p-8 flex items-center flex-col" v-else>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <form class="w-full">
                    <label for="email" class="block mb-2 text-base font-medium text-gray-600">Email</label>
                    <input type="email" name="email" class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none mb-8">
                    <label for="password" class="block mb-2 text-base font-medium text-gray-600">Password</label>
                    <input type="password" name="email" class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none mb-8">
                    <button class="w-full bg-indigo-600 text-white p-3 mt-5 rounded shadow mb-8 hover:bg-indigo-700 font-bold">Sign Up</button>
                </form>
                <div class="w-full flex justify-between p-4 text-sm border-t border-gray-300 bg-gray-100">
                    <a href="#" class="font-medium text-indigo-500" @click="flag=true">Create account</a>
                    <a href="#" class="text-gray-600">Forgot password?</a>
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
            email: null,
            password: null
        }
    },
    methods: {
        async doLogin() {

        },
        async doRegister() {

        }
    },
}
</script>