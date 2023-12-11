// Helper for displaying status messages.
const addMessage = (message: string) => {
    const messagesDiv = document.querySelector("#messages") as HTMLDivElement;
    if (!messagesDiv) return;
    messagesDiv.style.display = "block";
    const messageWithLinks = addDashboardLinks(message);
    messagesDiv.innerHTML += `> ${messageWithLinks}<br>`;
    console.log(`Debug: ${message}`);
};

// Adds links for known Stripe objects to the Stripe dashboard.
const addDashboardLinks = (message: string) => {
    const piDashboardBase = "https://dashboard.stripe.com/test/payments";
    return message.replace(
        /(pi_(\S*)\b)/g,
        `<a href="${piDashboardBase}/$1" target="_blank">$1</a>`
    );
};

export { addMessage, addDashboardLinks };
