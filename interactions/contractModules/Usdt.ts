import { ethers } from "ethers";

export class ERC20TokenClient {
  private contract: ethers.Contract;
  private signerOrProvider: ethers.Signer | ethers.Provider;

  constructor(
    signerOrProvider: ethers.Signer | ethers.Provider,
    abi: any,
    contractAddress: string,
  ) {
    this.signerOrProvider = signerOrProvider;
    this.contract = new ethers.Contract(contractAddress, abi, signerOrProvider);
  }

  async decimals(): Promise<number> {
    return await this.contract.decimals();
  }

  async totalSupply(): Promise<ethers.BigNumberish> {
    return await this.contract.totalSupply();
  }

  async balanceOf(account: string): Promise<ethers.BigNumberish> {
    return await this.contract.balanceOf(account);
  }

  async transfer(
    to: string,
    value: ethers.BigNumberish,
  ): Promise<ethers.ContractTransaction> {
    const tx = await this.contract.transfer(to, value);
    return tx;
  }

  async allowance(
    owner: string, // signer.address
    spender: string, // prediction address
  ): Promise<ethers.BigNumberish> {
    return await this.contract.allowance(owner, spender); // >=
  }

  async approve(
    spender: string, // prediction address
    value: ethers.BigNumberish, // input * 10**6 ethers.parseUnit(10,6)
  ): Promise<ethers.ContractTransaction> {
    const tx = await this.contract.approve(spender, value);
    return tx;
  }

  async transferFrom(
    from: string,
    to: string,
    value: ethers.BigNumberish,
  ): Promise<ethers.ContractTransaction> {
    const tx = await this.contract.transferFrom(from, to, value);
    return tx;
  }
}
