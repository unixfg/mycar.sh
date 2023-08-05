document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const input = document.getElementById('cmdline');
    const workerUrl = 'PLACEHOLDER_WORKER_URL';
    input.focus();

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = input.value.trim();

            if (command === 'clear') {
                output.textContent = '';
                input.value = '';
                return;
            }

            // Display the command
            output.textContent += `guest@HaltingProblem:~$ ${command}\n`;

            fetch(`${workerUrl}?command=${encodeURIComponent(command)}`)
                .then(response => response.text())
                .then(data => {
                    if (data === "null" || data === "") {
                        // Truncate the command at the first space
                        const truncatedCommand = command.split(' ')[0];
                        output.textContent += `sh: 1: ${truncatedCommand}: not found\n`;                    
                    } else {
                        output.textContent += `${data}\n`;
                    }
                    input.value = '';
                })                
                .catch(error => {
                    output.textContent += `sh: 1: ${command}: not found\n`;
                    input.value = '';
                });
            input.focus();
        }
    });
});