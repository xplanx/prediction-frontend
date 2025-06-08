import { ethers } from "ethers";

export interface OutcomeData {
  outcome: string; // bytes32 => string (hex)
  outcomePredictCount: number; // uint64
  balance: string; // uint256 => string to handle BigNumber
  outcomeToken: string; // address
}

export interface OutPutData {
  marketName: string;
  marketDescription: string;
  totalBalance: string; // uint256 => string
  deadline: number; // uint64
  resolved: boolean;
  outcomeResult: string; // bytes32 => string (hex)
  outcomesInfo: OutcomeData[];
}

export class PredictionMarketClient {
  private contract: ethers.Contract;
  private signerOrProvider: ethers.Signer | ethers.Provider;

  constructor(
    contractAddress: string, // prediction address
    abi: any, // prediction ABI
    signerOrProvider: ethers.Signer | ethers.Provider, // signer
  ) {
    this.signerOrProvider = signerOrProvider;
    this.contract = new ethers.Contract(contractAddress, abi, signerOrProvider);
  }

  async createMarket(
    deadline: number,
    marketName: string,
    marketDescription: string,
    outcomes: string[],
    optionalReward: bigint,
  ): Promise<string> {
    const tx = await this.contract.createMarket(
      deadline,
      marketName,
      marketDescription,
      outcomes,
      optionalReward,
    );

    const receipt = await tx.wait();

    const MarketInitializedEvent = receipt.logs?.find(
      (log: any) =>
        log.topics?.[0] ===
        "0xd7a06f724973342c5e779eabff7a2785eadb85e51a4e98c43c19d0765d11ec1d",
    );

    const marketId = MarketInitializedEvent.args.marketId;

    if (!marketId) {
      throw new Error("MarketInitialized event not emitted");
    }

    return marketId;
  }

  // buy
  async buy(
    marketId: string,
    outcome: string,
    amount: bigint,
  ): Promise<ethers.ContractTransaction> {
    const tx = await this.contract.buy(marketId, outcome, amount);
    return tx.wait();
  }

  async sell(
    marketId: string,
    outcome: string,
    amount: bigint,
  ): Promise<ethers.ContractTransaction> {
    const tx = await this.contract.sell(marketId, outcome, amount);
    return tx.wait();
  }

  async requestPayout(
    marketId: string,
    outcome: string,
  ): Promise<ethers.ContractTransaction> {
    const tx = await this.contract.requestPayout(marketId, outcome);
    return tx.wait();
  }

  async getMarket(marketId: string): Promise<OutPutData> {
    return await this.contract.getMarketData(marketId);
  }

  async getPrediction(user: string, marketId: string, outcome: string) {
    return await this.contract.predictions(user, marketId, outcome);
  }
  async finalizeMarket(
    marketId: string,
    outcomeResult: string,
  ): Promise<ethers.ContractTransaction> {
    const tx = await this.contract.finalizeMarket(marketId, outcomeResult);
    return tx.wait();
  }
}
