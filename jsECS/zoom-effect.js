document.addEventListener('DOMContentLoaded', function() {
    // Verifica que los elementos con clase dashboard__stat-card existen
    const statCards = document.querySelectorAll('.dashboard__stat-card');
    if (statCards.length > 0) {
        console.log('Zoom effect applied to dashboard stat cards');
    }
});