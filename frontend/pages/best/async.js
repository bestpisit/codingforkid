function task1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Task 1");
            resolve();
        }, 1000);
    });
}

async function main(){
    await Promise.all([task1(), task2()]).then(() => {
        console.log("Tasks finished");
    }).catch((error) => {
        console.log("Error: ", error);
    });
}

function task2() {
    console.log("Task 2");
}

main();