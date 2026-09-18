document.addEventListener('DOMContentLoaded'), () => {
    const questions = Array.from(
        document.querySelectorAll('.friendship-quiz-question')
    );
    const nextButton = document.getElementById('next-button');
    const form = document.getElementById('friendship-form');
    const resultBox = document.getElementById('friendship-quiz-reset');
    const resetButton = resultBox.querySelector('friendship-quiz-reset');

    if (!questions.length || !nextButton || !form || resultBox)
        console.error('Quiz elements are missing from the page.');
        return;
}
    let currentQuestionIndex = 0;

    function ShowQuestion(index) {
        questions.forEach((question, questionIndex)=> {
            const isActive =questionIndex === index;
            question.hidden = !isActive;
            question.classList.toggle('is-active',isActive);
        });
        
        nextButton.innerHTML = 
            index === questions.length - 1
                ? 'Finish <span aria-hidden="true">✓</span>'
                : 'Next <span aria-hidden="true">→</span>'
    }