use ic_cdk::print;
use ic_cdk_macros::query;

#[query]
fn hello_world() -> String {
    print("Hello world!");

    return "Hello sir".to_string();
}