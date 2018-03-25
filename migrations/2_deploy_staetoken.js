/* global artifacts:true */
const STAEtoken = artifacts.require('./STAEtoken.sol');

module.exports = async (deployer) => {
  await deployer.deploy(STAEtoken);
};
