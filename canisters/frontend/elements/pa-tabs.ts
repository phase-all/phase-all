import {
    html,
    render as litRender
} from 'lit-html';
import { createObjectStore } from 'reduxular';
import { Tab } from '../types/index.d';

type State = {
    readonly tabs: ReadonlyArray<Tab>;
};

const InitialState: Readonly<State> = {
    tabs: []
};

class PATabs extends HTMLElement {
    readonly store = createObjectStore(InitialState, (state: Readonly<State>) => litRender(this.render(state), this), this);

    titleClicked(title: string) {
        this.store.tabs = this.store.tabs.map((tab: Readonly<Tab>) => {
            if (tab.title === title) {
                return {
                    ...tab,
                    active: true
                };
            }
            else {
                return {
                    ...tab,
                    active: false
                };
            }
        });
    }

    render(state: Readonly<State>) {
        return html`
            <style>
                .pa-tabs-main-container {
                    height: 100%;
                    width: 100%;
                    box-sizing: border-box;
                }

                .pa-tabs-tabs-container {
                    display: flex;
                    text-align: center;
                    border-bottom: solid 2px black;
                    width: 100%;
                    box-sizing: border-box;
                }

                .pa-tabs-tab-container {
                    font-family: monospace;
                    flex: 1;
                    font-size: 25px;
                    padding: 25px;
                    cursor: pointer;
                    color: grey;
                    transition: background-color 0.5s ease;
                }

                .pa-tabs-tab-container:hover {
                    background-color: lightgrey;
                }

                .pa-tabs-active-tab-container {
                    background-color: grey;
                    color: white;
                    font-weight: bold;
                }

                .pa-tabs-body-container {
                    padding: 25px;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                }
            </style>
        
            <div class="pa-tabs-main-container">
                <div class="pa-tabs-tabs-container">
                    ${state.tabs.map((tab: Readonly<Tab>) => {
                        return html`
                            <div class="pa-tabs-tab-container ${tab.active === true ? 'pa-tabs-active-tab-container' : ''}" @click=${() => this.titleClicked(tab.title)}>
                                ${tab.title}
                            </div>
                        `;
                    })}
                </div>

                <div class="pa-tabs-body-container">
                    ${state.tabs.find((tab: Readonly<Tab>) => tab.active)?.body || ''}
                </div>

            </div>
        `;
    }
}

window.customElements.define('pa-tabs', PATabs);