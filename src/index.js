import NProgress from 'nprogress';
import axios from 'axios';

export default {
    install: function (Vue, options) {
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]');

        // Merge with default configuration
        let config = Object.assign({
            axios: {
                baseURL: '',
                headers: {}
            },
            progress: {
                showSpinner: false
            }
        }, options);

        // Normalize url
        config.axios.baseURL = options.axios.baseURL = options.axios.baseURL.replace(/^\/|\/$/g, '');
        // Merge with default headers
        config.axios.headers = Object.assign({
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': (csrf_token ? csrf_token.content : '')
        }, config.axios.headers);

        // Configure progress bar
        if(config.progress !== false)
            NProgress.configure(config.progress);

        // Create axios instance with custom configuration
        let httpClient = axios.create(config.axios);

        // Add a request interceptor
        httpClient.interceptors.request.use(function (config) {
            // Do something before request is sent
            if(config.progress !== false)
                NProgress.start();
            return config;
        }, function (error) {
            // Do something with request error
            if(config.progress !== false)
                NProgress.done();
            return Promise.reject(error);
        });

        // Add a response interceptor
        httpClient.interceptors.response.use(function (response) {
            // Do something with response data
            if(config.progress !== false)
                NProgress.done();
            return response;
        }, function (error) {
            // Do something with response error
            if(config.progress !== false)
                NProgress.done();
            return Promise.reject(error);
        });

        Object.defineProperty(Vue.prototype, '$axios', {
            value: httpClient
        });
    }
}