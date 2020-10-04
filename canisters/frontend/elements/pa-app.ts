import controller from 'ic:canisters/controller';
import { html, render as litRender } from 'lit-html';
import { createObjectStore } from 'reduxular';

type State = {};

const InitialState: Readonly<State> = {};

class PAApp extends HTMLElement {    
    readonly store = createObjectStore(InitialState, (state: Readonly<State>) => litRender(this.render(state), this), this);

    async connectedCallback() {
        // this.innerHTML = `Hello`;
    
        const message = await controller.get_entity('Brody');

        console.log(message);

        // this.render();
    }

    render(state: Readonly<State>) {
        return html`
            <h1>Why yes it does work!</h1>
        `;
    }
}

window.customElements.define('pa-app', PAApp);