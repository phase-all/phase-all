// TODO I need to use an infinitely scalable data structure like BigMap
// TODO I need to know for sure what the privacy capabilities of ICP will be
// TODO figure out dates and timestamps and such
// TODO figure out cross-canister calls, start coming up with the canister infrastructure

use ic_cdk::print;
use ic_cdk::storage;
use ic_cdk::caller;
use ic_cdk_macros::query;
use ic_cdk_macros::update;
use std::collections::BTreeMap;
use candid::CandidType;

// TODO I would like to add a creation date, and potentially an updated date
#[derive(Clone, CandidType)]
pub struct Entity {
    pub id: String,
    pub name: String,
    pub description: String,
    pub endorsements: Vec<Entity>
}

pub struct Animal {
    pub name: String,
    pub cuteness_level: i32
}

type EntityStore = BTreeMap<String, Entity>;

type AnimalStore = BTreeMap<String, Animal>;

#[update]
fn create_entity(
    name: String,
    description: String
) -> bool {
    let id: String = caller().to_text();

    let entity: Entity = Entity {
        id: id.clone(),
        name,
        description,
        endorsements: Vec::new()
    };

    let entity_store = storage::get_mut::<EntityStore>();

    entity_store.insert(id, entity);

    return true;
}

// TODO I want to figure out if this function can be returned easily as json
#[query]
fn get_entity(id: String) -> Entity {
    let entity_store = storage::get::<EntityStore>();

    match entity_store.get(&id).cloned() {
        Some(entity) => entity,
        None => Entity {
            id: "0".to_string(),
            name: "Not found".to_string(),
            description: "No description".to_string(),
            endorsements: Vec::new()
        }
    }
}

#[query]
fn hello_world() -> String {
    print("Hello world!");

    let id = caller();

    print(id.to_text());

    return "Hello sir".to_string();
}

#[query]
fn get_animal(name: String) -> String {
    let animal_store = storage::get::<AnimalStore>();

    let animal = animal_store.get(&name);

    match animal {
        Some(animal) => {
            return animal.name.clone() + "," + &animal.cuteness_level.to_string();
        },
        None => {
            return "Animal not found".to_string();
        }
    }
}

#[update]
fn store_animal(name: String, cuteness_level: i32) {
    let animal_store = storage::get_mut::<AnimalStore>();

    animal_store.insert(name.clone(), Animal {
        name,
        cuteness_level
    });
}