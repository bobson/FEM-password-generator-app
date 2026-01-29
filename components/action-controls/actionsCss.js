export const css = `
.actions {
    display: grid;
    grid-template-rows: 3.5rem 3.5rem;
    gap: 1rem;
}

.strength-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: var(--grey-850);
    padding: 1rem;
    gap: 1rem;
}

.strength-container output {
    color: var(--grey-600);
    margin-inline-end: auto;
}

.strength-label {
    font-size: var(--font-size-r);
    line-height: var(--line-height-r);

    @media (width >768px) {
        font-size: var(--font-size-l);
        line-height: var(--line-height-l);
    }
}

.strength-container ul {
    display: flex;
    gap: 0.5rem;
    height: 100%;
}

.strength-container ul li {
    border: 2px solid var(--grey-200);
    width: 0.625rem;
    background: transparent;
    height: 100%;
}

.generate-pass {
    display: flex;
    border-radius: none;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--green-200);
    padding: 0.875rem 1rem;
    gap: 1rem;
    background-color: var(--green-200);
    transition: all 0.2s ease;

    & img {
        transition: all .2 ease;
    }

    &:active:not(:disabled) {
        /* scale: 0.9; */

        & img {
            scale: 1.5;
        }
    }

    &:hover:not(:disabled) {
        background-color: transparent;
        color: var(--green-200);

        & img {
            content: url("./assets/images/icon-arrow-right-green.svg");
        }
    }

    &:disabled {
        background-color: hsl(127, 30%, 62%);
        border: none;

        & img {
            display: none;
        }
    }
}
`;
