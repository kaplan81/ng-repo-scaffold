import { chain, externalSchematic, Rule, Tree } from '@angular-devkit/schematics';
import { MultiProjetOptions, setupOptions } from '../setup';

export interface ReducerOptions extends MultiProjetOptions {
  spec?: string;
  flat?: string;
}

/**
 * Add reducer to a concrete project and feature.
 * Re-use @ngrx/schematics for templates.
 * Set the correct path and file type name.
 */
export default function(options: ReducerOptions): Rule {
  return chain([
    (tree: Tree) => {
      setupOptions(tree, options);
      options.path += '/store/reducers';

      return tree;
    },
    externalSchematic('@ngrx/schematics', 'reducer', options)
  ]);
}
