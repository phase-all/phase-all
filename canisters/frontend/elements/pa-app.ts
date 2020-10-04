import controller from 'ic:canisters/controller';
import {
    html,
    render as litRender
} from 'lit-html';
import { createObjectStore } from 'reduxular';
import { Entity } from '../types/index.d';

type State = {
    readonly entities: ReadonlyArray<Entity>;
};

const InitialState: Readonly<State> = {
    entities: []
};

class PAApp extends HTMLElement {    
    readonly store = createObjectStore(InitialState, (state: Readonly<State>) => litRender(this.render(state), this), this);

    async connectedCallback() {
        await this.getAndSetEntities();
    }

    async getAndSetEntities() {
        const entities: ReadonlyArray<Entity> = await controller.get_entities();
        this.store.entities = entities;
    }

    async registerEntity() {
        const entityNameInput: Readonly<HTMLInputElement> | null = this.querySelector(`#pa-app-entity-name`);
        const entityDescriptionInput: Readonly<HTMLInputElement> | null = this.querySelector(`#pa-app-entity-description`);
    
        const entityName: string | undefined = entityNameInput?.value;
        const entityDescription: string | undefined = entityDescriptionInput?.value;

        await controller.create_entity(entityName, entityDescription);

        alert('Entity created');

        await this.getAndSetEntities();
    }

    render(state: Readonly<State>) {
        return html`
            <h1>Phase All</h1>

            <div>
                <h2>Register Entity</h2>

                <div>
                    Name: <input id="pa-app-entity-name" type="text">
                </div>

                <div>
                    Description:
                    <textarea id="pa-app-entity-description"></textarea>
                </div>

                <button @click=${() => this.registerEntity()}>Register</button>
            </div>

            <h2>Registered Entities</h2>

            <div>
                ${state.entities.map((entity: Readonly<Entity>) => {
                    return html`
                        <div>
                            <div>Name: ${entity.name}</div>
                            <div>Description: ${entity.description}</div>

                            <div>
                                Endorsements: ${entity.endorsements.map((endorsement: Readonly<Entity>) => {
                                    return html`
                                        <div>${endorsement.name}</div>
                                    `;
                                })}
                            </div>
                        </div>
                    `;
                })}
            </div>
        `;
    }
}

window.customElements.define('pa-app', PAApp);