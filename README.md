# Vuejs Axios Bridge
Axios plugin with progress bar and autenthication configuration


- **Author:** Valerio Barbera - [valerio@aventuresrl.com](mailto:valerio@aventuresrl.com)
- **Author Website:** [www.aventuresrl.com](target="_blank":https://www.aventuresrl.com)

## Dependencies
Plugin ship with [**NProgress**](https://github.com/rstacruz/nprogress)
as progress bar module integrated by default.

## Install
`npm i -S @aventure-cloud/vuejs-axios-bridge`

## Integrate in your project
You can inject a configuration object with two main properties: 

- `axios` for axios configuration
- `progress` for NProgress configuration

To discover all passible configuration of this two module read 
their official documentation.
 
```javascript
import AxiosPlugin from '@aventure-cloud/vuejs-axios-bridge';
Vue.use(AxiosPlugin, {
    axios: {
        baseURL: 'api'
    },
    progress: {
        showSpinner: true
    }
})
```

## Use
```javascript
export default {
    data(){
        return {
            items: []
        };
    },
    
    mounted(){
        this.$axios.get('items')
            .then(response => {
                this.items = response.data;
            });
    }
    
}
```

## Disable progress bar
If you don't want use a progress bar you can disable it:
```javascript
import AxiosPlugin from '@aventure-cloud/vuejs-axios-bridge';
Vue.use(AxiosPlugin, {
    axios: {
        ...
    },
    progress: false
})
```
