const button = document.getElementById('reveal-button');
    const message = document.getElementById('hidden-message');

    if (button && message) {
        button.addEventListener('click',() => {
            message.hidden = !message.hidden;
        });

    }

    const revealElements = document.querySelectorAll('.reveal');
    const container = document.querySelector('.letter-container');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });

    revealElements.forEach((element) => revealObserver.observe(element));

    if (container) {
        requestAnimationFrame(() => {
            container.classList.add('is-visible');
        });
    }

    const heartsContainer = document.getElementById('floating-hearts');
    const heartTypes = ['❤', '♥', '♡', '💗', '💖','<3'];

    if (heartsContainer) {
        for (let i = 0; i < 26; i++) {
            const heart = document.createElement('span');
            heart.className = 'heart-particle';
            heart.textContent = heartTypes[i % heartTypes.length];

            const size = 14 + Math.random() * 26;
            const left = Math.random() * 100;
            const drift = (Math.random() - 0.5) * 220;
            const duration = 10 + Math.random() * 18;
            const delay = -Math.random() * 20;
            const opacity = 0.25 + Math.random() * 0.55;

            heart.style.left = `${left}%`;
            heart.style.fontSize = `${size}px`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.opacity = opacity;
            heart.style.setProperty('--drift-x', `${drift}px`);
            heart.style.setProperty('--spin', `${(Math.random() - 0.5) * 180}deg`);

            heartsContainer.appendChild(heart);
        }
    }
// I'm not sure if it is going to work actually
document.addEventListener("DOMContentLoaded", () => {
document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("is-visible");
});
    });
const questions = Array.from(document.querySelectorAll('.friendship-quiz-question'));
    const nextButton = document.getElementById('next-button');
    const form = document.getElementById('friendship-form');
    const resultBox = document.getElementById('friendship-quiz-result');
    const resetButton = resultBox.querySelector('.friendship-quiz-reset');

    let currentQuestionIndex = 0;

    function showQuestion(index) {
        questions.forEach((question, questionIndex) => {
            const isActive = questionIndex === index;
            question.hidden = !isActive;
            question.classList.toggle('is-active', isActive);
        });

        const isLastQuestion = index === questions.length - 1;
        nextButton.innerHTML = isLastQuestion
            ? 'Finish <span aria-hidden="true">✓</span>'
            : 'Next <span aria-hidden="true">→</span>';
    }

    function validateCurrentQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        const currentAnswer = currentQuestion.querySelector('input[type="radio"]:checked');

        if (!currentAnswer) {
            currentQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
            currentQuestion.style.outline = '2px solid #ff2a6d';
            currentQuestion.style.borderRadius = '10px';
            return false;
        }

        currentQuestion.style.outline = 'none';
        return true;
    }

    nextButton.addEventListener('click', () => {
        if (!validateCurrentQuestion()) {
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex += 1;
            showQuestion(currentQuestionIndex);
            return;
        }

        form.hidden = true;
        resultBox.hidden = false;
    });

    resetButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        form.hidden = false;
        resultBox.hidden = true;
        questions.forEach((question) => {
            question.hidden = question.dataset.question !== '1';
            question.classList.toggle('is-active', question.dataset.question === '1');
            question.style.outline = 'none';
            question.querySelectorAll('input[type="radio"]').forEach((radio) => {
                radio.checked = false;
            });
        });
        showQuestion(0);
    });

    showQuestion(0);