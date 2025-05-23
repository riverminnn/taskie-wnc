import { SELECTORS } from './constants.js';
import { closeNewCardModal, closeNewListModal } from './modals.js';
import { addList } from './lists.js';
import { addCard } from './cards.js';
import { closeShareModal } from './sharing.js';

/**
 * Sets up all event listeners for the board
 */
export function setupEventListeners() {
    // Closes the "New Card" modal when clicking outside of it
    document.addEventListener('click', function (event) {
        const modal = document.getElementById('newCardModal');
        const modalContent = document.getElementById('newCardModalContent');
        const cardNameInput = document.getElementById('cardNameInput');

        // Check if the modal is currently visible
        if (!modal.classList.contains('hidden')) {
            if (!modalContent.contains(event.target) && !event.target.closest('.addCardButton')) {
                if (cardNameInput.value.trim() === '') {
                    closeNewCardModal();
                } else {
                    // Let addCard handle its own submission tracking
                    setTimeout(() => addCard(), 0);
                }
            }
        }
    });

    // Closes the "New List" modal when clicking outside of it
    document.addEventListener('click', function (event) {
        const modal = document.getElementById('newListModal');
        const modalContent = document.getElementById('newListModalContent');
        const listNameInput = document.getElementById('listNameInput');

        // Check if the modal is currently visible
        if (!modal.classList.contains('hidden')) {
            if (!modalContent.contains(event.target) && !event.target.closest('#addListButton')) {
                if (listNameInput.value.trim() === '') {
                    closeNewListModal();
                } else {
                    // Let addCard handle its own submission tracking
                    setTimeout(() => addList(), 0);
                }
            }
        }
    });

    // Prevents the click event from propagating when interacting with the modal content
    const newCardModalContent = document.getElementById('newCardModalContent');
    if (newCardModalContent) {
        newCardModalContent.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }

    // Closes all list dropdowns when clicking outside of them
    document.addEventListener('click', function (event) {
        if (!event.target.closest(SELECTORS.LIST_SETTINGS)) {
            document.querySelectorAll('[id^="list-dropdown-"]').forEach(dropdown => {
                dropdown.classList.add('hidden');
            });
        }
    });

    // Closes settings dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('#settings')) {
            const dropdown = document.getElementById('settings-dropdown');
            if (dropdown && !dropdown.classList.contains('hidden')) {
                dropdown.classList.add('hidden');
            }
        }
    });

    // Closes the share modal when clicking outside
    document.addEventListener('click', function (event) {
        const modal = document.getElementById('shareBoardModal');
        const modalContent = modal.querySelector('div');

        if (!modal.classList.contains('hidden') && !modalContent.contains(event.target) && !event.target.closest('#shareBoard')) {
            closeShareModal();
        }
    });

    window.addEventListener('scroll', function () {
        const modal = document.getElementById('newCardModal');
        const modalContent = document.getElementById('newCardModalContent');

        // Only update if modal is visible
        if (!modal.classList.contains('hidden')) {
            const listID = modalContent.dataset.listId;
            const listContainer = document.getElementById(`list-item-${listID}`);

            if (listContainer) {
                const listRect = listContainer.getBoundingClientRect();
                const addButton = listContainer.querySelector(`#addCardButton-${listID}`);

                if (addButton) {
                    const buttonRect = addButton.getBoundingClientRect();

                    // Update position - use viewport coordinates since we're using position:fixed
                    modalContent.style.top = `${buttonRect.top}px`;
                    modalContent.style.left = `${listRect.left}px`;
                }
            }
        }
    }, { passive: true });
}