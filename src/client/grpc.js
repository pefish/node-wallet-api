
const {EmptyMessage, NumberMessage} = require("../protocol/api/api_pb");

class GrpcClient {

  constructor(options) {
    this.hostname = options.hostname;
    this.port = options.port;

    const {WalletClient} = require("../protocol/api/api_grpc_pb");
    const caller = require('grpc-caller');

    /**
     * @type {WalletClient}
     */
    this.api = caller(`${this.hostname}:${this.port}`, WalletClient);
  }

  async call(methodName, params) {
    if (!params) {
      params = [new EmptyMessage()]
    }
    return await this.api[methodName](...params)
  }

  /**
   * Retrieve all connected witnesses
   *
   * @returns {Promise<*>}
   */
  async getWitnesses() {
    return await this.api.listWitnesses(new EmptyMessage())
      .then(x => x.getWitnessesList());
  }

  /**
   * Retrieve all connected nodes
   *
   * @returns {Promise<*>}
   */
  async getNodes() {
    return await this.api.listNodes(new EmptyMessage())
      .then(x => x.getNodesList());
  }

  /**
   * Retrieves a block by the given number
   *
   * @param {number} number block number
   * @returns {Promise<*>}
   */
  async getBlockByNumber(number) {
    let message = new NumberMessage();
    message.setNum(number);
    return await this.api.getBlockByNum(message);
  }

}

module.exports = GrpcClient;
