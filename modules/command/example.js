export default {
  config: {
    name: "example",
    aliases: ["ex"],
    version: "1.0.0",
    author: "HMHung",
    info: "Example command",
    Category: "Admin",
    guides: "Sử dụng lệnh này để làm ví dụ",
    hasPrefix: true,
    images: [],
  },
  onRun: async ({ api, event }) => {
    api.sendMessage("Đây là lệnh example", event.threadId, event.type);
  },
  onEvent: async ({ api, event }) => {
    // Logic cho hàm ở đây
  },
  onLoad: async () => {
    // Logic cho hàm ở đây
  }
};
