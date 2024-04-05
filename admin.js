const { kafka } = require("./client.js")


async function init() {
    // create admin
    const admin = kafka.admin();
    console.log("admin connecting...");
    admin.connect();
    console.log("admin connected");

    // create topics
    console.log("creating topic [rider-updates]");
    await admin.createTopics({
        topics: [
            {
                topic: "rider-updates",
                numPartitions: 2,
            },
        ],
    });

    console.log("topic creation success - [rider-updates]");

    // disconnect admin
    console.log("disconnecting admin...");
    admin.disconnect();
    console.log("admin disconnected");
}

init();
