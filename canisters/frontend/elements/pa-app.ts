import controller from 'ic:canisters/controller';
import {
    html,
    render as litRender
} from 'lit-html';
import { createObjectStore } from 'reduxular';
import {
    Entity
} from '../types/index.d';
import './pa-tabs.ts';
import './pa-entities.ts';

type State = {
    readonly entities: ReadonlyArray<Entity>;
};

const InitialState: Readonly<State> = {
    entities: []
};

class PAApp extends HTMLElement {    
    readonly store = createObjectStore(InitialState, (state: Readonly<State>) => litRender(this.render(state), this), this);

    render(state: Readonly<State>) {
        return html`
            <style>
                html {
                    width: 100%;
                    height: 100%;
                }

                body {
                    width: 100%;
                    height: 100%;
                    margin: 0;
                }

                .pa-text {
                    font-size: 20px;
                    font-family: sans-serif;
                }

                .pa-app-main-container {
                    height: 100%;
                    width: 100%;
                    box-sizing: border-box;
                }

                .pa-app-tabs-container {
                    display: flex;
                    width: 100%;
                    height: 100%;
                }
            </style>

            <!-- <h1>Phase All</h1> -->

            <div class="pa-app-main-container">
                <div class="pa-app-tabs-container">
                    <pa-tabs
                    style="height:100%; width: 100%"
                    .tabs=${[
                        {
                            title: 'Entities',
                            body: html`
                                <div>
                                    <pa-entities></pa-entities>
                                </div>
                            `,
                            active: true
                        },
                        {
                            title: 'Markets',
                            body: html`
                                <div class="pa-text">
                                    Markets are not here yet
                                </div>
                            `,
                            active: false
                        },
                        {
                            title: 'Stats',
                            body: html`
                                <div class="pa-text">
                                    Stats are not here yet
                                </div>
                            `,
                            active: false
                        },
                        {
                            title: 'About',
                            body: html`
                                <div class="pa-text">
                                    A fair protocol for the collection and dissemination of clinical research data.
                                </div>
                            `,
                            active: false
                        }
                    ]}
                ></pa-tabs>
                </div>
            </div>
        `;
    }
}

window.customElements.define('pa-app', PAApp);