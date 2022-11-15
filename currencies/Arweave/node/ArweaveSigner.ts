import Rsa4096Pss from "./Rsa4096Pss";
import { JWKInterface } from "@bundlr-network/client/node";
import { jwkTopem } from "arweave/node/lib/crypto/pem";
import base64url from "base64url";
import Arweave from "arweave";


export default class ArweaveSigner extends Rsa4096Pss {
    protected jwk: JWKInterface;

    constructor(jwk: JWKInterface) {
        super(jwkTopem(jwk), jwk.n);
        this.jwk = jwk;
    }

    get publicKey(): Buffer {
        return base64url.toBuffer(this.pk as string);
    }

    sign(message: Uint8Array): Uint8Array {
        return Arweave.crypto.sign(this.jwk, message) as any;
    }

    static async verify(
        pk: string,
        message: Uint8Array,
        signature: Uint8Array,
    ): Promise<boolean> {
        return await Arweave.crypto.verify(pk, message, signature);
    }
}
