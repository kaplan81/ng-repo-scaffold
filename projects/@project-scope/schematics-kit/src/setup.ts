import { strings } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { buildDefaultPath } from '@schematics/angular/utility/project';
import { WorkspaceProject, WorkspaceSchema } from '@schematics/angular/utility/workspace-models';

export interface MultiProjetOptions {
  name: string;
  project?: string;
  projectFeature: string;
  path: string;
}

/**
 * Set up path option by:
 * * Getting the project source path from angular.json.
 * * Adding the project feature path.
 */
export function setupOptions(host: Tree, options: MultiProjetOptions): Tree {
  const workspace: WorkspaceSchema = getWorkspace(host);
  if (!options.project) options.project = workspace.defaultProject;
  const project: WorkspaceProject<any> = workspace.projects[options.project as string];
  if (!options.projectFeature) {
    throw new SchematicsException('Project feature name must be provided');
  }
  options.path = buildDefaultPath(project) + '/' + options.projectFeature;

  return host;
}

/**
 * @ngrx/schematics wrongly sets the type name in plural.
 * This function renames to singular in the tree.
 */
export function renameFileType(
  host: Tree,
  path: string,
  name: string,
  typeName: string,
  extension: string
): Tree {
  name = strings.dasherize(name);
  const plural = `${path}/${name}.${typeName}s.${extension}`;
  const singular = `${path}/${name}.${typeName}.${extension}`;
  host.rename(plural, singular);

  return host;
}
