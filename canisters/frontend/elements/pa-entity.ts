import {
    html,
    render as litRender
} from 'lit-html';
import { createObjectStore } from 'reduxular';
import { Entity } from '../types/index.d';
import controller from 'ic:canisters/controller';

type State = {
    readonly entity: Readonly<Entity> | 'NOT_SET';
};

const InitialState: Readonly<State> = {
    entity: 'NOT_SET'
};

class PAEntity extends HTMLElement {
    readonly store = createObjectStore(InitialState, (state: Readonly<State>) => litRender(this.render(state), this), this);

    render(state: Readonly<State>) {
        return html`
            <style>
                .pa-entity-main-container {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                }

                .pa-entity-entity-container {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    cursor: pointer;
                }

                .pa-entity-name {
                    font-weight: bold;
                    font-size: 25px;
                    font-family: sans-serif;
                }

                .pa-entity-description {
                    font-size: 15px;
                    padding: 25px;
                    font-family: sans-serif;
                }

                .pa-entity-endorsements {
                }

                .pa-entity-endorsements-title {
                    font-size: 20px;
                    font-weight: bold;
                    font-family: sans-serif;
                }

                .pa-entity-endorsement {
                    padding: 25px;
                    font-size: 15px;
                    font-family: sans-serif;
                }
            </style>

            <div class="pa-entity-main-container">
                ${state.entity === 'NOT_SET' ? html`<div>Loading...</div>` : ''}
                ${state.entity !== 'NOT_SET' ? html`
                    <div class="pa-entity-entity-container">
                        <div class="pa-entity-name">${state.entity.name}</div>
                        
                        <div class="pa-entity-description">${state.entity.description}</div>

                        <div class="pa-entity-endorsements">
                            <div class="pa-entity-endorsements-title">Endorsements</div>
                            ${state.entity.endorsements.length === 0 ? html`<div class="pa-entity-endorsement">None</div>` : state.entity.endorsements.map((endorsement: Readonly<Entity>) => {
                                return html`
                                    <div class="pa-entity-endorsement">${endorsement.name}</div>
                                `;
                            })}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }
}

window.customElements.define('pa-entity', PAEntity);