import {
  generateRoutes,
  generateSpec,
  ExtendedRoutesConfig,
  ExtendedSpecConfig,
} from "tsoa";

(async () => {
  const specOptions: ExtendedSpecConfig = {
    basePath: "/",
    entryFile: "src/rest/server.ts",
    specVersion: 3,
    outputDirectory: "src/rest/public",
    controllerPathGlobs: ["src/rest/controllers/*.ts"],
    noImplicitAdditionalProperties: "throw-on-extras"
  };

  await generateSpec(specOptions);

  //await generateRoutes(routeOptions);
})();