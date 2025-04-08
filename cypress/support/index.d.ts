declare namespace Cypress {
    interface Chainable {
      compareNormalizedText(selectorA: string, selectorB: string): Chainable<void>;
    }
  }