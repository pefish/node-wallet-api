
const {EmptyMessage} = require("../protocol/api/api_pb");

class GrpcClient {

  constructor(options) {
    this.host = options.host;
    this.port = options.port;
    this.solidityHost = options.solidityHost;
    this.solidityPort = options.solidityPort;

    const {WalletClient, WalletSolidityClient} = require("../protocol/api/api_grpc_pb");
    const caller = require('grpc-caller');

    if (this.host && this.port) {
      this._walletClient = caller(`${this.host}:${this.port}`, WalletClient);
    }

    if (this.solidityHost && this.solidityPort) {
      this._walletSolidityClient = caller(`${this.solidityHost}:${this.solidityPort}`, WalletSolidityClient);
    }

  }

  async callWallet(methodName, params) {
    if (!this._walletClient) {
      throw new Error(`client not be inited`)
    }
    if (!params) {
      params = [new EmptyMessage()]
    }
    return await this._walletClient[methodName](...params)
  }

  async callWalletSolidity(methodName, params) {
    if (!this._walletSolidityClient) {
      throw new Error(`client not be inited`)
    }
    if (!params) {
      params = [new EmptyMessage()]
    }
    return await this._walletSolidityClient[methodName](...params)
  }
}

module.exports = GrpcClient;
