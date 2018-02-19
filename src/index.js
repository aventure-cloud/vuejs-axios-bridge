import NProgress from 'nprogress';
import axios from 'axios';

export default {
    install: function (Vue, options) {
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]');

        // Merge with default configuration
        let pluginConfig = Object.assign({
            axios: {
                baseURL: '',
                headers: {}
            },
            progress: {
                showSpinner: false
            }
        }, options);

        // Normalize url
        pluginConfig.axios.baseURL = pluginConfig.axios.baseURL.replace(/^\/|\/$/g, '');
        // Merge with default headers
        pluginConfig.axios.headers = Object.assign({
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': (csrf_token ? csrf_token.content : '')
        }, pluginConfig.axios.headers);

        // Configure progress bar instance
        if(pluginConfig.progress !== false)
            NProgress.configure(pluginConfig.progress);

        // Create axios instance with custom configuration
        let httpClient = axios.create(pluginConfig.axios);

        // Add a request interceptor
        httpClient.interceptors.request.use((config) => {
            // Do something before request is sent
            if(pluginConfig.progress !== false)
                NProgress.start();
            return config;
        }, (error) => {
            // Do something with request error
            if(pluginConfig.progress !== false)
                NProgress.done();
            return Promise.reject(error);
        });

        // Add a response interceptor
        httpClient.interceptors.response.use((response) => {
            // Do something with response data
            if(pluginConfig.progress !== false)
                NProgress.done();
            return response;
        }, (error) => {
            if(error.response.status === 401){
                location.reload();
            }

            // Do something with response error
            if(pluginConfig.progress !== false)
                NProgress.done();
            return Promise.reject(error);
        });

        Object.defineProperty(Vue.prototype, '$axios', {
            value: httpClient
        });
    }
}