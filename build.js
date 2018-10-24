const { exec, spawn } = require('child_process');

/** Strings */
const npmRun = 'npm run';
const npxNx = 'npx nx';
const git = 'git-';
const affected = 'affected:';
const apps = 'apps';
const libs = 'libs';
const build = 'build-';
const firstApp = 'first-app';
const artKit = 'art-kit';
const ngKit = 'ng-kit';
const testKit = 'test-kit';
const branchName = 'branch-name';
// Options for affected:* scripts depending on if we are on master or feature branch.
const masterBranchOpts = '-- --base=HEAD^ --base=HEAD';
const featureBranchOpts = '--base=origin/master --head=HEAD';

/** Scripts */
// Partial 'npm run something-incomplete'.
const npmRunGit = `${npmRun} ${git}`;
const npxNxAffected = `${npxNx} ${affected}`;
const npmRunBuild = `${npmRun} ${build}`;
const npxNxAffectedApps = `${npxNxAffected}${apps}`;
const npxNxAffectedLibs = `${npxNxAffected}${libs}`;
// Final script strings.
const gitBranchNameScript = `${npmRunGit}${branchName}`;
// Build scripts always include a parallel test script in package.json.
const buildFirstAppScript = `${npmRunBuild}${firstApp}`;
// const buildArtKitScript = `${npmRunBuild}${artKit}`;
const buildTestKitScript = `${npmRunBuild}${testKit}`;
const buildNgKitScript = `${npmRunBuild}${ngKit}`;

/** Functions */
const dataToArray = data => {
  if (typeof data === 'string') {
    return data.trim().split(' ');
  } else {
    throw Error('Nx schematics affected apps/libs script must return a string.');
  }
};
const isAffected = (affectedArr, affectedStr) => {
  const affected = affectedArr.find(el => el.includes(affectedStr));
  return affected !== undefined;
};
// Douglas Crockford's `method` method.
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};
String.method('prependNpmScript', function(anotherBuild) {
  return this.length > 0 ? `${anotherBuild} && ${this}` : anotherBuild;
});
const spawnBuildScript = buildScript => {
  spawn(
    buildScript,
    {
      stdio: 'inherit',
      shell: true
    },
    (err, stdout, stderr) => {
      if (err) throw Error(`buildScript error::: ${err}`);
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  );
};

/** Executions */
const gitBranchNameExec = exec(gitBranchNameScript).stdout.on('data', branchName => {
  const affectedAppsScript =
    npxNxAffectedApps +
    (branchName.includes('master') ? ` ${masterBranchOpts}` : ` ${featureBranchOpts}`);
  const affectedLibsScript =
    npxNxAffectedLibs +
    (branchName.includes('master') ? ` ${masterBranchOpts}` : ` ${featureBranchOpts}`);

  // If we do not destroy the git process we get an error.
  gitBranchNameExec.destroy();

  // Start by checking which libraries are affected.
  exec(affectedLibsScript).stdout.on('data', libsData => {
    console.log('Affected libraries:::', libsData);
    const affectedLibs = dataToArray(libsData);
    // If there are affected library/libraries.
    if (affectedLibs.length > 0) {
      const affectedArtKit = isAffected(affectedLibs, artKit);
      const affectedNgKit = isAffected(affectedLibs, ngKit);
      const affectedTestKit = isAffected(affectedLibs, testKit);
      // If art-kit is affected at least we know that we will have to build all apps.
      if (affectedArtKit) {
        // TODO: add build for art-kit and prepend it.
        let script = buildFirstAppScript;
        if (affectedNgKit) script = script.prependNpmScript(buildNgKitScript);
        if (affectedTestKit) script = script.prependNpmScript(buildTestKitScript);

        spawnBuildScript(script);
        // If art-kit is NOT affected we need to know which app/s are.
      } else {
        exec(affectedAppsScript).stdout.on('data', appsData => {
          console.log('Affected applications:::', appsData);
          const affectedApps = dataToArray(appsData);
          if (affectedApps.length > 0) {
            // For the moment we only have to care about 1 app.
            const affectedFirstApp = isAffected(affectedApps, firstApp);
            if (affectedFirstApp) {
              let script = buildFirstAppScript;
              if (affectedNgKit) script = script.prependNpmScript(buildNgKitScript);
              if (affectedTestKit) script = script.prependNpmScript(buildTestKitScript);
              spawnBuildScript(script);
            } else {
              let script = '';
              if (affectedNgKit) script = script.prependNpmScript(buildNgKitScript);
              if (affectedTestKit) script = script.prependNpmScript(buildTestKitScript);
              if (script.length > 0) spawnBuildScript(script);
            }
          }
        });
      }
    } else {
      // If there are NOT affected library/libraries.
      // we need to know which app/s are.
      exec(affectedAppsScript).stdout.on('data', appsData => {
        console.log('Affected applications:::', appsData);
        const affectedApps = dataToArray(appsData);
        if (affectedApps.length > 0) {
          // For the moment we only have to care about 1 app.
          const affectedFirstApp = isAffected(affectedApps, firstApp);
          if (affectedFirstApp) {
            spawnBuildScript(buildFirstAppScript);
          }
        }
      });
    }
  });
});
