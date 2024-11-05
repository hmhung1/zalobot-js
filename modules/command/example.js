export default {
  config: {
    name: "example",
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
    // làm cái gì ở đây tùy thuộc vào bạn
  },
  onLoad: async ({ api, event ) => {
    // khối code sẽ chạy khi lệnh được tải thành công
  },
};
