import { Zalo, MessageType } from "zca-js";
import fs from "fs";
import path from "path";

const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

const prefix = config.system.PREFIX;
global.commands = new Map(); 

const loadCommands = async () => {
  const commandFiles = fs.readdirSync("./modules/command").filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    try {
      const command = await import(`./modules/command/${file}`);
      const { config: commandConfig } = command.default;

      if (commandConfig.name && commandConfig.Category) {
        global.commands.set(commandConfig.name, command.default); 

        if (typeof command.default.onLoad === "function") {
          await command.default.onLoad();
        }
      } else {
        console.warn(`Command ${file} is missing name or Category. It will not be loaded.`);
      }
    } catch (error) {
      console.error(`Error loading command ${file}:`, error);
    }
  }
};

(async () => {
  const zalo = new Zalo(
    {
      cookie: JSON.parse(fs.readFileSync("./appstate.json", "utf-8")),
      imei: config.system.imei,
      userAgent: config.system.userAgent,
    },
    {
      selfListen: config.zcaConfig.selfListen,
      checkUpdate: config.zcaConfig.checkUpdate,
    }
  );

  const api = await zalo.login();
  await loadCommands(); 

  api.listener.on("message", (message) => {
    if (message.type === MessageType.DirectMessage || message.type === MessageType.GroupMessage) {
      const content = message.data.content.trim();

      if (!content.startsWith(prefix)) return;

      const args = content.slice(prefix.length).split(/\s+/);
      const commandName = args.shift().toLowerCase();

      const command = global.commands.get(commandName); 
      if (command) {
        command.onRun({ api, event: message, args }); 
      }
    }
  });

  api.listener.start();
})();
