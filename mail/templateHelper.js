const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const TemplateHelper = (value) => {
  switch (value.target) {
    case "placed order": {
      return {
        subject: "Your Order Has Been Successfully Placed! 🎉",
        template: ejs.render(fs.readFileSync(path.join(__dirname, "./orderplaced.ejs"), "utf-8"), value),
      };
    }
  }
};

module.exports = { TemplateHelper };
