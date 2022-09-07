const { buildConfig } = require(`../../../config`);
const { askGenerateQuestions } = require(`../../../core/questions`);
const { getDetectableSettings } = require(`./getDetectableSettings`);
const { triggerGenerateHooks } = require(`./triggerGenerateHooks`);

const generate = async () => {
  const { packageManager, projectType } = getDetectableSettings();

  const generateAnswers = await askGenerateQuestions();

  // load configs
  let config = buildConfig({
    ...generateAnswers,
    packageManager,
    projectType
  });

  await triggerGenerateHooks(config);
};

module.exports = {
  generate
};
