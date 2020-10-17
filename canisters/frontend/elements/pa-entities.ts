import {
    html,
    render as litRender
} from 'lit-html';
import { createObjectStore } from 'reduxular';
import {
    Entity,
    Tab
} from '../types/index.d';
import controller from 'ic:canisters/controller';
import './pa-entity.ts';
import './pa-tabs.ts';

type State = {
    readonly entities: ReadonlyArray<Entity>;
    readonly loading: boolean;
    readonly registering: boolean;
};

const InitialState: Readonly<State> = {
    entities: [],
    loading: true,
    registering: false
};

class PAEntities extends HTMLElement {
    readonly store = createObjectStore(InitialState, (state: Readonly<State>) => litRender(this.render(state), this), this);

    async connectedCallback() {
        this.store.loading = true;
        await this.getAndSetEntities();
        this.store.loading = false;
    }

    async getAndSetEntities() {
        const entities: ReadonlyArray<Entity> = await controller.get_entities();
        this.store.entities = entities;
    }

    async registerEntity() {
        this.store.registering = true;

        const entityNameInput: Readonly<HTMLInputElement> | null = this.querySelector(`#pa-app-entity-name`);
        const entityDescriptionInput: Readonly<HTMLInputElement> | null = this.querySelector(`#pa-app-entity-description`);
    
        const entityName: string | undefined = entityNameInput?.value;
        const entityDescription: string | undefined = entityDescriptionInput?.value;

        console.log('entityName', entityName);
        console.log('entityDescription', entityDescription);

        await controller.create_entity(entityName, entityDescription);

        alert('Entity created');

        await this.getAndSetEntities();

        this.store.registering = false;
    }

    render(state: Readonly<State>) {
        return html`
            <style>
                .pa-entities-main-container {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                }

                .pa-entities-entities-container {
                    display: flex;
                    flex-wrap: wrap;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    justify-content: center;
                }

                .pa-entities-entity-container {
                    border-radius: 5px;
                    border: solid 2px lightgrey;
                    padding: 25px;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                }
            </style>

            <div class="pa-entities-main-container">
                <pa-tabs
                    .tabs=${[
                        {
                            title: 'View',
                            active: true,
                            body: html`
                                ${state.loading === true ? html`<div>Loading...</div>` : ''}
                                ${state.loading === false ? html`
                                    <div class="pa-entities-entities-container">
                                        ${state.entities.map((entity: Readonly<Entity>) => {
                                            return html`
                                                <div style="width: 25%; padding: 25px; box-sizing: border-box">
                                                    <div class="pa-entities-entity-container">
                                                        <pa-entity .entity=${entity}></pa-entity>
                                                    </div>
                                                </div>
                                            `;
                                        })}
                                    </div>
                                ` : ''}
                            `
                        },
                        {
                            title: 'Register',
                            active: false,
                            body: html`
                                <div>
                                    <h2>Register Entity</h2>

                                    <div>
                                        Name: <input id="pa-app-entity-name" type="text">
                                    </div>

                                    <div>
                                        Description:
                                        <textarea id="pa-app-entity-description"></textarea>
                                    </div>

                                    <div ?hidden=${!state.registering}>Registering...</div>
                                    <button ?hidden=${state.registering} @click=${() => this.registerEntity()}>Register</button>
                                </div>
                            `
                        }
                    ]}
                ></pa-tabs>
            </div>
        `;
    }
}

window.customElements.define('pa-entities', PAEntities);