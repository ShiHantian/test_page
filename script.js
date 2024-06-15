document.getElementById('startButton').addEventListener('click', () => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
    shuffleArray(numbers);

    showFlyingNumbers(resultDiv, () => {
        numbers.forEach(number => {
            const numberDiv = document.createElement('div');
            numberDiv.className = 'number';
            numberDiv.textContent = number;
            resultDiv.appendChild(numberDiv);
        });
        animateNumbers(resultDiv);
    });
});

document.getElementById('toggleButton').addEventListener('click', () => {
    const toggleButton = document.getElementById('toggleButton');
    if (toggleButton.classList.contains('active')) {
        toggleButton.classList.remove('active');
        toggleButton.textContent = 'Test Mode';
    } else {
        toggleButton.classList.add('active');
        toggleButton.textContent = 'Final Order';
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showFlyingNumbers(container, callback) {
    const flyingDivs = [];
    for (let i = 0; i < 12; i++) {
        const flyingDiv = document.createElement('div');
        flyingDiv.className = 'number';
        flyingDiv.textContent = Math.floor(Math.random() * 12) + 1;
        flyingDiv.style.position = 'absolute';
        flyingDiv.style.top = `${Math.random() * 100}%`;
        flyingDiv.style.left = `${Math.random() * 100}%`;
        flyingDiv.style.transition = 'top 2s, left 2s';
        container.appendChild(flyingDiv);
        flyingDivs.push(flyingDiv);
    }

    setInterval(() => {
        flyingDivs.forEach(div => {
            div.style.top = `${Math.random() * 100}%`;
            div.style.left = `${Math.random() * 100}%`;
        });
    }, 5);

    setTimeout(() => {
        flyingDivs.forEach(div => div.remove());
        callback();
    }, 1);
}

function animateNumbers(container) {
    const numbers = container.querySelectorAll('.number');
    numbers.forEach((number, index) => {
        number.style.opacity = 0;
        number.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            number.style.transition = 'opacity 0.5s, transform 0.5s';
            number.style.opacity = 1;
            number.style.transform = 'translateY(0)';
        }, (index+1) * 1000);
    });
}
