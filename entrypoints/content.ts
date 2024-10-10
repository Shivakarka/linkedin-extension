import { defineContentScript } from "wxt/sandbox";

export default defineContentScript({
  matches: ["https://www.linkedin.com/*"],
  main() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "connectAll") {
        connectWithAll()
          .then((count) => {
            sendResponse({ success: true, count: count });
          })
          .catch((error) => {
            sendResponse({ success: false, error: error.message });
          });
        return true;
      }
    });

    async function connectWithAll(): Promise<number> {
      const acceptButtons = document.querySelectorAll(
        'button[aria-label^="Accept"][aria-label$="invitation"]'
      );
      if (acceptButtons.length === 0) {
        throw new Error("No pending connection requests found.");
      }

      let count = 0;
      for (const button of acceptButtons) {
        (button as HTMLElement).click();
        count++;
        // Wait for the acceptance to process
        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 2000 + 1000)
        );

        // Wait for any potential modals to appear and dismiss them
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const dismissButtons = document.querySelectorAll(
          'button[aria-label="Dismiss"]'
        );
        dismissButtons.forEach((dismissButton) =>
          (dismissButton as HTMLElement).click()
        );
      }

      return count;
    }
  },
});
