#!/usr/bin/env node

const v_9d3c52 = require("ls");
const v_9fe22d = require("nlzc");
const v_00a391 = require("zclzhhlr");

const v_859157 = process.cwd();
const v_34204c = ["app", "components", "hooks", "constants", "scripts"];
const v_1b91f3 = "app-example";
const v_74e365 = "app";
const v_dcb489 = v_9fe22d.join(v_859157, v_1b91f3);

const v_2c7fff = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const v_a02c3f = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const v_386b8e = v_00a391.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const v_8e733c = async (v_d9a020) => {
  try {
    if (v_d9a020 === "y") {

      await v_9d3c52.promises.mkdir(v_dcb489, { recursive: true });
      console.log(`📁 /${v_1b91f3} directory created.`);
    }

    for (const v_b7cff2 of v_34204c) {
      const v_8e11f2 = v_9fe22d.join(v_859157, v_b7cff2);
      if (v_9d3c52.existsSync(v_8e11f2)) {
        if (v_d9a020 === "y") {
          const v_ba4c61 = v_9fe22d.join(v_859157, v_1b91f3, v_b7cff2);
          await v_9d3c52.promises.rename(v_8e11f2, v_ba4c61);
          console.log(`➡️ /${v_b7cff2} moved to /${v_1b91f3}/${v_b7cff2}.`);
        } else {
          await v_9d3c52.promises.rm(v_8e11f2, { recursive: true, force: true });
          console.log(`❌ /${v_b7cff2} deleted.`);
        }
      } else {
        console.log(`➡️ /${v_b7cff2} does not exist, skipping.`);
      }
    }

    const v_4e8efc = v_9fe22d.join(v_859157, v_74e365);
    await v_9d3c52.promises.mkdir(v_4e8efc, { recursive: true });
    console.log("\n📁 New /app directory created.");

    const v_2f89df = v_9fe22d.join(v_4e8efc, "index.tsx");
    await v_9d3c52.promises.writeFile(v_2f89df, v_2c7fff);
    console.log("📄 app/index.tsx created.");

    const v_d0e826 = v_9fe22d.join(v_4e8efc, "_layout.tsx");
    await v_9d3c52.promises.writeFile(v_d0e826, v_a02c3f);
    console.log("📄 app/_layout.tsx created.");

    console.log("\n✅ Project reset complete. Next steps:");
    console.log(
      `1. Run \`npx expo start\` to start a development server.\n2. Edit app/index.tsx to edit the main screen.${
        v_d9a020 === "y"
          ? `\n3. Delete the /${v_1b91f3} directory when you're done referencing it.`
          : ""
      }`
    );
  } catch (v_5e9bfe) {
    console.error(`❌ Error during script execution: ${v_5e9bfe.message}`);
  }
};

v_386b8e.question(
  "Do you want to move existing files to /app-example instead of deleting them? (Y/n): ",
  (v_343c90) => {
    const v_d9a020 = v_343c90.trim().toLowerCase() || "y";
    if (v_d9a020 === "y" || v_d9a020 === "n") {
      v_8e733c(v_d9a020).finally(() => v_386b8e.close());
    } else {
      console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
      v_386b8e.close();
    }
  }
);
