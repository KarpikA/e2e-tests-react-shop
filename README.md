# 🧪 Cypress E2E Tests for Simple React Shopping Cart

> Automated end-to-end tests for a simple ecommerce shopping cart application built with React and TypeScript.

This project contains Cypress E2E tests for a React-based shopping cart app originally created by [Jefferson Ribeiro](https://github.com/jeffersonRibeiro/react-shopping-cart).  
The tests cover core user interactions such as adding products to the cart, updating quantities, and checking responsive behavior.

---

## 🛍️ Application Overview

This shopping cart prototype demonstrates how React, React Hooks, Context API, and Styled Components can be used to create a responsive, scalable e-commerce UI.

You can run the application locally or check out the original live demo:  
🔗 [Live Demo (original)](https://react-shopping-cart-67954.firebaseapp.com/)

---

## 🚀 Getting Started

### 🔧 Requirements

- Node.js
- npm or yarn

### ▶️ Run the Application

```bash
npm install
npm start
```

### 🧪 Run the Cypress Tests

```bash
npm run cypress:open
```

---

## ⚙️ CI/CD with GitHub Actions

This project includes a complete **CI/CD pipeline configured with GitHub Actions**, featuring:

- ✅ **Component tests** with Jest and snapshot coverage
- 🔍 **End-to-end tests** with Cypress (including screenshots on failure)
- 📄 **Coverage reports** uploaded as artifacts
- 🧱 **Reusable composite action** to setup Node, cache dependencies, and install packages
- 🚀 **Multi-stage deployments** (regression → production) with environment support
- 🧪 **Optional branch testing workflow** with manual deploy to a development environment

CI runs automatically on:

- every push to `main` (build, test, deploy)
- any branch push (`test-branch.yml`)
- manual dispatch (e.g. for triggering deploys)

---

## 📁 Project Structure

```
/cypress
  /e2e
    cart.cy.ts      # Example test suite

/.github
  /actions
    setup-node-deps/   # Reusable composite GitHub Action
  /workflows
    main.yml           # Main CI/CD pipeline
    test-branch.yml    # Test & dev deploy workflow for branches
```

---

## ✅ Features Tested

- Adding products to the cart
- Removing products
- Updating item quantities
- Validating cart total
- Responsive behavior

---

## 🧾 License

This project is licensed under the MIT License.

The underlying application code was created by [Jefferson Ribeiro](https://github.com/jeffersonRibeiro/react-shopping-cart) and is also licensed under the MIT License.

---

## 🙌 Credits

- Original UI and application: [Jefferson Ribeiro](http://www.jeffersonribeiro.com/)
- **E2E tests and CI/CD setup** added on top of the original project to demonstrate automated testing and deployment with Cypress and GitHub Actions

---

<p align="center"><sub>Made with 🧠, 🧪, and ☕</sub></p>
