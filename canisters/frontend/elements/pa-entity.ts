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

                }
            </style>

            <div class="pa-entity-main-container">
                ${state.entity === 'NOT_SET' ? html`<div>Loading...</div>` : ''}
                ${state.entity !== 'NOT_SET' ? html`
                    <div class="pa-entity-entity-container">
                        <div>Name: ${state.entity.name}</div>
                        <div>Description: ${state.entity.description}</div>

                        <div>
                            Endorsements: ${state.entity.endorsements.map((endorsement: Readonly<Entity>) => {
                                return html`
                                    <div>${endorsement.name}</div>
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