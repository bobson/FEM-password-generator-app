# Frontend Mentor - Password generator app solution

This is a solution to the [Password generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![]("./password-generator-app-des.png)
![]("./password-generator-app-mob.png)

### Links

- Solution URL: [Github](https://github.com/bobson/FEM-password-generator-app.git)
- Live Site URL: [live site URL here](https://bobson.github.io/FEM-password-generator-app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Web Components

### What I learned

Web Components Architecture

Created modular, reusable components with encapsulated behavior:

    Slider component for length selection with visual feedback

    Checkbox group for character type selection

    Read-only input with copy-to-clipboard

    Strength indicator with dynamic styling

State Management

    Centralized store using Proxy for reactive updates

    Custom events (passwordchange) for component communication

    Components subscribe to store changes automatically

    Single source of truth for generation criteria

User Experience

    Real-time password generation as users adjust settings

    Visual strength indicator (red → orange → green)

    Copy-to-clipboard with immediate confirmation

    Accessible notifications without blocking UI

    Proper disabled button states

Technical Implementation

    Shadow DOM for style encapsulation

    CSS custom properties for dynamic styling

    Event delegation for efficient handling

    Progressive enhancement approach

    Clean logic/presentation separation

Key Takeaways

    Web Components excel at self-contained UI

    Custom events enable component communication

    Proxy-based stores provide simple reactivity

    Visual feedback is crucial for interactivity

    Accessibility should be baked in from start

Demonstrates modern interactive applications with vanilla web technologies, no frameworks needed.

```js
  renderStrength() {
    const lists = this.querySelectorAll("li");
    const text = this.querySelector(".strength-label");
    const score = app.store.passwordStrength;

    lists.forEach((list) => {
      list.style.backgroundColor = "transparent";
      list.style.borderColor = "var(--grey-200)";
    });

    const labelColors = [
      "var(--red-500)",
      "var(--orange-400)",
      "var(--yellow-300)",
      "var(--green-200)",
    ];

    for (let i = 0; i <= score; i++) {
      lists[i].style.backgroundColor = labelColors[score];
      lists[i].style.borderColor = labelColors[score];
    }

    text.textContent = app.store.strengthLabel;
  }
```

### Continued development

Planned Enhancements

    Password history - Store last 5 generated passwords

    Export options - Save passwords as text file

    Password categories - Different presets (social, banking, email)

    Dark/light mode - Theme switching with CSS custom properties

    Mobile optimization - Better touch interactions

    Password audit - Check against common password lists

## Author

- Frontend Mentor - [@bobson](https://www.frontendmentor.io/profile/bobson)
