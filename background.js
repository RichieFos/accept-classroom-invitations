const classroomUrl = "https://classroom.google.com/";

function enableAction(tabId) {
  try {
    chrome.action.enable(tabId);
  } catch (err) {
    console.log(err);
  }
}

function disableAction(tabId) {
  try {
    chrome.action.disable(tabId);
  } catch (err) {
    console.log(err);
  }
}

chrome.tabs.onActivated.addListener(async () => {
  const q = await chrome.tabs.query({
    url: `${classroomUrl}*`,
    active: true,
  });
  const tabId = q.id;
  q.length ? enableAction(tabId) : disableAction(tabId);
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["script.js"],
  });
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "show-notification") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "images/icon-128.png",
      title: message.title || "Extension Notification",
      message: message.text || "Action complete.",
    });
  }
});
