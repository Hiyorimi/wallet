import BN from "bn.js";
import { Address, contractAddress, WalletV1R1Source, WalletV1R2Source, WalletV1R3Source, WalletV2R1Source, WalletV2R2Source, WalletV3R1Source, WalletV3R2Source } from "ton";
import { AppConfig } from "../../AppConfig";
import { Engine } from "../Engine";
import { AddressProduct } from "./AddressProduct";

export class OldWalletsProduct {

    readonly engine: Engine;
    readonly wallets: AddressProduct[] = [];

    constructor(engine: Engine) {
        this.engine = engine;

        let addresses: Address[] = [];
        addresses.push(contractAddress(WalletV1R1Source.create({ publicKey: engine.publicKey, workchain: 0 })));
        addresses.push(contractAddress(WalletV1R2Source.create({ publicKey: engine.publicKey, workchain: 0 })));
        addresses.push(contractAddress(WalletV1R3Source.create({ publicKey: engine.publicKey, workchain: 0 })));
        addresses.push(contractAddress(WalletV2R1Source.create({ publicKey: engine.publicKey, workchain: 0 })));
        addresses.push(contractAddress(WalletV2R2Source.create({ publicKey: engine.publicKey, workchain: 0 })));
        addresses.push(contractAddress(WalletV3R1Source.create({ publicKey: engine.publicKey, workchain: 0 })));
        addresses.push(contractAddress(WalletV3R2Source.create({ publicKey: engine.publicKey, workchain: 0 })));

        for (let addr of addresses) {
            console.log('Old address: ' + addr.toFriendly({ testOnly: AppConfig.isTestnet }));
            this.wallets.push(this.engine.createAddressProduct(addr));
        }
    }

    useState() {
        let b = new BN(0);
        for (let w of this.wallets) {
            b = b.add(w.useState().balance);
        }
        return b;
    }
}