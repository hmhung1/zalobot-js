export default {
  config: {
    name: "help",
    aliases: ["h"],
    version: "1.0.0",
    author: "HMHung",
    info: "Hiển thị danh sách các lệnh theo loại",
    Category: "General",
    guides: "Sử dụng lệnh này để xem các lệnh có sẵn",
    hasPrefix: true,
    images: [],
  },
  onRun: async ({ api, event }) => {
    const categorizedCommands = new Map();

    for (const [name, command] of global.commands) {
      const category = command.config.Category || "Khác"; 
      if (!categorizedCommands.has(category)) {
        categorizedCommands.set(category, []);
      }
      categorizedCommands.get(category).push(name); 
    }

    const commandList = [];
    for (const [category, commands] of categorizedCommands) {
      commandList.push(`${category}: ${commands.join(", ")}`);
    }

    const response = commandList.length > 0 ? commandList.join("\n") : "Hiện không có lệnh nào.";
    api.sendMessage(`Danh sách lệnh theo loại:\n${response}`, event.threadId, event.type);
  }
};
