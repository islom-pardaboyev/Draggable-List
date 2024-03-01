const elSortableList = document.querySelector('.sortable-list');
const items = document.querySelectorAll('.item');

items.forEach(item => {
    item.addEventListener('dragstart', () => {
        setTimeout(() => item.classList.add('dragging'), 0);
    });

    // Remove Draggable
    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
    });
});

const initSortable = (e) => {
    e.preventDefault();

    const draggedItem = document.querySelector('.item.dragging');
    if (!draggedItem) return;

    const siblings = [...elSortableList.querySelectorAll('.item:not(.dragging)')];

    let nextSibling = siblings.find(sibling => {
        return e.clientY < sibling.offsetTop + sibling.offsetHeight / 2;
    });

    if (nextSibling) {
        if (e.clientY < nextSibling.offsetTop) {
            elSortableList.insertBefore(draggedItem, nextSibling);
        } else {
            elSortableList.insertBefore(draggedItem, nextSibling.nextSibling);
        }
    } else {
        elSortableList.appendChild(draggedItem);
    }
};

elSortableList.addEventListener('dragover', initSortable);
elSortableList.addEventListener('drop', (e) => e.preventDefault());
