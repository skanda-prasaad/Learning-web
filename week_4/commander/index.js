const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .name("Word counter")
  .description("CLI to count the words")
  .version("1.0.0");

program.command("count <filepath>").action((filepath) => {
  fs.readFile(filepath, "utf-8", function (err, data) {
    if (err) {
      console.log("Error ....");
      return;
    } else {
      const words = data.split(/\s+/).filter(Boolean);
      console.log(`Total words: ${words.length}`);
    }
  });
});

program.parse();
