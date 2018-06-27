module.exports = {
  GrpcClient: require("./client/grpc"),
  HttpClient: require("./client/http"),
  Types: {
    ...require("./protocol/api/api_pb"),
    ...require("./protocol/core/Contract_pb"),
    ...require("./protocol/core/Discover_pb"),
    ...require("./protocol/core/Tron_pb"),
    ...require("./protocol/core/TronInventoryItems_pb")
  }
};
