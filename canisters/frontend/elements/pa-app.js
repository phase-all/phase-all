import controller from 'ic:canisters/controller';

class PAApp extends HTMLElement {    
    async connectedCallback() {
        this.innerHTML = `Hello`;
    
        const message = await controller.hello_world();

        console.log(message);
    }
}

window.customElements.define('pa-app', PAApp);