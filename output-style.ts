import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Output Style Extension
 * 
 * Injects learning/explanatory instructions into the system prompt
 * based on the current style set in ~/.pi/current-style
 */
export default function (pi: ExtensionAPI) {
  const STYLES_DIR = join(process.env.HOME!, ".pi/agent/skills/output-style/styles");
  const STYLE_FILE = join(process.env.HOME!, ".pi/current-style");

  pi.on("before_agent_start", async (event, ctx) => {
    // Read current style
    let style = "default";
    try {
      style = readFileSync(STYLE_FILE, "utf-8").trim();
    } catch {
      // No style file = default
    }

    if (style === "default") {
      return; // No injection needed
    }

    // Read style content
    try {
      const stylePath = join(STYLES_DIR, `${style}.md`);
      const styleContent = readFileSync(stylePath, "utf-8");

      // Inject into system prompt
      return {
        systemPrompt: event.systemPrompt + "\n\n" + styleContent,
      };
    } catch (err) {
      // Style file not found, skip
      return;
    }
  });

  // Register command to switch styles
  pi.registerCommand("style", {
    description: "Switch output style",
    getArgumentCompletions: (prefix: string) => {
      const styles = [
        { value: "default", label: "default", description: "Standard mode" },
        { value: "learning", label: "learning", description: "Interactive learning" },
        { value: "explanatory", label: "explanatory", description: "Educational insights" },
        { value: "learning-explanatory", label: "learning-explanatory", description: "Both combined" },
      ];
      const filtered = styles.filter(s => s.value.startsWith(prefix));
      return filtered.length > 0 ? filtered : null;
    },
    handler: async (args, ctx) => {
      const validStyles = ["default", "learning", "explanatory", "learning-explanatory"];
      const style = args?.trim() || "";

      if (!style || !validStyles.includes(style)) {
        ctx.ui.notify(`Usage: /style <${validStyles.join("|")}>`, "info");
        return;
      }

      // Write style file
      const fs = await import("node:fs");
      fs.writeFileSync(STYLE_FILE, style, "utf-8");

      const descriptions: Record<string, string> = {
        default: "Standard mode",
        learning: "Interactive learning - agent asks you to write key code parts",
        explanatory: "Educational insights - agent explains implementation choices",
        "learning-explanatory": "Combined learning + explanatory mode",
      };

      ctx.ui.notify(`Style: ${style} - ${descriptions[style]}`, "info");
    },
  });
}
