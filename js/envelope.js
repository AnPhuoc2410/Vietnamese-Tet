const envelopes = [
    { amount: "$10", message: "Enjoy a small treat!" },
    { amount: "$20", message: "A little something for you!" },
    { amount: "$50", message: "Hope this brings you joy!" },
    { amount: "$100", message: "Wishing you great success!" },
    { amount: "$200", message: "May this bring you happiness!" },
    { amount: "$500", message: "A generous gift for you!" }
];

function openEnvelope(index) {
    const envelope = document.querySelector(`.envelope[data-index="${index}"]`);
    const content = envelope.querySelector('.content');
    const randomIndex = Math.floor(Math.random() * envelopes.length);
    const { amount, message } = envelopes[randomIndex];

    envelope.classList.add('open');
    content.style.display = 'flex';
    content.querySelector('.amount').textContent = amount;
    content.querySelector('.message').textContent = message;
}

function resetEnvelopes() {
    const allEnvelopes = document.querySelectorAll('.envelope');
    allEnvelopes.forEach(envelope => {
        envelope.classList.remove('open');
        envelope.querySelector('.content').style.display = 'none';
    });
}