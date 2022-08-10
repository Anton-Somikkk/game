
function renderStartScreen() {
    
    window.application.renderBlock('start-block', game);
}

window.application.screens['start-screen'] = renderStartScreen;
window.application.renderScreen('start-screen');