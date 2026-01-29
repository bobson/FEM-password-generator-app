export const checkboxCss = `
.password-options {
    border: none;
    padding: 0;
}

.password-options>*+* {
    margin-block-start: 1rem;
}



/* Hide actual checkbox but keep it accessible */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* Custom checkbox styling */
.option {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: background 0.2s;
}

.option:hover .custom-checkbox {
    border-color: var(--green-200);
}

.custom-checkbox {
    width: 20px;
    height: 20px;
    border: 2px solid var(--grey-200);
    background: transparent;
    transition: all 0.2s;
}

/* Checked state - your green color */
.option input:checked+.custom-checkbox {
    background: var(--green-200);
    background-image: url("./assets/images/icon-check.svg");
    background-repeat: no-repeat;
    background-position: center;
    border-color: var(--green-200);
}


/* Disabled state */
.option input:disabled+.custom-checkbox {
    border-color: var(--grey-600);
    opacity: 0.5;
    cursor: not-allowed;
}`;
