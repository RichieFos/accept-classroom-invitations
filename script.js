function main() {
  const acceptButtons = document.querySelectorAll("span.UywwFc-vQzf8d");
  const invitations = [];

  if (acceptButtons.length > 0) {
    acceptButtons.forEach((e) => {
      if (e.innerText === "Join" || e.innerText == "Accept") {
        invitations.push(e);
      }
    });
  }

  if (invitations.length > 0) {
    invitations.forEach((invitation) => {
      invitation.click();
    });
    // messages need to sent to the service worker to inform invitation acceptance status
    chrome.runtime.sendMessage({
      type: "show-notification",
      title: "All invitations have been accepted.",
    });
  } else {
    chrome.runtime.sendMessage({
      type: "show-notification",
      title: "No invitations have been found.",
      text: "Open a page with invitations and try again.",
    });
  }
}

main();
