addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  // Set character limit
  const CHARACTER_LIMIT = 20;

  /**
   * Respond to the request
   * @param {Request} request
   */
// ... (rest of the script)

async function handleRequest(request) {
    const url = new URL(request.url);
    const command = url.searchParams.get('command');
    let value;

    if (command.length > CHARACTER_LIMIT || (command.match(/\n/g) || []).length > 1) {
        return new Response('null', {
            status: 400,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    // Check if the command matches the format ./mycar.sh -key
    const mycarRegex = /^\.\/mycar\.sh\s-(\w+)$/;
    const mycarMatches = command.match(mycarRegex);

    if (mycarMatches) {
        const key = mycarMatches[1];  // Extract the key
        if (key === "version") {
        value = await script.get('version');
        } else if (key === "license") {
            value = await script.get('license');
        } else if (key === "state") {
            const vehicleDataJSON = await tesla.get('vehicle_data');
            const vehicleData = JSON.parse(vehicleDataJSON);
            value = vehicleData.response.state;
        } else if (key === "location") {
            const vehicleDataJSON = await tesla.get('vehicle_data');
            const vehicleData = JSON.parse(vehicleDataJSON);
            value = vehicleData.response.drive_state.latitude + "," + vehicleData.response.drive_state.longitude;
        } else {
            value = await script.get('help');
        }
    } else if (command.startsWith("ls ") || command === "ls") {
        value = await script.get('ls');
    } else if (command.startsWith("./mycar.sh")) {
        value = await script.get('help');
    } else {
        value = "null";
    }

    return new Response(value, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    });
}