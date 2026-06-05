import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Output Style Extension
 *
 * Reads ~/.pi/current-style and injects the corresponding style
 * instructions into the system prompt on every turn.
 *
 * Styles:
 * - default: no injection
 * - learning: interactive learning mode
 * - explanatory: educational insights mode
 */

const HOME = process.env.HOME ?? process.env.USERPROFILE ?? "";
const STYLE_FILE = join(HOME, ".pi", "current-style");

export default function (pi: ExtensionAPI) {
  pi.on("before_agent_start", async (event) => {
    let style = "default";
    try {
      style = readFileSync(STYLE_FILE, "utf-8").trim();
    } catch {
      // No style file = default
    }

    if (style === "default") return;

    // Read the style instruction file
    const stylesDir = join(
      process.env.HOME ?? "",
      ".pi",
      "agent",
      "skills",
      "output-style",
      "styles"
    );
    const stylePath = join(stylesDir, `${style}.md`);

    try {
      const styleContent = readFileSync(stylePath, "utf-8");
      return {
        systemPrompt: event.systemPrompt + "\n\n" + styleContent,
      };
    } catch {
      // Style file not found, skip injection
      return;
    }
  });

  // Register /style command
  pi.registerCommand("style", {
    description: "Switch output style (default, learning, explanatory)",
    getArgumentCompletions: (prefix: string) => {
      const styles = [
        { value: "default", label: "default", description: "Standard mode" },
        { value: "learning", label: "learning", description: "Interactive learning — agent asks you to write key code parts" },
        { value: "explanatory", label: "explanatory", description: "Educational insights — agent explains implementation choices" },
      ];
      return styles.filter((s) => s.value.startsWith(prefix));
    },
    handler: async (args, ctx) => {
      const validStyles = ["default", "learning", "explanatory"];
      const style = args?.trim() || "";

      if (!style || !validStyles.includes(style)) {
        ctx.ui.notify(`Usage: /style <${validStyles.join("|")}>`, "info");
        return;
      }

      writeFileSync(STYLE_FILE, style, "utf-8");

      const descriptions: Record<string, string> = {
        default: "Standard mode — no special behavior",
        learning: "Learning mode — agent asks you to write key code parts at decision points",
        explanatory: "Explanatory mode — agent provides educational insights about implementation choices",
      };

      ctx.ui.notify(`Style: ${style} — ${descriptions[style]}`, "info");
    },
  });
}
