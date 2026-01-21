import fs from "fs";
import path from "path";

const plansPath = path.resolve("./backend/config/subscriptions.json");

function getPlans() {
  const data = fs.readFileSync(plansPath, "utf-8");
  return JSON.parse(data);
}

// Example usage
const plans = getPlans();
console.log("Subscription have been loaded");

export default plans;