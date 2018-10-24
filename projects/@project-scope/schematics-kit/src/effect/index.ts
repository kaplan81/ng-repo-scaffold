import { chain, externalSchematic, Rule, Tree } from '@angular-devkit/schematics';
import { MultiProjetOptions, renameFileType, setupOptions } from '../setup';

export interface EffectOptions extends MultiProjetOptions {
  spec?: string;
  flat?: string;
}

/**
 * Add effect to a concrete project and feature.
 * Re-use @ngrx/schematics for templates.
 * Set the correct path and file type name.
 */
export default function(options: EffectOptions): Rule {
  return chain([
    (tree: Tree) => {
      setupOptions(tree, options);
      options.path += '/store/effects';

      return tree;
    },
    externalSchematic('@ngrx/schematics', 'effect', options),
    (tree: Tree) => {
      renameFileType(tree, options.path, options.name, 'effect', 'ts');

      return tree;
    }
  ]);
}
