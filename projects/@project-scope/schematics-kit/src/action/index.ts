import { chain, externalSchematic, Rule, Tree } from '@angular-devkit/schematics';
import { MultiProjetOptions, renameFileType, setupOptions } from '../setup';

export interface ActionOptions extends MultiProjetOptions {
  spec?: string;
  flat?: string;
}

/**
 * Add action to a concrete project and feature.
 * Re-use @ngrx/schematics for templates.
 * Set the correct path and file type name.
 */
export default function(options: ActionOptions): Rule {
  return chain([
    (tree: Tree) => {
      setupOptions(tree, options);
      options.path += '/store/actions';

      return tree;
    },
    externalSchematic('@ngrx/schematics', 'action', options),
    (tree: Tree) => {
      renameFileType(tree, options.path, options.name, 'action', 'ts');

      return tree;
    }
  ]);
}
