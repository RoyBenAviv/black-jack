const draggables = document.querySelectorAll('.tokens-draggable');
const elDragContainer = document.querySelector('.hand-tokens');
const elTokens = document.querySelector('.tokens');
Sortable.create(elTokens, {
    handle: '.tokens-draggable',
    group: {
        pull: 'clone',
        put: false
    },
    sort: false,
    onMove: (event) => {
        const chipVal = Number(event.dragged.getAttribute('data-chip'));
        new Audio('assets/audio/tokens-throw.mp3').play();
        PLAYER.totalBalance -= chipVal;
        PLAYER.currentBet += chipVal;
        renderBalance(PLAYER);
    },
    animation: 250
});
Sortable.create(elDragContainer, {
    handle: '.tokens-draggable',
    group: {
        pull: 'clone',
        put: true
    },
    sort: false,
    animation: 250
});
