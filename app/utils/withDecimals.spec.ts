import BN from "bn.js";
import { fromNano, toNano } from "ton";
import { fromBNWithDecimals, toBNWithDecimals } from "./withDecimals";

describe('toBNWithDecimals', () => {
    it('should convert to BN with given decimals', () => {
        const bn0 = toNano('0.000000007');
        const bn1 = toNano('0.000000099');
        const bn2 = toNano('0.000000999');
        const bn3 = toNano('0.000009999');
        const bn8 = toNano('0.999999999');
        const bn9 = toNano('0.999999999');
        const bn10 = toNano('99.999999999');
        const bn18 = toNano('9999999999.999999998');

        let res0 = toBNWithDecimals('7', 0)!;
        expect(res0).not.toBeNull();
        expect(res0).not.toBeUndefined();
        expect(res0.eq(bn0)).toBe(true);

        let res1 = toBNWithDecimals('9.9', 1)!;
        expect(res1).not.toBeNull();
        expect(res1).not.toBeUndefined();
        expect(res1.eq(bn1)).toBe(true);

        let res2 = toBNWithDecimals('9.99', 2)!;
        expect(res2).not.toBeNull();
        expect(res2).not.toBeUndefined();
        expect(res2.eq(bn2)).toBe(true);

        let res3 = toBNWithDecimals('9.999', 3)!;
        expect(res3).not.toBeNull();
        expect(res3).not.toBeUndefined();
        expect(res3.eq(bn3)).toBe(true);

        let res8 = toBNWithDecimals('9.99999999', 8)!;
        expect(res8).not.toBeNull();
        expect(res8).not.toBeUndefined();
        expect(res8.eq(bn8)).toBe(true);

        let res9 = toBNWithDecimals('0.999999999', 9)!;
        expect(res9).not.toBeNull();
        expect(res9).not.toBeUndefined();
        expect(res9.eq(bn9)).toBe(true);

        let res10 = toBNWithDecimals('9.9999999999', 10)!;
        expect(res10).not.toBeNull();
        expect(res10).not.toBeUndefined();
        expect(res10.eq(bn10)).toBe(true);

        let res18 = toBNWithDecimals('9.999999999999999998', 18)!;
        expect(res18).not.toBeNull();
        expect(res18).not.toBeUndefined();
        expect(res18.eq(bn18)).toBe(true);

        let res = toBNWithDecimals('0.1', 1)!;
        expect(res).not.toBeNull();
        expect(res).not.toBeUndefined();
        expect(res.toNumber() === 1).toBe(true);

        try {
            toBNWithDecimals('0.01', 1)
            expect(true).toBe(false);
        } catch (e: any) {
            expect(e.message).toBe("while converting number 0.01 to wei, fraction.length > baseLength");
        }

        try {
            toBNWithDecimals('0.00000000001', 10)
            expect(true).toBe(false);
        } catch (e: any) {
            expect(e.message).toBe("while converting number 0.00000000001 to wei, fraction.length > baseLength");
        }
    });
});

describe('fromBNWithDecimals', () => {
    it('should convert to a float string from BN with given decimals', () => {
        const bn0 = toNano('0.000000007');
        const bn1 = toNano('0.000000099');
        const bn2 = toNano('0.000000999');
        const bn3 = toNano('0.000009999');
        const bn8 = toNano('0.999999999');
        const bn9 = toNano('0.999999999');
        const bn10 = toNano('99.999999999');
        const bn18 = toNano('9999999999.999999998');

        let res0 = fromBNWithDecimals(bn0, 0)!;
        expect(res0).not.toBeNull();
        expect(res0).not.toBeUndefined();
        expect(res0 === '7').toBe(true);

        let res1 = fromBNWithDecimals(bn1, 1)!;
        expect(res1).not.toBeNull();
        expect(res1).not.toBeUndefined();
        expect(res1 === '9.9').toBe(true);

        let res2 = fromBNWithDecimals(bn2, 2)!;
        expect(res2).not.toBeNull();
        expect(res2).not.toBeUndefined();
        expect(res2 === '9.99').toBe(true);

        let res3 = fromBNWithDecimals(bn3, 3)!;
        expect(res3).not.toBeNull();
        expect(res3).not.toBeUndefined();
        expect(res3 === '9.999').toBe(true);

        let res8 = fromBNWithDecimals(bn8, 8)!;
        expect(res8).not.toBeNull();
        expect(res8).not.toBeUndefined();
        expect(res8 === '9.99999999').toBe(true);

        let res9 = fromBNWithDecimals(bn9, 9)!;
        expect(res9).not.toBeNull();
        expect(res9).not.toBeUndefined();
        expect(res9 === '0.999999999').toBe(true);

        let res10 = fromBNWithDecimals(bn10, 10)!;
        expect(res10).not.toBeNull();
        expect(res10).not.toBeUndefined();
        expect(res10 === '9.9999999999').toBe(true);

        let res18 = fromBNWithDecimals(bn18, 18)!;
        expect(res18).not.toBeNull();
        expect(res18).not.toBeUndefined();
        expect(res18 === '9.999999999999999998').toBe(true);

        try {
            fromBNWithDecimals('jshdkfshjddk', 0)
            expect(true).toBe(false);
        } catch (e: any) {
            expect(e.message).toBe("[number-to-bn] while converting number \"jshdkfshjddk\" to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported.");
        }
    });
});