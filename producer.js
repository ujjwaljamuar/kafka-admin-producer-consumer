const { kafka } = require("./client.js");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function init() {
    const producer = kafka.producer();

    console.log("Connecting producer...");

    await producer.connect();
    console.log("Producer connected successfully.");

    rl.setPrompt("> ");
    rl.prompt();

    rl.on("line", async function (line) {
        const [rider, location] = line.split(" ");

        await producer.send({
            topic: "rider-updates",
            messages: [
                {
                    partition: location.toLowerCase() === "north" ? 0 : 1,
                    key: "location-update",
                    value: JSON.stringify({
                        name: rider,
                        location: location,
                    }),
                },
            ],
        });
    }).on("close", async () => {
        console.log("disconnecting producer");

        await producer.disconnect();
        console.log("prodcuer disconnected");
    });
}

init();
