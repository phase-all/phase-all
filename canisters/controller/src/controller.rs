use ic_cdk::print;
use ic_cdk::storage;
use ic_cdk_macros::query;
use ic_cdk_macros::update;
use std::collections::BTreeMap;

pub struct Animal {
    pub name: String,
    pub cuteness_level: i32
}

type AnimalStore = BTreeMap<String, Animal>;

#[query]
fn hello_world() -> String {
    print("Hello world!");

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