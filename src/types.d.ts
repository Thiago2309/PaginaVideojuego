//Declaración de TypeScript para extender el tipo NodeRequire y agregar la propiedad context
declare interface NodeRequire {
    context: (directory: string, useSubdirectories?: boolean, regExp?: RegExp) => any;
  }
  